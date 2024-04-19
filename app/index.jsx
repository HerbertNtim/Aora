import { StatusBar } from 'expo-status-bar'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CustomButton from '../components/CustomButton'
import { Redirect, router } from 'expo-router'
import { useGlobalContext } from '../context/GlobalProvider'
import { images } from '../constants'

const index = () => {
  const { loading, isLogged } = useGlobalContext()

  if(!loading && isLogged) return <Redirect href="/home" />

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView 
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex justify-center items-center px-4 w-full min-h-[85vh]">

          {/* LOGO */}
          <Image 
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />

          {/* HOME IMAGE */}
          <Image 
            source={images.cards}
            className="w-[380px] h-[298px]"
            resizeMode='contain'
          />

          {/* TExT */}
          <View className='relative mt-5'>
            <Text className="text-3xl text-white font-pbold text-center">
              Unlock Endless Possibilities with{" "} <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image 
              source={images.path}
              className="w-[136px] h-[15px] absolute bottom-3 right-16"
              resizeMode='contain'
            />
          </View>

          {/* Paragraph text */}
          <Text className="text-sm text-gray-300 text-center font-pregular mt-7">
          Unleash Breakthrough Ideas: Embark on a Journey of Limitless Exploration With Aora
          </Text>

          <CustomButton 
            title="Continue with Email"
            containerStyles='w-full mt-7'
            handlePress={() => router.push('/sign-in')}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default index
