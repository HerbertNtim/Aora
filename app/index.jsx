import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-3xl">
          Hello 
        </Text>
        <StatusBar style="auto"/>
        <Link href="/home">Home</Link>
      </View>
  )
}

export default index
