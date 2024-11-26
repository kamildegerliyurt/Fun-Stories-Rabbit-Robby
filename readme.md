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


