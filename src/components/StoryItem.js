// import { Text, View, FlatList, Image, RefreshControl, Pressable } from 'react-native';
// import React, { useState, useEffect, useCallback } from 'react';
// import Animated, { BounceInDown, PinwheelOut } from 'react-native-reanimated';
// import { COLORS } from "../constants/color";
// import styles from "../constants/styles";
// import data from "../constants/data"; // Veriyi içeri aktarıyoruz



// const StoryItem = (props) => {
// //-----------------------------------
// const [productData, setProductData] = useState([]);
// const [refreshing, setRefreshing] = useState(false);
// //-----------------------------------
//   useEffect(() => {
//     setProductData(data.stories);
//     // console.log("Loaded Data:", data.stories);
//   }, []);
//   //-----------------------------------RefreshControl
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, []);

//   //-----------------------------------Colors
//   const colors = [COLORS.deepSkyBlue, COLORS.redTomato, COLORS.turquoise, COLORS.redOrange];

//   //-----------------------------------
//   const MyAnimatedButton = Animated.createAnimatedComponent(Pressable);
//   const HomePageBounceInDown = BounceInDown.springify().damping(2).mass(3).stiffness(10);
//   const HomePagePinwheelOut = PinwheelOut;

//   return (
//     <View style={styles.storyItemFlatListContainer}>
//       <FlatList
//         data={productData}
//         // contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         alwaysBounceVertical={false}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => {
//           const randomColor = colors[Math.floor(Math.random() * colors.length)];
//           return (
//             <MyAnimatedButton
//               style={[styles.storyItemDownFlatListContainer, { backgroundColor: randomColor }]}
//               onPress={() => props.onItemPress(item)}
//               entering={HomePageBounceInDown}
//               exiting={HomePagePinwheelOut}>
//               {/* Resim gösterimi */}
//               <Image style={styles.storyItemImageContainer} source={item.image} />

//               {/* Text gösterimi (Türkçe veya İngilizce) */}
//               <Text style={styles.storyItemTextContainer} 
//                     numberOfLines={2} ellipsizeMode='tail'>{item.engTitle}
//               </Text>
//             </MyAnimatedButton>
//           );
//         }}
//       />
//     </View>
//   );
// }

// export default StoryItem;