import { 
  ImageBackground,
  Pressable, 
  Text, 
  TouchableOpacity, 
  View, 
  Image,
} from 'react-native'
import React from 'react'

import {welcomeKids, lollipopAnimated, rabbitAnimated} from "../constants/images"
import { SafeAreaView } from 'react-native-safe-area-context'



const Welcome = ({navigation}) => {
  return (
    <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={welcomeKids}>
      <SafeAreaView className="border-2 border-lime-500 flex-1 items-center justify-center">

        {/* Top Container */}
         <View className="flex-[4] border-2 border-red-700 w-[100%] items-center justify-center">
          {/* <Text>Flex1</Text> */}
          <Image style={{ width: '50%', height: '50%', resizeMode:"contain"}}
                 source={rabbitAnimated} 
                  />
         </View>

        {/* Bottom Container */}
         <View className="flex-[1] border-2 border-amber-300  w-[100%] items-center justify-center">
          <TouchableOpacity className="bg-[#F05D77] border-[#FB9EAE] border-t-[1px] border-l-[2px] border-b-[6px] border-r-[2px] w-[75%] items-center justify-center rounded-full p-2"
                            onPress={()=> navigation.navigate("StoryHome")}
                            >
          
          <Text style={{textShadowColor: "#a3a3a3",textShadowOffset: { height: 3 }, textShadowRadius: 2}}
                className="font-bold text-[33px] text-cyan-50 italic">Go To Story
          </Text>



            {/* <Text className="font-bold text-[33px] text-cyan-50 italic">Go To Story</Text> */}




            {/* <Text className="font-bold text-[33px] text-cyan-50 italic"
                  style={{textShadowColor: "#a3a3a3",textShadowOffset: { width: 2, height: 2,},textShadowRadius: 3,}}>
                  Go To Story
            </Text> */}


          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ImageBackground>
  )
}

export default Welcome









