import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';


import { useTheme } from "../constants/ThemeContext"
import { useState, useEffect } from 'react';
import { BlurView } from 'expo-blur';

import Slider from '@react-native-community/slider';


import {
  backButton,
  pinkPlayButton,
  pinkPauseButton,
  pinkRightButton,
  pinkLeftButton,
  bluePlayButton,
  bluePauseButton,
  blueRightButton,
  blueLeftButton,

} from "../constants/images"



import { Audio } from 'expo-av';


const StoryDetails = ({route, navigation}) => {
//-----------------------------------------
const engTitle = route.params.data.engTitle
const trTitle = route.params.data.trTitle
const engSound = route.params.data.engSound
const trSound = route.params.data.trSound
const engText = route.params.data.engText
const trText = route.params.data.trText
const imageBackGround = route.params.data.image
//-----------------------------------------
const { isDarkMode, toggleTheme } = useTheme();
const [currentPage, setCurrentPage] = useState(0);
const [isPlaying, setIsPlaying] = useState(false); 

const [currentTitle, setCurrentTitle] = useState(engTitle);
const [currentText, setCurrentText] = useState(engText);
//-----------------------------------------
// Split text into pages
const wordsPerPage = 55; // Bunu "50"di eğer bozulursa "50ye CEK"
const textArray = currentText.split(" ");
const totalPages = Math.ceil(textArray.length / wordsPerPage);

const getPageText = (pageIndex) => {
  const start = pageIndex * wordsPerPage;
  const end = start + wordsPerPage;
  return textArray.slice(start, end).join(" ");
};
//-----------------------------------------
const togglePlayPause = () => {
  setIsPlaying(!isPlaying); // Durumu değiştir
};
//-----------------------------------------
// const soundData = route.params.data.engSound 
// console.log("Data:", soundData)
//-----------------------------------------
const changeLanguage = () => {
  if (currentTitle === engTitle) {
    setCurrentTitle(trTitle);
    setCurrentText(trText);
  } else {
    setCurrentTitle(engTitle);
    setCurrentText(engText);
  }
};
//-----------------------------------------

  return (
  <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={imageBackGround}>

      <SafeAreaView className="border-2 border-lime-500 flex-1 items-center justify-center">
         
          {/* Header */}
          <View className="flex-[1] flex-row border-2 border-yellow-500 bg-cyan-500 w-[100%] items-center justify-between px-2">


              {/* Back Button */}
              <View className="flex-[1] w-[100%] h-[100%] border-2 items-center justify-center">
                <TouchableOpacity className="border-2 items-center justify-center self-start" 
                                  onPress={()=> navigation.navigate("StoryHome")}>
                  <Image className="w-[60px] h-[60px]" source={backButton} />
                </TouchableOpacity>

              </View>

              {/* Dark/Light Mode */}
              <View className="flex-[3] w-[100%] h-[100%] border-2 items-center justify-center">

                  <TouchableOpacity className="self-end bg-blue-500 p-1 rounded-full" onPress={toggleTheme}>
                        {isDarkMode ? (<Ionicons name="sunny" size={45} color="#fbbf24" />) 
                                    : (<Entypo name="moon" size={45} color="#fbbf24" />)}
                  </TouchableOpacity>

              </View>


          </View>


          {/* Story */}
          <View className="flex-[9] border-2 border-red-600 w-[100%] items-center justify-end">
          
 
              <BlurView className={`w-[100%] h-[60%] border-2 border-rose-400  rounded-t-2xl 
                                    ${isDarkMode ? "bg-black/70" : "bg-yellow-400"}`}>


                      {/* Title Container */}
                      <View className="flex-[1] w-[100%] bg-blue-600 rounded-t-2xl items-center justify-center border-2 border-blue-700">

                          <Text className={`flex-[1] w-[100%] border-2 rounded-t-2xl border-orange-500 text-left pl-1 pt-1 text-[14px] font-bold 
                                            ${isDarkMode ? "text-gray-200" : "text-gray-900"}`} 
                                numberOfLines={1} 
                                ellipsizeMode='tail'>{currentTitle}
                          </Text>
                        
                      </View>


                      {/* Text Container */}
                      <View className="flex-[5] w-[100%] bg-green-300 items-center justify-center border-2 border-lime-300">
                        
                            {/* Text */}
                            <View className="flex-[6] border-2 w-[100%] items-center justify-center">
                                <Text  className={`text-[15px] font-bold px-[5px] border-2 border-red-500 w-[100%] h-[100%]
                                                  ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                                                  // numberOfLines={9}
                                                  // ellipsizeMode='tail'
                                                  >{getPageText(currentPage)}
                                </Text>

                            </View>


                            {/* Right/Left Buttons */}
                            <View className="flex-[1] flex-row border-2 w-[100%] items-center justify-between px-[2px]">
                      
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
                      <View className="flex-[2] w-[100%] bg-white items-center justify-center border-2 border-violet-800">

                            {/* Slider */}
                            <View style={{flex:1, width:"100%", borderWidth:2, borderColor:"blue",alignItems:"center", justifyContent:"center"}}>
                                <Slider
                                    style={{ flex:1, width: '100%', borderWidth:2, borderColor:"red",}}
                                    // minimumValue={0}
                                    // maximumValue={duration}
                                    // value={position}
                                    minimumTrackTintColor="white"
                                    maximumTrackTintColor="black"
                                    thumbTintColor="red"
                                    // onSlidingComplete={async (value) => {
                                    //   if (!isPaused) {
                                    //     await soundRef.current.setPositionAsync(value); 
                                    //   }
                                    // }}
                                    // disabled={!sliderEnabled} 
                                  />

                                 {/* Time-Duration */}
                                <View style={{flexDirection:"row", borderWidth:2, borderColor:"black", width:"100%", alignItems:"center", justifyContent:"space-between"}}>
                                  <Text>Start</Text>
                                  <Text>Finish</Text>
                                </View>

                            </View>


                            {/* Sound Buttons */}
                            <View style={{flex:1, paddingVertical:2, width:"100%", flexDirection:"row", borderWidth:2, borderColor:"red",alignItems:"center", justifyContent:"space-evenly"}}>
                        
                                <Image style={{width:35, height:35}} source={isDarkMode ? blueLeftButton : pinkLeftButton} />
                                 
                                  {/* Play/Pause */}
                                <TouchableOpacity onPress={togglePlayPause}>
                                      <Image source={isDarkMode ? (isPlaying ? bluePauseButton : bluePlayButton) 
                                                                : (isPlaying ? pinkPauseButton : pinkPlayButton)} 
                                             style={{width: 45, height: 45}}/>
                                </TouchableOpacity>

                                <Image style={{width:35, height:35}} source={isDarkMode ? blueRightButton : pinkRightButton}/>

                                {/* Change Languages */}
                                <TouchableOpacity 
                                  style={{borderWidth:2, backgroundColor:"green", borderRadius:5,}}
                                  onPress={changeLanguage}>
                                     <Text>Change</Text>
                                </TouchableOpacity>

                       
                            </View>        


                      </View>
                      

              </BlurView>


          </View>


         
      </SafeAreaView>

  </ImageBackground>

  )
}

export default StoryDetails