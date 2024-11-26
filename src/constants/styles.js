// import { COLORS } from "../constants/color";
// import { StyleSheet, Dimensions } from 'react-native';

// const { width, height } = Dimensions.get("screen");

// const styles = StyleSheet.create({
//   //----------------------------------Loading 
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingAnimatedContainer: {
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   loadingImage: {
//     width: 300,
//     height: 300,
//     resizeMode: 'cover',
//   },
//     //----------------------------------Welcome
//   imageBackgroundContainer: {
//     flex: 1,
//     width: width/1,  //Dimensions ile IMAGE width,height ayarlıyorum yukarıda import edildi BAK!!
//   },
//   welcomeContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   goToStoryButton: {
//     borderWidth: 2,
//     borderColor: COLORS.yellow,
//     width: "100%",
//     height: "100%",
//   },
//   //----------------------------------StoryHome
//   homeImageBackGroundContainer:{
//     flex: 1, 
//     width: width/1,
//   },
//   homeSafeContainer:{
//     flex:1, 
//     borderWidth:2, 
//     borderColor:"lime", 
//     alignItems:"center", 
//     justifyContent:"center",
//   },
//   homeMainContainer:{
//   flex:1,
//   borderWidth:2, 
//   borderColor:"yellow",
//   width:"100%",
//   alignItems:"center", 
//   justifyContent:"center",
//   },
//   homeMainTopContainer:{
//     flex:1, 
//     borderWidth: 2, 
//     borderColor: "red", 
//     width:"100%",
//     paddingLeft:5,
//     marginVertical:5,
//   },
//   homeMainTopText:{
//   fontSize:30, 
//   fontWeight:"bold", 
//   fontStyle:"italic", 
//   color:"#FFFFE0"
//   },
//   //----------------------------------StoryItem
//   storyItemFlatListContainer:{
//     flex:15, 
//     width:"100%",
//     borderWidth:2,
//     alignItems:"center", 
//     justifyContent:"center",
//     borderColor:"red",
//   },
//   storyItemDownFlatListContainer:{   
//     borderWidth:5,
//     borderColor:COLORS.greyPearl,
//     width:"45%", 
//     margin:10, 
//     alignItems:"center",
//     justifyContent:"center", 
//     borderRadius:20, //25 yapılabilir
//   },
//   storyItemImageContainer:{
//     // width:"100%", 
//     // height:190, 
//     // resizeMode:"cover",
//     width:"100%", 
//     height:190, 
//     resizeMode:"cover",  
//     borderRadius:20,
//   },
//   storyItemTextContainer:{
//     flex:1, // Text içerisinde container'ı tam kaplasın diye eger "TEL"de HATA verirse "BURAYI SİL!!!"
//     // fontSize: 16,
//     fontSize: 16, //Burası "16" dı duruma göre eski haline getirilebilir
//     fontWeight: "bold",
//     fontStyle: "italic",
//     textAlign: "center",
//     color: COLORS.gunMetal,
//     // borderWidth:2,
//     // borderColor:COLORS.white,
//     width:"100%",
//     marginTop:2,
//     paddingHorizontal:10,
//     paddingVertical:5,
//     borderRadius: 20,
//   },
//   //----------------------------------StoryDetails
//   detailsImageBackGroundContainer:{
//     flex: 1, 
//     width: width/1,
//   },
//   detailsSafeContainer:{
//     flex:1, 
//     borderWidth:2, 
//     borderColor:"lime", 
//     alignItems:"center", 
//     justifyContent:"center",
//   },
//   detailsMainContainer:{
//     flex:1,
//     borderWidth:2, 
//     borderColor:"yellow",
//     width:"100%",
//     alignItems:"center", 
//     justifyContent:"center",
    
//   },
//   titleMainContainer:{
//     flex: 1.3,
//     borderWidth: 2,
//     width: "100%",
//     // padding:5,
//     alignItems: "center",
//     flexDirection: "row", 
//     justifyContent: "space-around",
//     backgroundColor: "pink",
//   },
//   titleContainer:{
//     flex: 5,
//     borderWidth: 2,
//     borderColor: "black",                     
//     width: "100%",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   titleImage:{
//    width: "100%", 
//    height: "100%", 
//    resizeMode:"stretch",
//   },
//    titleInContainer:{
//    position:"absolute", 
//    width:"85%", 
//    alignItems:"center", 
//    justifyContent:"center", 
//    borderColor:"blue",
//   },
//   titleInText:{
//     fontSize:18,
//     fontWeight:"bold",
//     fontStyle:"italic",
//     color:"#FFFFFF",
//     textAlign:"center",        
//     textShadowColor: "gray", 
//     textShadowOffset: { width: 1, height: 1 }, 
//     textShadowRadius: 2, 
//   },
//   backButtonContainer:{
//     flex: 1,
//     borderWidth: 2,
//     backgroundColor: "red",
//     borderColor: "black",
//     padding: 5,
//     width: "100%",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   backButton:{
//     borderWidth: 2,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 5,
//   },
//   backButtonImage:{
//     width: 50, 
//     height: 50,
//   },
//   detailsPageImageContainer:{
//     flex: 3.5,
//     borderWidth: 2, 
//     backgroundColor: "pink",
//     width: "100%", 
//     alignItems: "center", 
//     justifyContent: "center",
//     marginVertical: 5,
//     padding:2,
//   },
//   woodenBoardImage:{
//     width:"100%", 
//     height:"100%", 
//     resizeMode:"stretch", 
//     borderRadius:20,
//   },
//   dataImage:{
//     width:"91%", 
//     height:"88%", 
//     alignItems:"center", 
//     justifyContent:"center",  
//     // resizeMode:"cover", 
//     resizeMode:"stretch",
//     borderRadius:10, 
//     position:"absolute",
//   },
//   //----------------------------------Sounds
//   soundMainContainer:{
//     flex: 1.8,
//     borderWidth: 2, 
//     backgroundColor: "pink",
//     width: "100%", 
//     alignItems: "center", 
//     justifyContent: "center",                      
//     marginBottom: 5,
//     // borderRadius:20,
//   },
//   soundMainImage:{
//     width:"100%", 
//     height:"100%",
//     resizeMode:"stretch",
//     borderRadius:20,
//   },
//   soundContainer:{
//     position:"absolute",                    
//     width:"85%",
//     height:"80%", //85 di 80'e çektim
//     // marginRight:5,
//     // paddingVertical:10,
//     borderWidth:2, 
//     borderColor:"blue", 
//     alignItems:"center", 
//     justifyContent:"center",
//   },
//   sliderMainContainer:{
//    flex:2,
//    borderWidth:2, 
//    borderColor:"lightblue",
//    width:"100%", 
//    alignItems:"center", 
//    justifyContent:"center",
//   },
//   sliderContainer:{
//    flex:1, 
//    width: '100%', 
//    borderWidth:2, 
//    borderColor:"black",
//   },
//   playPauseChangeLanguages:{
//     flex:5,
//     borderWidth:2, 
//     flexDirection:"row",
//     borderColor:"red",
//     width:"100%", 
//     alignItems:"center", 
//     justifyContent:"center",
//   },
//   playPauseContainer:{
//     flex: 5, 
//     borderWidth: 2,
//     width: "100%",
//     height: "100%",
//     borderColor: "yellow", 
//     justifyContent: "center",
//   },
//   playPauseButton:{
//     flex:1,
//     flexDirection:"row",
//     borderWidth:2,
//     alignItems:"center",
//     justifyContent:"space-between",
//   },
//   playPauseImage:{
//     marginLeft: 10, 
//     width: 35,
//     height: 35, 
//     paddingLeft: 5, 
//     marginBottom:5,
//   },
//   playPauseText:{
//     fontSize:18, 
//     fontWeight:"bold", 
//     color:"white", 
//     paddingRight:5,
//   },
//   changeLanguagesContainer:{
//     flex:3,
//     borderWidth:2,  
//     borderColor:"black", 
//     width:"100%", 
//     height:"100%",
//     alignItems:"center", 
//     justifyContent:"center",
//   },
//   speedDialIcon:{
//     width: 50, 
//     height: 45, 
//     resizeMode:"center", 
//     backgroundColor:"red",
//   },
//   speedDialOpenIcon:{
//    width: 50, 
//    height: 45, 
//    resizeMode: "center",
//    backgroundColor:"transparent",
//   },
//   speedDialContainer:{
//     paddingBottom:5, //SORUN BURADA "YAZILAN KESILMESI"
//     // paddingVertical:5, 
//     width:"100%",
//     // backgroundColor:"blue",
//     borderWidth:2,
//     borderColor:"lime",
//     // alignItems:"center",
//     // justifyContent:"center",
//     // paddingTop:20, //Burayı aşşa indirmek için yazdım çalışmazsa "SİLİNEBİLİR"
//     // borderRadius:20,
//     // marginLeft:160,

//     // borderWidth:2,
//     // borderColor:"red",
//     // alignItems:"center",
//     backgroundColor:"lightblue",
//     // width:"100%",
//   },
//   speedDialActionIcon:{
//     width: 45, 
//     height: 45, 
//     resizeMode: "center",
//     backgroundColor:"transparent",
//   },
//   speedDialActionTitle:{
//     fontWeight: "bold", 
//     textAlign: "center", 
//     width:"100%",
//     padding:20,
//   },
//   //----------------------------------StoryDetailsText
//   storyDetailsTextMainContainer:{
//     flex: 4,
//     borderWidth: 2,
//     width: "100%", 
//     alignItems: "center", 
//     justifyContent: "center",
//     backgroundColor: "pink",
//     marginBottom: 5,
//     padding:2,
//   },
//   storyDetailsTextContainer:{
//     borderWidth:2,
//     borderColor:"blue",
//     borderRadius:20,
//     width:"92%", //95 olabilir daha iyi duruyor
//     height:"88%",
//     alignItems:"center",
//     justifyContent:"center",
//     position:"absolute",
//   },
//   scrollContainer:{
//     width: "100%", 
//     borderWidth:2,
//     borderColor: "yellow", 
//     paddingHorizontal:5,
//     marginHorizontal:5, 
//     borderRadius: 20,
//   },
//   scrollText:{
//     fontSize:18,
//     padding:2,
//     fontWeight:"bold",
//     fontStyle:"italic",
//     color:"#FFFFFF",
//     textAlign:"center",        
//     textShadowColor: "gray", 
//     textShadowOffset: { width: 1, height: 1 }, 
//     textShadowRadius: 2,
//   }




// });

// export default styles;