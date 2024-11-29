import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Image } from 'react-native';

import {rabbitAnimated} from "../constants/images"

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, 
      useNativeDriver: false,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000, 
      useNativeDriver: false,
    });

    const sequenceAnimation = Animated.sequence([fadeIn, fadeOut]);

    const loop = () => {
      Animated.loop(sequenceAnimation).start(() => {
        
      });
    };

    if (loading) {
      loop();
    }

    return () => {
      fadeAnim.removeAllListeners();
    };
  }, [fadeAnim, loading]);

  return (
    <View 
    // style={{borderWidth:2, borderColor:"lime", flex:1, alignItems:"center", justifyContent:"center"}}
    className="flex-1 items-center justify-center border-2 border-lime-400"
    >

      {/* <Animated.View style={[styles.loadingAnimatedContainer, { opacity: fadeAnim }]}>
        <Image style={{width:300, height:300, resizeMode:"cover"}} source={rabbitAnimated}/>    
      </Animated.View> */}

     <Animated.View className="flex-1 w-full items-center justify-center border-2 border-yellow-300 pl-10" 
                    style={[{ opacity: fadeAnim }]}>
        
        <Image className="w-[300px] h-[300px] object-cover" source={rabbitAnimated} />

     </Animated.View>


    </View>
  );
};


export default LoadingPage;