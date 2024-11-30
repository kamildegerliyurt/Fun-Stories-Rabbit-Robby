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
        <SafeAreaView className="flex-1 items-center justify-center border-2 border-lime-500 ">

            
            <View className="flex-[1] w-[100%] items-center justify-center border-2 border-blue-500">

                {/* Header */}
                <View style={{flex:1, borderWidth:2, backgroundColor:"red", width:"100%", alignItems:"center", justifyContent:"center"}}>
                    <Text style={{textShadowColor: "#a3a3a3",textShadowOffset: { height: 3 }, textShadowRadius: 2}}
                          className="text-center font-bold text-[33px] text-cyan-50 italic">Stories
                    </Text>   
                </View>

                {/* Component */}
                <StoryItem onItemPress={handleItemPress} />

            </View>


            {/* Flatlist */}  

            {/* <View className="flex-[9] border-2 border-black w-[100%] items-center justify-center"> */}
                
            {/* </View>   */}


            {/* Yukarıdaki "StoryItem" verisini  bulunduran "View" kaldırdım o itiyor olabilir aşşa diye duruma göre*/} 




        </SafeAreaView>
      )}

    </ImageBackground>
  )
}

export default StoryHome
