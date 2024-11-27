import { ImageBackground, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import Ionicons from '@expo/vector-icons/Ionicons';


const StoryDetails = ({route, navigation}) => {

  return (
  <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={route.params.data.image}>

      <SafeAreaView className="border-2 border-lime-500 flex-1 items-center justify-center">
         
         {/* Header */}
         <View className="flex-[1] flex-row border-2 border-yellow-500 bg-cyan-500 w-[100%] items-center justify-between">

          {/* <Ionicons name="chevron-back-circle-sharp" size={50} color="#FBBF24" style={{borderWidth:2,}}/> */}
    
          <Text>Header</Text>
          <Text>Header</Text>


         </View>


         {/* Story */}
         <View className="flex-[9] border-2 border-red-600 bg-red-600 w-[100%] items-center justify-end">

            <View className="w-[100%] h-[50%] bg-rose-500 border-2 border-yellow-50 items-center justify-center">

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

