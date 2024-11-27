##Penquin Pingo


npm install @react-navigation/native @react-navigation/native-stack react-native-screens @react-native-async-storage/async-storage @expo/vector-icons react-native-safe-area-context

npm install expo-splash-screen
npm install @react-native-community/slider --save
npx expo install expo-av
npm install @rneui/themed

npm install lottie-react-native  
npx expo install expo-linear-gradient  
npx expo install expo-blur  

----------------------------------------------------------- "Reanimated" İşlemleri

npx expo install react-native-reanimated (Buna plugin falanda eklenecek buna bak aşşa linkten)
                                           https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/

1 - // babel.config.js içerisine aşşağıdakileri ekle

      plugins: ['react-native-reanimated/plugin'],  


[ NOT ]: Eğer "nativewind" kullanıcaksan şu şekilde;  


      plugins: [
        "nativewind/babel",
        "react-native-reanimated/plugin",
      ],


----------------------------------------------------------- "NativeWind" İşlemleri

1 - https://www.nativewind.dev/v2/quick-starts/expo sitesine git
2 - V2
3 - Expo
4 - npm install nativewind@2.0.11
   [ NOT ]: Nativewind kurulumunda hata alıyorsan version "nativewind": "^2.0.11" kurrrrr!!

5 - npm install --save-dev tailwindcss@3.3.2
6 - npx tailwindcss init

7- // tailwind.config.js içerisine aşşağıdakileri ekle

   content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],

   [ NOT ]: Burada "src" olarak tüm dosyaları kasettik sen duruma göre değiştirebilirsin

7- // babel.config.js içerisine aşşağıdakileri ekle

    plugins: ["nativewind/babel"],

-----------------------------------------------------------                                     


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View, Image, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {welcomeKids, lollipopAnimated, rabbitAnimated} from "../constants/images"


const Welcome = ({navigation}) => {
  return (
    <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={welcomeKids}>
      <SafeAreaView className="border-2 border-lime-500 flex-1 items-center justify-center">
        

        {/* Top Container */}
         <View className="flex-[4] border-2 border-red-700 w-[100%] items-center justify-center">
           {/* <Text>Flex1</Text> */}
           {/* <Image style={{ width: '50%', height: '50%', resizeMode:"contain"}} source={rabbitAnimated} /> */}
         </View>

        {/* Bottom Container */}
         <View className="flex-[1] border-2 border-amber-300  w-[100%] items-center justify-center">
          <TouchableOpacity className="bg-[#F05D77] border-[#FB9EAE] border-t-[1px] border-l-[2px] border-b-[6px] border-r-[2px] w-[75%] items-center justify-center rounded-full p-2"
                            onPress={()=> navigation.navigate("StoryHome")}
                            >
          
          <Text style={{textShadowColor: "#a3a3a3",textShadowOffset: { height: 3 }, textShadowRadius: 2}}
                className="font-bold text-[33px] text-cyan-50 italic">Go To Story
          </Text>



            {/* <Text className="font-bold text-[33px] text-cyan-50 italic">Go To Story</Text> */}




            {/* <Text className="font-bold text-[33px] text-cyan-50 italic"
                  style={{textShadowColor: "#a3a3a3",textShadowOffset: { width: 2, height: 2,},textShadowRadius: 3,}}>
                  Go To Story
            </Text> */}


          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ImageBackground>
  )
}

export default Welcome









