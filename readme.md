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


import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';


import { useTheme } from "../constants/ThemeContext"
import {backButton} from "../constants/images"
import { useState } from 'react';


const StoryDetails = ({route, navigation}) => {
//-----------------------------------------
const { isDarkMode, toggleTheme } = useTheme();
//-----------------------------------------
const [currentPage, setCurrentPage] = useState(0);

// Split text into pages
const wordsPerPage = 70; // Bunu "50"di eğer bozulursa "50ye CEK"
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

      <SafeAreaView className="border-2 border-lime-500 bg-red-700 flex-1 items-center justify-center">
         
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


              <View className={`w-[100%] h-[50%] border-2 rounded-t-2xl border-yellow-50 items-center justify-center ${isDarkMode ? "bg-gray-900" : "bg-amber-400"}`}>


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
                        <View className="flex-[6] border-2 w-[100%] items-center justify-center">
                            <Text  className={`text-[15px] font-bold px-[5px] 
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
                    <Text>Selam</Text>
                  </View>

              </View>


          </View>


         
      </SafeAreaView>

  </ImageBackground>

  )
}

export default StoryDetails





