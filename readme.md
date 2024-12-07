##Penquin Pingo


npm install @react-navigation/native @react-navigation/native-stack react-native-screens @react-native-async-storage/async-storage @expo/vector-icons react-native-safe-area-context

npm install expo-splash-screen
npm install @react-native-community/slider --save
npx expo install expo-av
npm install @rneui/themed

npm install lottie-react-native  
npx expo install expo-linear-gradient  
npx expo install expo-blur  

----------------------------------------------------------- "Reanimated" İşlemleri

npx expo install react-native-reanimated (Buna plugin falanda eklenecek buna bak aşşa linkten)
                                           https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/

1 - // babel.config.js içerisine aşşağıdakileri ekle

      plugins: ['react-native-reanimated/plugin'],  


[ NOT ]: Eğer "nativewind" kullanıcaksan şu şekilde;  


      plugins: [
        "nativewind/babel",
        "react-native-reanimated/plugin",
      ],


----------------------------------------------------------- "NativeWind" İşlemleri

1 - https://www.nativewind.dev/v2/quick-starts/expo sitesine git
2 - V2
3 - Expo
4 - npm install nativewind@2.0.11
   [ NOT ]: Nativewind kurulumunda hata alıyorsan version "nativewind": "^2.0.11" kurrrrr!!

5 - npm install --save-dev tailwindcss@3.3.2
6 - npx tailwindcss init

7- // tailwind.config.js içerisine aşşağıdakileri ekle

   content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],

   [ NOT ]: Burada "src" olarak tüm dosyaları kasettik sen duruma göre değiştirebilirsin

7- // babel.config.js içerisine aşşağıdakileri ekle

    plugins: ["nativewind/babel"],

-----------------------------------------------------------                                     


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ (04/12/2024 StoryDetails)




import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Image, Pressable, Modal, ImageBackground, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider';
import { BlurView } from 'expo-blur';
import { useTheme } from "../constants/ThemeContext"
import { Audio } from 'expo-av';

import { useFocusEffect } from '@react-navigation/native'; 

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import {backButton,pinkPlayButton,pinkPauseButton,pinkRightButton,pinkLeftButton,bluePlayButton,bluePauseButton,blueRightButton,blueLeftButton,} from "../constants/images"


