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


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageBackground, Text, View, StatusBar } from 'react-native'


import {welcomeKids} from "../constants/images"

import {StoryItem, LoadingPage} from "../components/index"
import { useNavigation } from '@react-navigation/native'

const StoryHome = () => {
//----------------------------------------
const [loading, setLoading] = useState(false);
//----------------------------------------
const navigation = useNavigation();
//----------------------------------------
const handleItemPress = (item) => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    navigation.navigate("StoryDetails", { data: item });
  }, 2000); // Loading Time
};
//----------------------------------------



  return (
    <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={welcomeKids}>
      
      <StatusBar style="auto" />

      {loading ? (<LoadingPage />) 
               : (
        <SafeAreaView className="border-2 border-lime-500 flex-1 items-center justify-center">

            {/* Header */}
            <View className="flex-[1] border-2 border-pink-500 w-[100%] items-center justify-center">
              <Text style={{textShadowColor: "#a3a3a3",textShadowOffset: { height: 3 }, textShadowRadius: 2}}
                    className="text-center font-bold text-[33px] text-cyan-50 italic">Stories
              </Text>     
            </View>


            {/* Flatlist */}  

            <View className="flex-[9] border-2 border-black w-[100%] items-center justify-center">
                <StoryItem onItemPress={handleItemPress} />
            </View>  


            {/* Yukarıdaki "StoryItem" verisini  bulunduran "View" kaldırdım o itiyor olabilir aşşa diye duruma göre*/} 




        </SafeAreaView>
      )}

    </ImageBackground>
  )
}

export default StoryHome

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


import { FlatList, Text, View, RefreshControl, Pressable, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';

import data from '../constants/data'
import Animated, { BounceInDown, PinwheelOut } from 'react-native-reanimated';


const StoryItem = (props) => {
//-----------------------------------
const [productData, setProductData] = useState([]);
const [refreshing, setRefreshing] = useState(false);
//-----------------------------------
useEffect(() => {
  setProductData(data.stories);
    // console.log("Loaded Data:", data.stories);
}, []);
//-----------------------------------RefreshControl
const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
}, []);
//-----------------------------------
const MyAnimatedButton = Animated.createAnimatedComponent(Pressable);
const HomePageBounceInDown = BounceInDown.springify().damping(2).mass(3).stiffness(10);
const HomePagePinwheelOut = PinwheelOut;
//-----------------------------------




  return (
    <View style={{
      // flex:1,
      flex:9,   //Burası "1" di aşşaya doğru itiyordu acaba hata ondanmı diye "9" yaptım
      width:"100%",
      borderWidth:2,
      borderColor:"lime",
      backgroundColor:"blue",
      alignItems:"center", 
      justifyContent:"center",
      }}>
      {/* <Text className="text-white font-bold">StoryItem</Text> */}
      <FlatList 
        data={productData}

        // style={{
        //   borderWidth:2, 
        //   width:"100%", 
        //   borderColor:"white",
        // }} // Kayma OLURSAA "contentContainerStyle" olarak değiştir


        contentContainerStyle={{ 
          width:"100%",
          alignItems:"center", 
          justifyContent:"center", 
          borderWidth:2, 
          borderColor:"white", 
        }} //Bunu kaldırınca "Resimler KAYIYOR"

        numColumns={(2)}
        // pagingEnabled
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item})=> {
           //---------------------------------------
            const image = item?.image;
            const title = item?.engTitle;       
           //---------------------------------------


            return(
                <MyAnimatedButton style={{
                                          borderWidth:3,
                                          borderColor:"red",
                                          backgroundColor:"#F36555",
                                        //   width:"45%", 
                                          width:"45%",
                                          // margin:10,  
                                          margin:8, 
                                          alignItems:"center",
                                          justifyContent:"center", 
                                        //   borderRadius:20, 
                                        }}
                                  entering={HomePageBounceInDown}
                                  exiting={HomePagePinwheelOut}
                                  onPress={() => props.onItemPress(item)}
                                  >

                    {/* Resim gösterimi */}
                    <View style={{
                                  flex:2, 
                                  borderWidth:2,         //Burasını kaldırınca "Resim Tam Oturacak"
                                  borderColor:"blue", 
                                  width:"100%",
                                  height:"100%", //Burasını "Aşşa kayıyor diye ekledim duruma göre kaldır başlangıçta YOKTU"
                                  alignItems:"center", 
                                  justifyContent:"center",
                                //   borderRadius:20, 
                                  }}>
                      <Image style={{
                                     width:"100%",
                                     height:190, 
                                     resizeMode:"cover", 
                                    //  borderRadius:20,
                                     }} 
                             source={image} />
                    {/* <Image style={{width:"100%", height:190, resizeMode:"cover",  borderRadius:20,}} source={item.image} /> */}
                    </View>

                    {/* Text */}
                    <View style={{
                                  flex:1, //Bunları kaldırdım "Yapıları aşşa itiyor" diye tekrar eklenebilir
                                  borderWidth:2, 
                                  borderColor:"lime", 
                                  width:"100%",
                                  height:"100%", //Burasını "Aşşa kayıyor diye ekledim duruma göre kaldır başlangıçta YOKTU" 
                                  alignItems:"center", 
                                  justifyContent:"center"
                                  }}>
                        <Text style={{
                                  //  flex:1, //Bunları kaldırdım "Yapıları aşşa itiyor" diye tekrar eklenebilir
                                   width:"100%",
                                  //  height:"100%",
                                   borderWidth:2,
                                   borderColor:"yellow",
                                   fontSize:14,
                                   fontWeight:"bold",
                                   fontStyle:"italic",
                                   textAlign:"center",
                                   paddingHorizontal:5,
                                   padding:2,
                                //    textShadowColor: "#d4d4d8",
                                //    textShadowOffset: { height: 2, }, 
                                //    textShadowRadius: 2,
                                }}
                              numberOfLines={2}   //Sorun burada!!!! [Burada "engTitle"lar bazılarında "TEK SATIR'a sığdığı için" bozuyor "RESİM AŞŞAYA KAYIYOR" ÇÖZÜM: "engTitle" verilerinin sonuna "..." ekledim ve "2" satıra uzamasını sağladım :D]
                              ellipsizeMode='tail'
                              >{title}
                        </Text>

                    </View>

                   


                </MyAnimatedButton>
            )
        }}


        />
    </View>
  )
}

