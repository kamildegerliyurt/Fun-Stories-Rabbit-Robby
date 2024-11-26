import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StoryHome = () => {
  return (
    <View>
      <Text>StoryHome</Text>
    </View>
  )
}

export default StoryHome

const styles = StyleSheet.create({})



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
