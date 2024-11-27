// import React from 'react'
// import { useState } from 'react'
import { ImageBackground, Text, View, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import React, { useState } from 'react';
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



        </SafeAreaView>

      )}


    </ImageBackground>
  )
}

export default StoryHome





// import { Text, View, ImageBackground, StatusBar } from 'react-native';
// import React, { useState } from 'react';
// import { homeBackground } from "../constants/images";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { StoryItem, LoadingPage } from "../components/index";
// import { useNavigation } from '@react-navigation/native';
// import styles from '../constants/styles';

// const StoryHome = () => {
// //----------------------------------------
// const [loading, setLoading] = useState(false);
// //----------------------------------------
// const navigation = useNavigation();
// //----------------------------------------
// const handleItemPress = (item) => {
//   setLoading(true);
//   setTimeout(() => {
//     setLoading(false);
//     navigation.navigate("StoryDetails", { data: item });
//   }, 2000); // Loading Time
// };
// //----------------------------------------

//   return (
//     <ImageBackground style={styles.homeImageBackGroundContainer} 
//                      source={homeBackground} 
//                      resizeMode="cover">

//       <StatusBar style="auto" />

//       {loading ? (<LoadingPage />) 
//                : (
//         <SafeAreaView style={styles.homeSafeContainer}>

//           <View style={styles.homeMainContainer}>
//             <View style={styles.homeMainTopContainer}>
//               <Text style={styles.homeMainTopText}>Stories</Text>
//             </View>
//             <StoryItem onItemPress={handleItemPress} />
//           </View>
          
//         </SafeAreaView>
//       )}
//     </ImageBackground>
//   );
// };

// export default StoryHome;