const StoryDetails = ({route, navigation}) => {
//-----------------------------------------
const { engTitle, trTitle, engSound, trSound, engText, trText, image, } = route.params.data;
// //-----------------------------------------
const [useModel, setUseModel]= useState(false);
//-----------------------------------------
const { isDarkMode, toggleTheme } = useTheme();
const [currentPage, setCurrentPage] = useState(0);
const [isPlaying, setIsPlaying] = useState(false); 
//-----------------------------------------
const [currentTitle, setCurrentTitle] = useState(engTitle);
const [currentText, setCurrentText] = useState(engText);
const [currentSound, setCurrentSound]= useState(engSound)
//-----------------------------------------
const [language, setLanguage] = useState('English'); // Default language
//-----------------------------------------
const [sound, setSound] = useState(null); 
const [duration, setDuration] = useState(0);
const [position, setPosition] = useState(0)
//-----------------------------------------
const wordsPerPage = 55; // Bunu "50"di eğer bozulursa "50ye CEK"
const textArray = currentText.split(" ");
const totalPages = Math.ceil(textArray.length / wordsPerPage);

const getPageText = (pageIndex) => {
  const start = pageIndex * wordsPerPage;
  const end = start + wordsPerPage;
  return textArray.slice(start, end).join(" ");
};
//-----------------------------------------
const formatTime = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
//-----------------------------------------
const togglePlayPause = async () => {
  if (isPlaying) {
    setIsPlaying(false); // Düğme durumu hemen değişir
    await sound.pauseAsync();
  } else {
    if (!sound) {
      await loadSound(); // Eğer ses yüklenmediyse önce yükler
    } else if (position >= duration) {
      // Ses sonlandıysa pozisyonu sıfırla ve tekrar oynat
      await sound.setPositionAsync(0);
      setPosition(0);
    }
    setIsPlaying(true); // Düğme durumu hemen değişir
    await sound.playAsync();
  }
};
//-----------------------------------------
const loadSound = async () => {
  const { sound, status } = await Audio.Sound.createAsync(
    currentSound,
    { shouldPlay: true },
    (playbackStatus) => {
      if (playbackStatus.isLoaded) {
        setDuration(playbackStatus.durationMillis || 0);
        setPosition(playbackStatus.positionMillis || 0);

        if (playbackStatus.didJustFinish) {
          // Ses bittiğinde durumu sıfırla
          setIsPlaying(false);
          setPosition(0);
        }
      }
    }
  );
  setSound(sound);
};
//-----------------------------------------
// const soundData = route.params.data.engSound 
// console.log("Data:", soundData)
//-----------------------------------------
const changeLanguage = async (lang) => {
  if (sound) {
    await sound.unloadAsync(); // Unload the current sound
    setSound(null); // Reset the sound instance
  }
  setPosition(0); // Reset slider position
  setDuration(0); // Reset duration
  setIsPlaying(false); // Ensure the playback state is reset

  if (lang === 'English') {
    setCurrentTitle(engTitle);
    setCurrentText(engText);
    setCurrentSound(engSound);
  } else {
    setCurrentTitle(trTitle);
    setCurrentText(trText);
    setCurrentSound(trSound);
  }
  setLanguage(lang); // Update the selected language
  setUseModel(false); // Close the modal
};

//-----------------------------------------
useFocusEffect(
  React.useCallback(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload the sound when navigating away
      }
    };
  }, [sound])
);
//-----------------------------------------
useEffect(() => {
  return sound ? () => {sound.unloadAsync();}
               : undefined;}, 
  [sound]);
