import { FlatList, Text, View, RefreshControl, Pressable, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';

import data from '../constants/data'
import Animated, { BounceInDown, PinwheelOut } from 'react-native-reanimated';


const StoryItem = (props) => {
//-----------------------------------
const [productData, setProductData] = useState([]);
const [refreshing, setRefreshing] = useState(false);
//-----------------------------------
useEffect(() => {
  setProductData(data.stories);
    // console.log("Loaded Data:", data.stories);
}, []);
//-----------------------------------RefreshControl
const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
}, []);
//-----------------------------------
const MyAnimatedButton = Animated.createAnimatedComponent(Pressable);
const HomePageBounceInDown = BounceInDown.springify().damping(2).mass(3).stiffness(10);
const HomePagePinwheelOut = PinwheelOut;
//-----------------------------------

  return (
    <View className="flex-[9] w-[100%] border-2 border-lime-500 bg-red-300 items-center justify-center">

      <FlatList 
        data={productData}
        // style={{borderWidth:2, width:"100%", borderColor:"white",}} // Kayma OLURSAA "contentContainerStyle" olarak değiştir
        contentContainerStyle={{ 
          // borderWidth:2, 
          // borderColor:"red",
          // width:"100%", 
          alignItems:"center", 
          justifyContent:"center",
          }} //Bunu kaldırınca "Resimler KAYIYOR"  
        numColumns={2}
        // numColumns={productData.length % 2 === 0 ? 2 : 1}
        // pagingEnabled
        // keyExtractor={(item) => item.id.toString()}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item})=> {

           //---------------------------------------
            const image = item?.image;
            const title = item?.engTitle;       
           //---------------------------------------

            return(
                <MyAnimatedButton className="w-[45%] border-2 border-sky-400 bg-[#F36555] m-2.5"
                                  entering={HomePageBounceInDown}
                                  exiting={HomePagePinwheelOut}
                                  onPress={() => props.onItemPress(item)}>

                    {/* Resim gösterimi */}
                    {/* <View className="flex-[2] w-[100%] h-[100%] items-center justify-center border-2 border-blue-700">
                      <Image  className="w-[100%] h-[190px] object-cover" source={image} /> 
                    </View> */}

                    {/* Text */}
                    {/* <View className="flex-[1] w-[100%] h-[100%] items-center justify-center border-2 border-lime-500">
                        <Text className="border-2 bg-violet-700 border-black text-[14px] font-bold italic text-center px-1 py-0.5"
                              numberOfLines={2}  //Sorun burada!!!! [Burada "engTitle"lar bazılarında "TEK SATIR'a sığdığı için" bozuyor "RESİM AŞŞAYA KAYIYOR" ÇÖZÜM: "engTitle" verilerinin sonuna "..." ekledim ve "2" satıra uzamasını sağladım :D]
                              ellipsizeMode='tail'
                              // style={{textShadowColor: "#d4d4d8",textShadowOffset: { height: 2 }, textShadowRadius: 2}}
                              >{title}
                        </Text>

                    </View> */}

                    
                    <View style={{borderWidth:2, width:"100%", borderColor:"red",}}>
                     <Image  className="w-[100%] h-[190px] object-cover" source={image} />
                    </View>

                    <View style={{flex:1, borderWidth:2, width:"100%",borderColor:"blue",  alignItems:"center", justifyContent:"center"}}>
                      <Text style={{fontSize:13, fontWeight:"bold", textAlign:"center", padding:2,}} numberOfLines={2} ellipsizeMode='tail'>{title}</Text>
                    </View>

                   


                </MyAnimatedButton>
            )
        }}


        />
    </View>
  )
}

export default StoryItem





