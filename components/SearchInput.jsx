import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router';
import { useState } from 'react';

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");


  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={query}
          placeholder="Search for a video topic"
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if(query === '')
            return Alert.alert(
              "Missing Query",
              "Please input something to search results"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`)
          
        }}
      >
        <Image 
          source={icons.search} className="w-5 h-5" resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
