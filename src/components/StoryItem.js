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
    <View style={{
      // flex:1,
      flex:9,   //Burası "1" di aşşaya doğru itiyordu acaba hata ondanmı diye "9" yaptım
      width:"100%",
      borderWidth:2,
      borderColor:"lime",
      backgroundColor:"blue",
      alignItems:"center", 
      justifyContent:"center",
      }}>
      {/* <Text className="text-white font-bold">StoryItem</Text> */}
      <FlatList 
        data={productData}

        // style={{
        //   borderWidth:2, 
        //   width:"100%", 
        //   borderColor:"white",
        // }} // Kayma OLURSAA "contentContainerStyle" olarak değiştir


        contentContainerStyle={{ 
          width:"100%",
          alignItems:"center", 
          justifyContent:"center", 
          borderWidth:2, 
          borderColor:"white", 
        }} //Bunu kaldırınca "Resimler KAYIYOR"

        numColumns={(2)}
        // pagingEnabled
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item})=> {
           //---------------------------------------
            const image = item?.image;
            const title = item?.engTitle;       
           //---------------------------------------


            return(
                <MyAnimatedButton style={{
                                          borderWidth:3,
                                          borderColor:"red",
                                          backgroundColor:"#F36555",
                                        //   width:"45%", 
                                          width:"45%",
                                          // margin:10,  
                                          margin:8, 
                                          alignItems:"center",
                                          justifyContent:"center", 
                                        //   borderRadius:20, 
                                        }}
                                  entering={HomePageBounceInDown}
                                  exiting={HomePagePinwheelOut}
                                  onPress={() => props.onItemPress(item)}
                                  >

                    {/* Resim gösterimi */}
                    <View style={{
                                  flex:2, 
                                  borderWidth:2,         //Burasını kaldırınca "Resim Tam Oturacak"
                                  borderColor:"blue", 
                                  width:"100%",
                                  height:"100%", //Burasını "Aşşa kayıyor diye ekledim duruma göre kaldır başlangıçta YOKTU"
                                  alignItems:"center", 
                                  justifyContent:"center",
                                //   borderRadius:20, 
                                  }}>
                      <Image style={{
                                     width:"100%",
                                     height:190, 
                                     resizeMode:"cover", 
                                    //  borderRadius:20,
                                     }} 
                             source={image} />
                    {/* <Image style={{width:"100%", height:190, resizeMode:"cover",  borderRadius:20,}} source={item.image} /> */}
                    </View>

                    {/* Text */}
                    <View style={{
                                  flex:1, //Bunları kaldırdım "Yapıları aşşa itiyor" diye tekrar eklenebilir
                                  borderWidth:2, 
                                  borderColor:"lime", 
                                  width:"100%",
                                  height:"100%", //Burasını "Aşşa kayıyor diye ekledim duruma göre kaldır başlangıçta YOKTU" 
                                  alignItems:"center", 
                                  justifyContent:"center"
                                  }}>
                        <Text style={{
                                  //  flex:1, //Bunları kaldırdım "Yapıları aşşa itiyor" diye tekrar eklenebilir
                                   width:"100%",
                                  //  height:"100%",
                                   borderWidth:2,
                                   borderColor:"yellow",
                                   fontSize:14,
                                   fontWeight:"bold",
                                   fontStyle:"italic",
                                   textAlign:"center",
                                   paddingHorizontal:5,
                                   padding:2,
                                //    textShadowColor: "#d4d4d8",
                                //    textShadowOffset: { height: 2, }, 
                                //    textShadowRadius: 2,
                                }}
                              numberOfLines={2}   //Sorun burada!!!! [Burada "engTitle"lar bazılarında "TEK SATIR'a sığdığı için" bozuyor "RESİM AŞŞAYA KAYIYOR" ÇÖZÜM: "engTitle" verilerinin sonuna "..." ekledim ve "2" satıra uzamasını sağladım :D]
                              ellipsizeMode='tail'
                              >{title}
                        </Text>

                    </View>

                   


                </MyAnimatedButton>
            )
        }}


        />
    </View>
  )
}

export default StoryItem