//-----------------------------------------




  return (
  <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={image}>

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
                                <Text  className={`text-[15px] font-bold px-[5px] border-2 bg-red-500 w-[100%] h-[100%]
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
                                style={{ width: '90%', borderWidth: 2, padding: 2 }}
                                minimumValue={0}
                                maximumValue={duration}
                                value={position}
                                disabled={!sound} 
                                onSlidingComplete={async (value) => {
                                  await sound.setPositionAsync(value);
                                }}
                              />


                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                                 <Text>{formatTime(position)}</Text>
                                 <Text>{formatTime(duration)}</Text>
                              </View>

                            </View>


                            {/* Sound Buttons */}
                            <View style={{flex:1, paddingVertical:2, width:"100%", flexDirection:"row", borderWidth:2, borderColor:"red",alignItems:"center", justifyContent:"space-evenly"}}>
                        

                                {/* 10 Second Left Button */}
                                <TouchableOpacity 
                                  onPress={async () => {
                                    const newPosition = Math.max(position - 10000, 0); // 10 seconds back, but no less than 0
                                    await sound.setPositionAsync(newPosition); // Set new position
                                    setPosition(newPosition); // Update the position state
                                  }}
                                >
                                  <Image style={{ width: 35, height: 35 }} source={isDarkMode ? blueLeftButton : pinkLeftButton} />
                                </TouchableOpacity>

                                 
                                {/* Play/Pause */}
                                <TouchableOpacity onPress={() => togglePlayPause()}>
                                      <Image 
                                        source={isDarkMode 
                                          ? (isPlaying ? bluePauseButton : bluePlayButton) 
                                          : (isPlaying ? pinkPauseButton : pinkPlayButton)} 
                                        style={{ width: 45, height: 45 }} 
                                      />
                                </TouchableOpacity>


                               {/* 10 Second Right Button */}
                                <TouchableOpacity 
                                  onPress={async () => {
                                    const newPosition = Math.min(position + 10000, duration); // 10 seconds forward, but no more than the duration
                                    await sound.setPositionAsync(newPosition); // Set new position
                                    setPosition(newPosition); // Update the position state
                                  }}
                                >
                                  <Image style={{ width: 35, height: 35 }} source={isDarkMode ? blueRightButton : pinkRightButton} />
                                </TouchableOpacity>


                                {/* Model Open Button */}
                                <TouchableOpacity style={{borderWidth:2, 
                                                          backgroundColor:"green", 
                                                          borderRadius:5,}}
                                                  onPress={()=> setUseModel(true)}>
                                     <Text>Change</Text>
                                </TouchableOpacity>


                                {/* Model Container*/}
                                <Modal visible={useModel} animationType="slide" transparent={true}>
                                   <View style={{flex:1, paddingVertical:10, backgroundColor:"red", borderWidth:2, borderColor:"yellow", alignItems:"center", justifyContent:"center"}}>

                                      {/* Model Close Button */}
                                      <View style={{flex:1,marginBottom:10, borderWidth:2, borderColor:"blue", width:"95%",alignItems:"center", justifyContent:"center"}}>

                                        <TouchableOpacity 
                                        style={{borderWidth:2, backgroundColor:"white", borderRadius:5, width:"70%",alignItems:"center", justifyContent:"center"}}
                                        onPress={() => setUseModel(false)}>
                                          <Text>Close</Text>
                                        </TouchableOpacity>

                                      </View>


                                      {/* Model Languages */}
                                      <View 
                                      style={{flex:9, paddingVertical:10, borderWidth:2, borderColor:"blue",width:"95%",alignItems:"center",}}>
                                                                  
                                            {/* English */}
                                            <Pressable style={{ borderWidth: 2, margin: 5 }} onPress={() => changeLanguage('English')}>
                                              <Text style={{ fontSize: 25, fontWeight: "bold", color: "#ffffff" }}>English</Text>
                                            </Pressable>

                                            {/* Turkish */}
                                            <Pressable style={{ borderWidth: 2, margin: 5 }} onPress={() => changeLanguage('Turkish')}>
                                              <Text style={{ fontSize: 25, fontWeight: "bold", color: "#ffffff" }}>Turkish</Text>
                                            </Pressable>

                                      </View>



                                   </View>
                                </Modal>



                       
                            </View>        


                      </View>
                      

              </BlurView>


          </View>


          
       
      </SafeAreaView>

  </ImageBackground>

  )
}

export default StoryDetails

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ (06/12/2024 StoryDetails "EN GÜNCEL")


import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Image, Pressable, Modal, ImageBackground, TouchableOpacity  } from 'react-native'
import Slider from '@react-native-community/slider';
import { BlurView } from 'expo-blur';
import { useTheme } from "../constants/ThemeContext"
import { Audio } from 'expo-av';

import { useFocusEffect } from '@react-navigation/native'; 

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import {backButton,pinkPlayButton,pinkPauseButton,pinkRightButton,pinkLeftButton,bluePlayButton,bluePauseButton,blueRightButton,blueLeftButton,} from "../constants/images"


const StoryDetails = ({route, navigation}) => {
//-----------------------------------------
const { engTitle, trTitle, engSound, trSound, engText, trText, image, } = route.params.data;
// //-----------------------------------------
const [useModel, setUseModel]= useState(false);
//-----------------------------------------
const { isDarkMode, toggleTheme } = useTheme();
const [currentPage, setCurrentPage] = useState(0);
const [isPlaying, setIsPlaying] = useState(false); 
//-----------------------------------------
const [currentTitle, setCurrentTitle] = useState(engTitle);
const [currentText, setCurrentText] = useState(engText);
const [currentSound, setCurrentSound]= useState(engSound)
//-----------------------------------------
const [language, setLanguage] = useState('English'); // Default language
//-----------------------------------------
const [sound, setSound] = useState(null); 
const [duration, setDuration] = useState(0);
const [position, setPosition] = useState(0)
//-----------------------------------------
const wordsPerPage = 55; // Bunu "50"di eğer bozulursa "50ye CEK"
const textArray = currentText.split(" ");
const totalPages = Math.ceil(textArray.length / wordsPerPage);

const getPageText = (pageIndex) => {
  const start = pageIndex * wordsPerPage;
  const end = start + wordsPerPage;
  return textArray.slice(start, end).join(" ");
};
//-----------------------------------------
const formatTime = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
//-----------------------------------------
const togglePlayPause = async () => {
  if (isPlaying) {
    // Eğer zaten çalıyorsa, durdur.
    setIsPlaying(false);
    await sound.pauseAsync();
  } else {
    if (!sound) {
      // Eğer ses yüklenmemişse, önce yükle.
      await loadSound(); // Ses yükleniyor
    } else {
      // Ses bitti mi? Eğer bitti ise, pozisyonu sıfırla.
      if (position >= duration || position === 0) {
        await sound.setPositionAsync(0); // Pozisyonu sıfırla
        setPosition(0); // Slider'ı sıfırla
      }
    }

    // Oynatmaya başla
    setIsPlaying(true);
    await sound.playAsync();
  }
};

//-----------------------------------------
const loadSound = async () => {
  const { sound, status } = await Audio.Sound.createAsync(
    currentSound,
    { shouldPlay: true },
    (playbackStatus) => {
      if (playbackStatus.isLoaded) {
        setDuration(playbackStatus.durationMillis || 0);
        setPosition(playbackStatus.positionMillis || 0);
        
        // Eğer ses bitti ise, durumu sıfırlıyoruz
        if (playbackStatus.didJustFinish) {
          setIsPlaying(false);
          setPosition(0);
        }
      }
    }
  );
  setSound(sound); // Ses nesnesini state'e atıyoruz
};

//-----------------------------------------
useEffect(() => {
  const soundData = route.params.data.engSound;
  console.log("Data:", soundData);
}, []);
//-----------------------------------------
const changeLanguage = async (lang) => {
  if (sound) {
    await sound.unloadAsync(); // Unload the current sound
    setSound(null); // Reset the sound instance
  }
  setPosition(0); // Reset slider position
  setDuration(0); // Reset duration
  setIsPlaying(false); // Ensure the playback state is reset

  if (lang === 'English') {
    setCurrentTitle(engTitle);
    setCurrentText(engText);
    setCurrentSound(engSound);
  } else {
    setCurrentTitle(trTitle);
    setCurrentText(trText);
    setCurrentSound(trSound);
  }
  setLanguage(lang); // Update the selected language
  setUseModel(false); // Close the modal
};

//-----------------------------------------
useFocusEffect(
  React.useCallback(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload the sound when navigating away
      }
    };
  }, [sound])
);
//-----------------------------------------
useEffect(() => {
  return sound ? () => {sound.unloadAsync();}
               : undefined;}, 
  [sound]);
//-----------------------------------------




  return (
  <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={image}>

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
                                <Text  className={`text-[15px] font-bold px-[5px] border-2 bg-red-500 w-[100%] h-[100%]
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
                                style={{ width: '90%', borderWidth: 2, padding: 2 }}
                                minimumValue={0}
                                maximumValue={duration}
                                value={position}
                                disabled={!sound} 
                                onSlidingComplete={async (value) => {
                                  await sound.setPositionAsync(value);
                                }}
                              />


                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                                 <Text>{formatTime(position)}</Text>
                                 <Text>{formatTime(duration)}</Text>
                              </View>

                            </View>


                            {/* Sound Buttons */}
                            <View style={{flex:1, paddingVertical:2, width:"100%", flexDirection:"row", borderWidth:2, borderColor:"red",alignItems:"center", justifyContent:"space-evenly"}}>
                        

                                {/* 10 Second Left Button */}
                                <TouchableOpacity 
                                  onPress={async () => {
                                    const newPosition = Math.max(position - 10000, 0); // 10 seconds back, but no less than 0
                                    await sound.setPositionAsync(newPosition); // Set new position
                                    setPosition(newPosition); // Update the position state
                                  }}
                                >
                                  <Image style={{ width: 35, height: 35 }} source={isDarkMode ? blueLeftButton : pinkLeftButton} />
                                </TouchableOpacity>

                                 
                                {/* Play/Pause */}
                                <TouchableOpacity onPress={() => togglePlayPause()}>
                                      <Image 
                                        source={isDarkMode 
                                          ? (isPlaying ? bluePauseButton : bluePlayButton) 
                                          : (isPlaying ? pinkPauseButton : pinkPlayButton)} 
                                        style={{ width: 45, height: 45 }} 
                                      />
                                </TouchableOpacity>


                               {/* 10 Second Right Button */}
                                <TouchableOpacity 
                                  onPress={async () => {
                                    const newPosition = Math.min(position + 10000, duration); // 10 seconds forward, but no more than the duration
                                    await sound.setPositionAsync(newPosition); // Set new position
                                    setPosition(newPosition); // Update the position state
                                  }}
                                >
                                  <Image style={{ width: 35, height: 35 }} source={isDarkMode ? blueRightButton : pinkRightButton} />
                                </TouchableOpacity>


                                {/* Model Open Button */}
                                <TouchableOpacity style={{borderWidth:2, 
                                                          backgroundColor:"green", 
                                                          borderRadius:5,}}
                                                  onPress={()=> setUseModel(true)}>
                                     <Text>Change</Text>
                                </TouchableOpacity>


                                {/* Model Container*/}
                                <Modal visible={useModel} animationType="slide" transparent={true}>
                                   <View style={{flex:1, paddingVertical:10, backgroundColor:"red", borderWidth:2, borderColor:"yellow", alignItems:"center", justifyContent:"center"}}>

                                      {/* Model Close Button */}
                                      <View style={{flex:1,marginBottom:10, borderWidth:2, borderColor:"blue", width:"95%",alignItems:"center", justifyContent:"center"}}>

                                        <TouchableOpacity 
                                        style={{borderWidth:2, backgroundColor:"white", borderRadius:5, width:"70%",alignItems:"center", justifyContent:"center"}}
                                        onPress={() => setUseModel(false)}>
                                          <Text>Close</Text>
                                        </TouchableOpacity>

                                      </View>


                                      {/* Model Languages */}
                                      <View 
                                      style={{flex:9, paddingVertical:10, borderWidth:2, borderColor:"blue",width:"95%",alignItems:"center",}}>
                                                                  
                                            {/* English */}
                                            <Pressable style={{ borderWidth: 2, margin: 5 }} onPress={() => changeLanguage('English')}>
                                              <Text style={{ fontSize: 25, fontWeight: "bold", color: "#ffffff" }}>English</Text>
                                            </Pressable>

                                            {/* Turkish */}
                                            <Pressable style={{ borderWidth: 2, margin: 5 }} onPress={() => changeLanguage('Turkish')}>
                                              <Text style={{ fontSize: 25, fontWeight: "bold", color: "#ffffff" }}>Turkish</Text>
                                            </Pressable>

                                      </View>



                                   </View>
                                </Modal>



                       
                            </View>        


                      </View>
                      

              </BlurView>


          </View>

          
       
      </SafeAreaView>

  </ImageBackground>

  )
}