export default StoryItem




@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';


import { useTheme } from "../constants/ThemeContext"
import { useState } from 'react';
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
const { isDarkMode, toggleTheme } = useTheme();
//-----------------------------------------
const [currentPage, setCurrentPage] = useState(0);
//-----------------------------------------
const [isPlaying, setIsPlaying] = useState(false); // Yeni state
//-----------------------------------------
// Split text into pages
const wordsPerPage = 85; // Bunu "50"di eğer bozulursa "50ye CEK"
const textArray = route.params.data.engText.split(" ");
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

  return (
  <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={route.params.data.image}>

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
                      <View className="flex-[1] w-[100%] rounded-t-2xl items-center justify-center border-2 border-blue-700">

                          <Text className={`flex-[1] w-[100%] border-2 rounded-t-2xl border-orange-500 text-left pl-1 pt-1 text-[14px] font-bold 
                                            ${isDarkMode ? "text-gray-200" : "text-gray-900"}`} 
                                numberOfLines={1} 
                                ellipsizeMode='tail'>{route.params.data.engTitle}
                          </Text>
                        
                      </View>


                      {/* Text Container */}
                      <View className="flex-[6] w-[100%] items-center justify-center border-2 border-lime-300">
                        
                            {/* Text */}
                            <View className="flex-[6] bg-rose-600 border-2 w-[100%] items-center justify-center">
                                <Text  className={`text-[15px] font-bold px-[5px] border-2 border-white w-[100%] h-[100%]
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
                      <View className="flex-[2] w-[100%] items-center justify-center border-2 border-violet-800">

                            {/* Slider */}
                            <View style={{flex:1, width:"100%", borderWidth:2, borderColor:"blue",alignItems:"center", justifyContent:"center"}}>
                                <Slider
                                    style={{ flex:1, width: '100%', borderWidth:2, borderColor:"lime",}}
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

                            </View>


                            {/* Sound Buttons */}
                            <View style={{flex:2, width:"100%", flexDirection:"row", borderWidth:2, borderColor:"red",alignItems:"center", justifyContent:"space-evenly"}}>
                        
                                <Image style={{width:40, height:40}} source={isDarkMode ? blueLeftButton : pinkLeftButton} />
                                <TouchableOpacity onPress={togglePlayPause}>
                                    <Image style={{width: 45, height: 45}} 
                                           source={isDarkMode ? (isPlaying ? bluePauseButton : bluePlayButton) 
                                                              : (isPlaying ? pinkPauseButton : pinkPlayButton)} 
                                    />
                                </TouchableOpacity>
                                <Image style={{width:40, height:40}} source={isDarkMode ? blueRightButton : pinkRightButton}/>

                       
                            </View>        


                      </View>
                      

              </BlurView>


          </View>


         
      </SafeAreaView>

  </ImageBackground>

  )
}

export default StoryDetails


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ StoryDetails (Last)



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


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 


