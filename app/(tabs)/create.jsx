import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { ResizeMode, Video } from 'expo-av'
import * as DocumentPicker from 'expo-document-picker';

import { icons } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { createVideoPost } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router';

const Create = () => {
  const { user } = useGlobalContext()

  const [form, setForm] = useState({
    title: '',
    prompt: '',
    video: null,
    thumbnail: null
  })

  const [uploading, setUploading] = useState(false)

  // Uploading logic
  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  }

  // Submitting 
  const submit = async () => {
    if(!form.title || !form.prompt || !form.thumbnail || !form.video){
      Alert.alert('Please fill all the fields')
    }

    setUploading(true)
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      
      router.push("/home");

    } catch (error) {
      Alert.alert('Error', error.message)      
    } finally {
      setForm({
        title: '',
        prompt: '',
        video: null,
        thumbnail: null
      })

      setUploading(false)
    }
  } 

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className="mt-6 px-6">
        <Text className="text-white font-psemibold text-2xl">
          Upload Video
        </Text>

        <FormField 
          title='Video Title'
          value={form.title}
          placeholder='Give a catch video title...'
          handleChangeText={(text) => setForm({ ...form, title: text })}
          otherStyles='mt-6'
        />

        {/* Upload a video */}
        <View className="mt-5 space-y-2">
          <Text className="text-gray-100 font-pmedium text-base">
            Upload Video File
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
          {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>

                <Text className="text-base font-pthin text-gray-100 mt-2">Choose a video file from device</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Upload a thumbnail */}
        <View className="mt-5 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Prompt field */}
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        {/* Button */}
        <CustomButton 
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7 mb-8"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