export default StoryDetails

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ StoryComponent

import React, { useState, useEffect } from 'react'
import { View, Text, Image, Pressable, Modal, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider';
import { BlurView } from 'expo-blur';
import { useTheme } from "../constants/ThemeContext"
import { Audio } from 'expo-av';

import { useFocusEffect } from '@react-navigation/native'; 

// import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import {pinkPlayButton,pinkPauseButton,pinkRightButton,pinkLeftButton,bluePlayButton,bluePauseButton,blueRightButton,blueLeftButton,} from "../constants/images"

const StoryComponent = ({route}) => {
//-----------------------------------------
const { engTitle, trTitle, engSound, trSound, engText, trText, } = route.params.data;
// //-----------------------------------------
const [useModel, setUseModel]= useState(false);
//-----------------------------------------
const { isDarkMode, toggleTheme } = useTheme();
const [currentPage, setCurrentPage] = useState(0);
const [isPlaying, setIsPlaying] = useState(false); 
//-----------------------------------------
const [currentTitle, setCurrentTitle] = useState(engTitle);
const [currentText, setCurrentText] = useState(engText);
const [currentSound, setCurrentSound]= useState(engSound)
//-----------------------------------------
const [language, setLanguage] = useState('English'); // Default language
//-----------------------------------------
const [sound, setSound] = useState(null); 
const [duration, setDuration] = useState(0);
const [position, setPosition] = useState(0)
//-----------------------------------------
const wordsPerPage = 55; // Bunu "50"di eğer bozulursa "50ye CEK"
const textArray = currentText.split(" ");
const totalPages = Math.ceil(textArray.length / wordsPerPage);

const getPageText = (pageIndex) => {
  const start = pageIndex * wordsPerPage;
  const end = start + wordsPerPage;
  return textArray.slice(start, end).join(" ");
};
//-----------------------------------------
const formatTime = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
//-----------------------------------------
const togglePlayPause = async () => {
  if (isPlaying) {
    // Eğer zaten çalıyorsa, durdur.
    setIsPlaying(false);
    await sound.pauseAsync();
  } else {
    if (!sound) {
      // Eğer ses yüklenmemişse, önce yükle.
      await loadSound(); // Ses yükleniyor
    } else {
      // Ses bitti mi? Eğer bitti ise, pozisyonu sıfırla.
      if (position >= duration || position === 0) {
        await sound.setPositionAsync(0); // Pozisyonu sıfırla
        setPosition(0); // Slider'ı sıfırla
      }
    }

    // Oynatmaya başla
    setIsPlaying(true);
    await sound.playAsync();
  }
};

//-----------------------------------------
const loadSound = async () => {
  const { sound, status } = await Audio.Sound.createAsync(
    currentSound,
    { shouldPlay: true },
    (playbackStatus) => {
      if (playbackStatus.isLoaded) {
        setDuration(playbackStatus.durationMillis || 0);
        setPosition(playbackStatus.positionMillis || 0);
        
        // Eğer ses bitti ise, durumu sıfırlıyoruz
        if (playbackStatus.didJustFinish) {
          setIsPlaying(false);
          setPosition(0);
        }
      }
    }
  );
  setSound(sound); // Ses nesnesini state'e atıyoruz
};

//-----------------------------------------
useEffect(() => {
  const soundData = route.params.data.engSound;
  console.log("Data:", soundData);
}, []);
//-----------------------------------------
const changeLanguage = async (lang) => {
  if (sound) {
    await sound.unloadAsync(); // Unload the current sound
    setSound(null); // Reset the sound instance
  }
  setPosition(0); // Reset slider position
  setDuration(0); // Reset duration
  setIsPlaying(false); // Ensure the playback state is reset

  if (lang === 'English') {
    setCurrentTitle(engTitle);
    setCurrentText(engText);
    setCurrentSound(engSound);
  } else {
    setCurrentTitle(trTitle);
    setCurrentText(trText);
    setCurrentSound(trSound);
  }
  setLanguage(lang); // Update the selected language
  setUseModel(false); // Close the modal
};

//-----------------------------------------
useFocusEffect(
  React.useCallback(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload the sound when navigating away
      }
    };
  }, [sound])
);
//-----------------------------------------
useEffect(() => {
  return sound ? () => {sound.unloadAsync();}
               : undefined;}, 
  [sound]);
