import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Text, View, RefreshControl, Pressable, Image } from 'react-native'
import data from '../constants/data'
import Animated, { BounceInDown, PinwheelOut } from 'react-native-reanimated';


import mobileAds,{
   BannerAd, 
   BannerAdSize, 
   TestIds, 
   useInterstitialAd 
  } from 'react-native-google-mobile-ads';
  
// const adUnitIdBanner = __DEV__ ? TestIds.ADAPTIVE_BANNER : "ca-app-pub-2456383216001206~3229466473";  // Uygulama Kimliği 
const adUnitIdBanner = __DEV__ ? TestIds.ADAPTIVE_BANNER : "ca-app-pub-2456383216001206/7149925417";  //Reklam Birimi: Banner

// const adUnitIdBanner = "ca-app-pub-2456383216001206/7149925417";  // "Test" aşamasından sonra böylemi kullanmam gerekiyor??


const StoryItem = (props) => {
const [productData, setProductData] = useState([]);
const [refreshing, setRefreshing] = useState(false);

useEffect(() => {
  setProductData(data.stories);
}, []);

const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
}, []);

const MyAnimatedButton = Animated.createAnimatedComponent(Pressable);
const HomePageBounceInDown = BounceInDown.springify().damping(2).mass(3).stiffness(10);
const HomePagePinwheelOut = PinwheelOut;


  return (
    <View className="flex-[9] w-[100%] items-center justify-center">
      
      <BannerAd unitId={adUnitIdBanner} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}/>

      <FlatList 
        data={productData}
        contentContainerStyle={{alignItems:"center", justifyContent:"center"}} 
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item})=> {
    
            const image = item?.image;
            const title = item?.engTitle;       
         
            return(
                <MyAnimatedButton className="w-[45%] border-t-[2px] border-l-[3px] border-b-[4px] border-r-[3px] border-amber-50 bg-amber-400 m-2.5 rounded-[17px]"
                                  entering={HomePageBounceInDown}
                                  exiting={HomePagePinwheelOut}
                                  onPress={() => props.onItemPress(item)}>

                    <View className="w-[100%] rounded-[15px]">
                     <Image  className="w-[100%] h-[190px] object-cover rounded-[15px]" source={image} />
                    </View>


                    <View className="flex-[1] w-[100%] items-center justify-center my-1">
                      <Text style={{textShadowColor: "#f0fdfa",textShadowOffset: { height: 1 }, textShadowRadius: 2}}
                            className="text-[11px] font-bold text-center p-[2px]" numberOfLines={2} ellipsizeMode='tail'>{title}</Text>
                    </View>

                </MyAnimatedButton>
            )
        }}


        />

        <BannerAd unitId={adUnitIdBanner} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}/>
        
    </View>
  )
}

export default StoryItem





