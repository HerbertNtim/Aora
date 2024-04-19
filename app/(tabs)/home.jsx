import { FlatList, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '../../constants'
import SearchInput from '../components/SearchInput'
import Trending from '../components/Trending'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={[]}
        renderItem={() => {}}
        keyExtractor={() => {}}      
        
        // Header title
        ListHeaderComponent={() => (
          <View className="flex space-y-6 mt-6 px-6">
            <View className="flex flex-row justify-between items-start mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  MrMan
                </Text>
              </View>

              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="h-9 w-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            {/* Search */}
            <SearchInput />

            {/* Trending Video */}
            <View className="w-full flex-1 pt-5 pb-8"> 
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={[]} />
            </View>
          </View>
        )}
      />

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default Home
