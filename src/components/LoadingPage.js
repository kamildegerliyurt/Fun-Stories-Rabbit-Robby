
import React, {useEffect} from 'react';
import { View, Image } from 'react-native';
import { flyCat } from "../constants/images"; 

import Animated,{
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  Easing,
} from 'react-native-reanimated';

const LoadingPage = () => {

const translationX = useSharedValue(-100)

const animatedStyles = useAnimatedStyle(()=> ({
  transform: [{translateX: translationX.value}]
}))

useEffect(() => {
 translationX.value = withRepeat(
   withTiming(200, {duration:1000, easing: Easing.linear})
 )
}, [])


  return (
    <View className="flex-1 items-center justify-center">

      <Animated.View style={[ animatedStyles,{ position: 'absolute'}]}>
        <Image className="w-[250px] h-[250px] object-cover" source={flyCat}/>
      </Animated.View>

    </View>
  );
};

export default LoadingPage;



