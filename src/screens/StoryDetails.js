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


const StoryDetails = ({route, navigation}) => {
//-----------------------------------------
const { isDarkMode, toggleTheme } = useTheme();
//-----------------------------------------
const [currentPage, setCurrentPage] = useState(0);
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
                                <Image style={{width:45, height:45}} source={isDarkMode ? bluePlayButton : pinkPlayButton} />
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

