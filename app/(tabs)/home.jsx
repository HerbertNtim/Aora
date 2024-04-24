import { Alert, FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { useState } from 'react'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {
  const { user } = useGlobalContext()
  // fetching all posts using the useAppwrite hook
  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: latestPosts} = useAppwrite(getLatestPosts)

  const [refreshing, setRefreshing] = useState(false)


  // Fetching new videos
  const onRefresh = async () => {
    setRefreshing(true)
    // recall videos -> if any new videos are added
    await refetch()
    
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}      
        renderItem={({item}) => (
          <VideoCard 
            video={item}
          />
        )}
        
        // Header title
        ListHeaderComponent={() => (
          <View className="flex space-y-6 mt-6 px-6">
            <View className="flex flex-row justify-between items-start mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username ?? "User"}
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
            <View className="w-full flex-1 pt-4 pb-4 mb-12"> 
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos Here
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}

        // EMPTY LISTS
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default Home
