import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import { icons } from '../../constants'


const SearchInput = () => {
  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value=''
          placeholder="Search for a video topic"
          placeholderTextColor="#CDCDE0"
          onChangeText={() => {}}
      />

      <TouchableOpacity>
        <Image 
          source={icons.search} className="w-5 h-5" resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
