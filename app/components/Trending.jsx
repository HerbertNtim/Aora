import { FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Trending = ({ posts }) => {
  return (
    <SafeAreaView className="">
      <FlatList 
        data={posts}
        keyExtractor={() => {}} 
        renderItem={() => (
          <Text className="text-3xl text-white">Trend</Text>
        )}
        horizontal     
      /> 
    </SafeAreaView>
  )
}

export default Trending
