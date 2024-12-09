import React, { useState, useEffect } from 'react'
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider';
import { BlurView } from 'expo-blur';
import { useTheme } from "../constants/ThemeContext"
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native'; 
import Entypo from '@expo/vector-icons/Entypo';

import {
  pinkPlayButton,
  pinkPauseButton,
  pinkRightButton,
  pinkLeftButton,
  bluePlayButton,
  bluePauseButton,
  blueRightButton,
  blueLeftButton,
  languagesBook,
} from "../constants/images"

const StoryComponent = ({route}) => {
const { engTitle, trTitle, engSound, trSound, engText, trText, } = route.params.data;
const [useModel, setUseModel]= useState(false);
const { isDarkMode, toggleTheme } = useTheme();
const [currentPage, setCurrentPage] = useState(0);
const [isPlaying, setIsPlaying] = useState(false); 
const [currentTitle, setCurrentTitle] = useState(engTitle);
const [currentText, setCurrentText] = useState(engText);
const [currentSound, setCurrentSound]= useState(engSound)
const [language, setLanguage] = useState('English'); 
const [sound, setSound] = useState(null); 
const [duration, setDuration] = useState(0);
const [position, setPosition] = useState(0)

const wordsPerPage = 55; 
const textArray = currentText.split(" ");
const totalPages = Math.ceil(textArray.length / wordsPerPage);

const getPageText = (pageIndex) => {
  const start = pageIndex * wordsPerPage;
  const end = start + wordsPerPage;
  return textArray.slice(start, end).join(" ");
};

const formatTime = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const togglePlayPause = async () => {
  if (isPlaying) {
    setIsPlaying(false);
    await sound.pauseAsync();
  } else {
    if (!sound) {
      await loadSound(); 
    } else {
      if (position >= duration || position === 0) {
        await sound.setPositionAsync(0); 
        setPosition(0); 
      }
    }

    setIsPlaying(true);
    await sound.playAsync();
  }
};


const loadSound = async () => {
  const { sound, status } = await Audio.Sound.createAsync(
    currentSound,
    { shouldPlay: true },
    (playbackStatus) => {
      if (playbackStatus.isLoaded) {
        setDuration(playbackStatus.durationMillis || 0);
        setPosition(playbackStatus.positionMillis || 0);
        
        if (playbackStatus.didJustFinish) {
          setIsPlaying(false);
          setPosition(0);
        }
      }
    }
  );
  setSound(sound); 
};


useEffect(() => {
  const soundData = route.params.data.engSound;
  console.log("Data:", soundData);
}, []);

const changeLanguage = async (lang) => {
  if (sound) {
    await sound.unloadAsync(); 
    setSound(null); 
  }
  setPosition(0); 
  setDuration(0); 
  setIsPlaying(false); 

  if (lang === 'English') {
    setCurrentTitle(engTitle);
    setCurrentText(engText);
    setCurrentSound(engSound);
  } else {
    setCurrentTitle(trTitle);
    setCurrentText(trText);
    setCurrentSound(trSound);
  }
  setLanguage(lang); 
  setUseModel(false); 
};


useFocusEffect(
  React.useCallback(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); 
      }
    };
  }, [sound])
);

