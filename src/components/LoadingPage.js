// import React, { useState, useEffect, useRef } from 'react';
// import { View, Animated, Image } from 'react-native';

// import {dancingPenguin} from "../constants/images"
// import styles from '../constants/styles';




// const LoadingPage = () => {
//   const [loading, setLoading] = useState(true);
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const fadeIn = Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000, 
//       useNativeDriver: false,
//     });

//     const fadeOut = Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 2000, 
//       useNativeDriver: false,
//     });

//     const sequenceAnimation = Animated.sequence([fadeIn, fadeOut]);

//     const loop = () => {
//       Animated.loop(sequenceAnimation).start(() => {
        
//       });
//     };

//     if (loading) {
//       loop();
//     }

//     return () => {
//       fadeAnim.removeAllListeners();
//     };
//   }, [fadeAnim, loading]);

//   return (
//     <View style={styles.loadingContainer}>

//       <Animated.View style={[styles.loadingAnimatedContainer, { opacity: fadeAnim }]}>
//         <Image style={styles.loadingImage} source={dancingPenguin}/>    
//       </Animated.View>

//     </View>
//   );
// };


// export default LoadingPage;