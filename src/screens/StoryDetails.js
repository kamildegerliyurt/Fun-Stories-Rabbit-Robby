import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ImageBackground, StatusBar } from 'react-native'

import {Header, StoryComponent} from "../components/index"


const StoryDetails = ({route}) => {
//----------------------------------------
const image = route.params?.data?.image;
//----------------------------------------
  // const image = route.params.data.image


  return (
  <ImageBackground className="flex-1 w-[100%]" resizeMode='cover' source={image}>

      <StatusBar style="auto" />

      <SafeAreaView className="border-2 border-lime-500 flex-1 items-center justify-center">
         
          {/* Header */}
          <Header />

          
          {/* Story */}
          <StoryComponent route={route} />


      </SafeAreaView>

  </ImageBackground>

  )
}

export default StoryDetails