//-----------------------------------------


  return (
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
                      <Text  className={`text-[15px] font-bold px-[5px] border-2 bg-red-500 w-[100%] h-[100%]
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
                      style={{ width: '90%', borderWidth: 2, padding: 2 }}
                      minimumValue={0}
                      maximumValue={duration}
                      value={position}
                      disabled={!sound} 
                      onSlidingComplete={async (value) => {
                        await sound.setPositionAsync(value);
                      }}
                    />


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                       <Text>{formatTime(position)}</Text>
                       <Text>{formatTime(duration)}</Text>
                    </View>

                  </View>


                  {/* Sound Buttons */}
                  <View style={{flex:1, paddingVertical:2, width:"100%", flexDirection:"row", borderWidth:2, borderColor:"red",alignItems:"center", justifyContent:"space-evenly"}}>
              

                      {/* 10 Second Left Button */}
                      <TouchableOpacity 
                        onPress={async () => {
                          const newPosition = Math.max(position - 10000, 0); // 10 seconds back, but no less than 0
                          await sound.setPositionAsync(newPosition); // Set new position
                          setPosition(newPosition); // Update the position state
                        }}
                      >
                        <Image style={{ width: 35, height: 35 }} source={isDarkMode ? blueLeftButton : pinkLeftButton} />
                      </TouchableOpacity>

                       
                      {/* Play/Pause */}
                      <TouchableOpacity onPress={() => togglePlayPause()}>
                            <Image 
                              source={isDarkMode 
                                ? (isPlaying ? bluePauseButton : bluePlayButton) 
                                : (isPlaying ? pinkPauseButton : pinkPlayButton)} 
                              style={{ width: 45, height: 45 }} 
                            />
                      </TouchableOpacity>


                      {/* 10 Second Right Button */}
                      <TouchableOpacity 
                        onPress={async () => {
                          const newPosition = Math.min(position + 10000, duration); // 10 seconds forward, but no more than the duration
                          await sound.setPositionAsync(newPosition); // Set new position
                          setPosition(newPosition); // Update the position state
                        }}
                      >
                        <Image style={{ width: 35, height: 35 }} source={isDarkMode ? blueRightButton : pinkRightButton} />
                      </TouchableOpacity>


                      {/* Model Open Button */}
                      <TouchableOpacity style={{borderWidth:2, 
                                                backgroundColor:"green", 
                                                borderRadius:5,}}
                                        onPress={()=> setUseModel(true)}>
                           <Text>Change</Text>
                      </TouchableOpacity>


                      {/* Model Container*/}
                      <Modal visible={useModel} animationType="slide" transparent={true}>
                         <View style={{flex:1, paddingVertical:10, backgroundColor:"red", borderWidth:2, borderColor:"yellow", alignItems:"center", justifyContent:"center"}}>

                            {/* Model Close Button */}
                            <View style={{flex:1,marginBottom:10, borderWidth:2, borderColor:"blue", width:"95%",alignItems:"center", justifyContent:"center"}}>

                              <TouchableOpacity 
                              style={{borderWidth:2, backgroundColor:"white", borderRadius:5, width:"70%",alignItems:"center", justifyContent:"center"}}
                              onPress={() => setUseModel(false)}>
                                <Text>Close</Text>
                              </TouchableOpacity>

                            </View>


                            {/* Model Languages */}
                            <View 
                            style={{flex:9, paddingVertical:10, borderWidth:2, borderColor:"blue",width:"95%",alignItems:"center",}}>
                                                        
                               
                                  <Pressable style={{ borderWidth: 2, margin: 5 }} onPress={() => changeLanguage('English')}>
                                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#ffffff" }}>English</Text>
                                  </Pressable>

                              
                                  <Pressable style={{ borderWidth: 2, margin: 5 }} onPress={() => changeLanguage('Turkish')}>
                                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#ffffff" }}>Turkish</Text>
                                  </Pressable>

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

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 

