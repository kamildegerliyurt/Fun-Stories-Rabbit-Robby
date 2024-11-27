import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native'


import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';


import { useTheme } from "../constants/ThemeContext"
import {backButton} from "../constants/images"


const StoryDetails = ({route, navigation}) => {
//-----------------------------------------
const { isDarkMode, toggleTheme } = useTheme();
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

              {/* <View className="w-[100%] h-[50%] bg-rose-500 border-2 border-yellow-50 items-center justify-center"> */}

              <View className={`w-[100%] h-[50%]  border-2 border-yellow-50 items-center justify-center ${isDarkMode ? "bg-gray-900" : "bg-rose-400"}`}>


                {/* Title */}
                <View className="flex-[1] w-[100%] items-center justify-center border-2 border-blue-700">
                  <Text style={{
                                borderWidth:2,
                                borderColor:"orange", 
                                width:"100%",
                                flex:1, 
                                textAlign:"left", 
                                paddingLeft:4,
                                paddingTop:4,
                                fontSize:14,
                                fontWeight:"500",
                                
                                }} numberOfLines={1} ellipsizeMode='tail'
                          >{route.params.data.engTitle}
                  </Text>
                </View>

                {/* Text */}
                <View className="flex-[6] w-[100%] items-center justify-center border-2 border-lime-300">
                  <Text>Selam</Text>
                </View>

                {/* Sound */}
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

