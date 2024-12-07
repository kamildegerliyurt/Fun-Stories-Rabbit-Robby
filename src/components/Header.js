import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import { useTheme } from "../constants/ThemeContext"
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import {backButton} from "../constants/images"


const Header = (props) => {
//--------------------------------       
const { isDarkMode, toggleTheme } = useTheme();
//--------------------------------
const navigation = useNavigation();
//--------------------------------    
const backHomePage = () => {
  navigation.navigate("StoryHome");
};
//--------------------------------


  return (        
    <View className="flex-[1] flex-row border-2 border-yellow-500 bg-cyan-500 w-[100%] items-center justify-between px-2">


        {/* Back Button */}       
        <View className="flex-[1] w-[100%] h-[100%] border-2 items-center justify-center">
            <TouchableOpacity className="border-2 items-center justify-center self-start" 
                                onPress={backHomePage}>
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
  )
}

export default Header

