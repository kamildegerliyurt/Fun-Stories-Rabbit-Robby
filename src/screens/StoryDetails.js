import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ImageBackground, StatusBar } from 'react-native'
import {Header, StoryComponent} from "../components/index"

import { BannerAd, AppOpenAd, BannerAdSize, TestIds, AdEventType } from 'react-native-google-mobile-ads';


const StoryDetails = ({route}) => {

const image = route.params?.data?.image;

//-------------------------------------Reklam "Büyük"
const [isAppOpenAdLoaded, setIsAppOpenAdLoaded] = useState(false);

const appOpenAd = AppOpenAd.createForAdRequest(TestIds.APP_OPEN, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

useEffect(() => {
  let isMounted = true;

  const loadAppOpenAd = () => {
    console.log('Reklam yüklenmeye çalışılıyor...');
    appOpenAd.load();

    appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      if (isMounted) {
        console.log('Reklam başarıyla yüklendi!');
        setIsAppOpenAdLoaded(true);
      }
    });

    appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
      if (isMounted) {
        console.log('Reklam yükleme hatası: ', error);
      }
    });
  };

  loadAppOpenAd();

  const showAdTimeout = setTimeout(() => {
    if (isAppOpenAdLoaded) {
      console.log('Reklam gösteriliyor...');
      try {
        appOpenAd.show();
      } catch (error) {
        console.log('Reklam gösterim hatası: ', error);
      }
    } else {
      console.log('Reklam henüz yüklenmedi.');
    }
  }, 2000);

  return () => {
    isMounted = false;
    clearTimeout(showAdTimeout);
  };
}, [isAppOpenAdLoaded]);
//-------------------------------------

  return (
  <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={image}>

      <StatusBar style="auto" />

      <SafeAreaView className="flex-1 items-center justify-center">
         
          <Header />
         
          <StoryComponent route={route} />

      </SafeAreaView>

  </ImageBackground>

  )
}

export default StoryDetails