import React, { useState } from 'react'
import { ImageBackground, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {welcomeKids} from "../constants/images"
import {LoadingPage} from "../components/index"

const Welcome = ({navigation}) => {
const [isLoading, setIsLoading] = useState(false); 

const handleStartPress = () => {
   setIsLoading(true);
   setTimeout(() => {
      setIsLoading(false); 
      navigation.navigate("StoryHome"); 
    }, 1000); 
  };

  return (
    <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={welcomeKids}>

        <StatusBar style="auto"/>
        
        <SafeAreaView className="flex-1 items-center justify-center">
            {isLoading ? ( <LoadingPage />) 
                       : (
              <>

                {/* Top Container */}
                <View className="flex-[4] w-[100%] items-center justify-center">
                  {/* <Text>Flex1</Text> */}
                </View>

                {/* Bottom Container */}
                <View className="flex-[1] w-[100%] items-center justify-center">
                  <TouchableOpacity className="bg-[#F05D77] border-[#FB9EAE] border-t-[1px] border-l-[2px] border-b-[6px] border-r-[2px] w-[75%] items-center justify-center rounded-full p-2"
                                    onPress={handleStartPress}>
                    
                    <Text style={{textShadowColor: "#a3a3a3",textShadowOffset: { height: 3 }, textShadowRadius: 2}}
                          className="font-bold text-[33px] text-cyan-50 italic">Go To Story
                    </Text>

                  </TouchableOpacity>
                </View>
                
              </>
          )}

        </SafeAreaView>
    </ImageBackground>
  )
}

export default Welcome









