import React, { useState, useEffect } from 'react'
import { ImageBackground, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {welcomeKids} from "../constants/images"
import {LoadingPage} from "../components/index"

  import { BannerAd, AppOpenAd, BannerAdSize, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const Welcome = ({navigation}) => {
const [isLoading, setIsLoading] = useState(false); 

const handleStartPress = () => {
   setIsLoading(true);
   setTimeout(() => {
      setIsLoading(false); 
      navigation.navigate("StoryHome"); 
    }, 2000); 
  };

//-------------------------------------Reklam "Büyük"
const [isAppOpenAdLoaded, setIsAppOpenAdLoaded] = useState(false);

// const appOpenAd = AppOpenAd.createForAdRequest(TestIds.APP_OPEN, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['fashion', 'clothing'],
// });

const appOpenAd = AppOpenAd.createForAdRequest('ca-app-pub-2456383216001206/4342232009', {  //buradaki "...2009"lu yapı "Reklam Birim: Geçiş" Geçiş reklamı nasıl kullanılmalı?
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
    <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={welcomeKids}>

        <StatusBar style="auto"/>
        
        <SafeAreaView className="flex-1 items-center justify-center">
            {isLoading ? ( <LoadingPage />) 
                       : (
              <>

                <View className="flex-[4] w-[100%] items-center justify-center">
                  {/* <Text>Flex1</Text> */}
                </View>

               
                <View className="flex-[1] w-[100%] items-center justify-center">
                  <TouchableOpacity className="bg-[#F05D77] border-[#FB9EAE] border-t-[1px] border-l-[2px] border-b-[6px] border-r-[2px] w-[75%] items-center justify-center rounded-full p-2"
                                    onPress={handleStartPress}>
                    
                    <Text style={{textShadowColor: "#a3a3a3",textShadowOffset: { height: 3 }, textShadowRadius: 2}}
                          className="font-bold text-[33px] text-cyan-50 italic">Go To Story
                    </Text>

                  </TouchableOpacity>
                </View>
                
              </>
          )}

        </SafeAreaView>
    </ImageBackground>
  )
}

export default Welcome

//---------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { ImageBackground, Text, TouchableOpacity, View, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { welcomeKids } from "../constants/images";
// import { LoadingPage } from "../components/index";
// import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

// const Welcome = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isInterstitialLoaded, setIsInterstitialLoaded] = useState(false);


//   const interstitialAd = InterstitialAd.createForAdRequest('ca-app-pub-2456383216001206/4342232009', {
//     requestNonPersonalizedAdsOnly: true,
//     keywords: ['kids', 'education'],
//   });

//   const handleStartPress = () => {
//     if (isInterstitialLoaded) {
//       interstitialAd.show();
//     } else {
//       console.log('Reklam yüklenmedi, hikaye ekranına yönlendiriliyor.');
//       navigation.navigate("StoryHome");
//     }
//   };

//   useEffect(() => {
//     let isMounted = true;

//     // Reklamı yükle
//     const loadInterstitialAd = () => {
//       console.log('Geçiş reklamı yükleniyor...');
//       interstitialAd.load();
//     };

//     loadInterstitialAd();

//     // Reklam olaylarını dinle
//     const adLoadedListener = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
//       if (isMounted) {
//         console.log('Geçiş reklamı yüklendi!');
//         setIsInterstitialLoaded(true);
//       }
//     });

//     const adErrorListener = interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
//       console.log('Reklam yükleme hatası:', error);
//     });

//     const adClosedListener = interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
//       console.log('Reklam kapatıldı.');
//       navigation.navigate("StoryHome"); // Reklam kapandıktan sonra geçiş yap
//       setIsInterstitialLoaded(false); // Reklamı tekrar yüklemek için sıfırla
//       loadInterstitialAd(); // Yeni reklamı yükle
//     });

//     return () => {
//       isMounted = false;
//       adLoadedListener();
//       adErrorListener();
//       adClosedListener();
//     };
//   }, []);

//   return (
//     <ImageBackground className="flex-1 w-[100%]" resizeMode="cover" source={welcomeKids}>
//       <StatusBar style="auto" />

//       <SafeAreaView className="flex-1 items-center justify-center">
//         {isLoading ? (
//           <LoadingPage />
//         ) : (
//           <>
//             <View className="flex-[4] w-[100%] items-center justify-center" />
//             <View className="flex-[1] w-[100%] items-center justify-center">
//               <TouchableOpacity
//                 className="bg-[#F05D77] border-[#FB9EAE] border-t-[1px] border-l-[2px] border-b-[6px] border-r-[2px] w-[75%] items-center justify-center rounded-full p-2"
//                 onPress={handleStartPress}
//               >
//                 <Text
//                   style={{ textShadowColor: "#a3a3a3", textShadowOffset: { height: 3 }, textShadowRadius: 2 }}
//                   className="font-bold text-[33px] text-cyan-50 italic"
//                 >
//                   Go To Story
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
//       </SafeAreaView>
//     </ImageBackground>
//   );
// };

// export default Welcome;









