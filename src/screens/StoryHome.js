import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageBackground, Text, View, StatusBar } from 'react-native'

import {welcomeKids} from "../constants/images"

import {StoryItem, LoadingPage} from "../components/index"
import { useNavigation } from '@react-navigation/native'

const StoryHome = () => {
const [loading, setLoading] = useState(false);
const navigation = useNavigation();

const handleItemPress = (item) => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    navigation.navigate("StoryDetails", { data: item });
  }, 2000); 
};


  return (
    <ImageBackground className="flex-[1] w-[100%]" source={welcomeKids} resizeMode="cover">
      
      <StatusBar style="auto" />

      {loading ? (<LoadingPage />) 
               : (
        <SafeAreaView className="flex-[1] items-center justify-center">

            
            <View className="flex-[1] w-[100%] items-center justify-center">

                {/* Header */}
                <View className="flex-[1] w-[100%] items-center justify-center">
                    <Text style={{textShadowColor: "#a3a3a3",textShadowOffset: { height: 3 }, textShadowRadius: 2}}
                          className="text-[33px] font-bold italic text-center text-cyan-50">Stories
                    </Text>   
                </View>

                {/* Component */}
                <StoryItem onItemPress={handleItemPress} />

            </View>


        </SafeAreaView>
      )}

    </ImageBackground>
  )
}

export default StoryHome
