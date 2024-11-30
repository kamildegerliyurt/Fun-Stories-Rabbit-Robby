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
      alignItems:"center", 
      justifyContent:"center",
      borderColor:"dodgerblue",}}>
      {/* <Text className="text-white font-bold">StoryItem</Text> */}
      <FlatList 
        data={productData}
        contentContainerStyle={{ borderWidth:2,  alignItems: "center", justifyContent: "center" }} //Bunu kaldırınca "Resimler KAYIYOR"
        numColumns={(2)}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item})=> {
            return(
                <MyAnimatedButton style={{
                                          borderWidth:3,
                                          borderColor:"red",
                                          backgroundColor:"#F36555",
                                        //   width:"45%", 
                                          width:"45%", 
                                          margin:10, 
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
                             source={item.image} />
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
                                   borderWidth:2,
                                   borderColor:"yellow",
                                   fontSize:14,
                                   fontWeight:"bold",
                                   fontStyle:"italic",
                                   textAlign:"center",
                                   padding:2,
                                //    textShadowColor: "#d4d4d8",
                                //    textShadowOffset: { height: 2, }, 
                                //    textShadowRadius: 2,
                                }}
                              numberOfLines={2}
                              ellipsizeMode='tail'
                              >{item.engTitle}
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