useEffect(() => {
  return sound ? () => {sound.unloadAsync();}
               : undefined;}, 
  [sound]);



  return (
    <View className="flex-[9] w-[100%] items-center justify-end">
          
  
      <BlurView className={`w-[100%] h-[60%] border-2 border-slate-50 rounded-t-2xl 
                            ${isDarkMode ? "bg-black/70" : "bg-amber-400"}`}>

              {/* Title Container */}
              <View className="flex-[1] w-[100%] rounded-t-2xl items-center justify-center ">

                  <Text className={`flex-[1] italic underline w-[100%] rounded-t-2xl text-left pl-1 pt-2 text-[14px] font-bold 
                                    ${isDarkMode ? "text-gray-200" : "text-gray-900"}`} 
                        numberOfLines={1} 
                        ellipsizeMode='tail'>{currentTitle}
                  </Text>
                
              </View>


              {/* Text Container */}
              <View className="flex-[5] w-[100%] items-center justify-center">
                
                    {/* Text */}
                    <View className="flex-[6] w-[100%] items-center justify-center">
                        <Text  className={`text-[15px] italic font-bold px-[5px] w-[100%] h-[100%]
                                          ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                                          >{getPageText(currentPage)}
                        </Text>

                    </View>


                    {/* Right/Left Buttons */}
                    <View className="flex-[1] flex-row w-[100%] items-center justify-between px-2">
              
                            {/* Previous Page */}
                            <TouchableOpacity   
                              onPress={() => {if (currentPage > 0) setCurrentPage(currentPage - 1);}}>
                                <Entypo name="arrow-bold-left" size={32} color={isDarkMode ? "#e5e7eb" : "#222831"}  />
                            </TouchableOpacity>

                            <Text className={`text-[14px] font-bold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                              {`${currentPage + 1} / ${totalPages}`}
                            </Text>
                            

                            {/* Next Page */}
                            <TouchableOpacity 
                              onPress={() => {if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);}}>
                              <Entypo name="arrow-bold-right" size={32} color={isDarkMode ? "#e5e7eb" : "#222831"} />
                            </TouchableOpacity>
                            
                    </View>


              </View>


              {/* Sound Container */}
              <View className="flex-[2] w-[100%] items-center justify-center">

                    {/* Slider */}
                    <View className="flex-[1] w-[100%] items-center justify-center">
                    <Slider
                        style={{width: '90%', }}
                        minimumValue={0}
                        maximumValue={duration}
                        value={position}
                        maximumTrackTintColor="#ffffff"
                        disabled={!sound} 
                        onSlidingComplete={async (value) => {
                          await sound.setPositionAsync(value);
                        }}
                      />


                      <View className="w-[90%] px-2 flex-row justify-between">
                        <Text className={isDarkMode ? "text-gray-200" : "text-gray-900"}>{formatTime(position)}</Text>
                        <Text className={isDarkMode ? "text-gray-200" : "text-gray-900"}>{formatTime(duration)}</Text>
                      </View>

                    </View>


                    {/* Sound Buttons */}
                    <View className="flex-[1] py-1 w-[100%] flex-row items-center justify-evenly">
                

                        {/* 10 Second Left Button */}
                        <TouchableOpacity 
                          onPress={async () => {
                            const newPosition = Math.max(position - 10000, 0); 
                            await sound.setPositionAsync(newPosition); 
                            setPosition(newPosition); 
                          }}
                        >
                          <Image className="w-[35px] h-[35px]" source={isDarkMode ? blueLeftButton : pinkLeftButton} />
                        </TouchableOpacity>

                        
                        {/* Play/Pause */}
                        <TouchableOpacity onPress={() => togglePlayPause()}>
                              <Image className="w-[45px] h-[45px]"
                                     source={isDarkMode 
                                        ? (isPlaying ? bluePauseButton : bluePlayButton) 
                                        : (isPlaying ? pinkPauseButton : pinkPlayButton)}                                
                              />
                        </TouchableOpacity>


                        {/* 10 Second Right Button */}
                        <TouchableOpacity 
                          onPress={async () => {
                            const newPosition = Math.min(position + 10000, duration); 
                            await sound.setPositionAsync(newPosition); 
                            setPosition(newPosition); 
                          }}
                        >
                          <Image className="w-[35px] h-[35px]" source={isDarkMode ? blueRightButton : pinkRightButton} />
                        </TouchableOpacity>


                        {/* Model Open Button */}
                        <TouchableOpacity onPress={()=> setUseModel(true)}>
                            <Image className="w-[35px] h-[35px]" source={languagesBook} />
                        </TouchableOpacity>


                        {/* Model Container*/}
                        <Modal visible={useModel} animationType="slide" transparent={true}>
                          <View className="flex-[1] py-2.5 bg-red-500 items-center justify-center">

                              {/* Model Close Button */}
                              <View className="flex-[1] w-[95%] mb-2.5 items-center justify-center">

                              <TouchableOpacity className="w-[70%] border-2 bg-green-500 border-white rounded items-center justify-center p-1.5"
                                                onPress={() => setUseModel(false)}>
                                 <Text className="text-[13px] text-center font-bold text-white">Close</Text>
                              </TouchableOpacity>



                              </View>


                              {/* Model Languages */}
                              <View className="flex-[9] bg-yellow-500 border-2 border-white rounded-lg p-2.5 w-[95%] items-center">
                                                          
                                
                                    <TouchableOpacity className="m-1.25" onPress={() => changeLanguage('English')}>
                                        <Text style={{textShadowColor: "#fbcfe8",textShadowOffset: { height: 2 }, textShadowRadius: 2}}
                                              className="text-[30px] font-bold text-blue-800">English
                                        </Text>
                                    </TouchableOpacity>

                                
                                    <TouchableOpacity className="m-1.25" onPress={() => changeLanguage('Turkish')}>
                                        <Text style={{textShadowColor: "#fbcfe8",textShadowOffset: { height: 2 }, textShadowRadius: 2}}
                                              className="text-[30px] font-bold text-pink-600">Turkish
                                        </Text>
                                    </TouchableOpacity>

                              </View>



                          </View>
                        </Modal>



              
                    </View>        


              </View>
              

      </BlurView>


</View>
  )
}

export default StoryComponent