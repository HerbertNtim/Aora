import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Submitting form 
  const submit = async () => {
    if(!form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields")
    }

    setSubmitting(true)
    try {
      const result = await signIn(form.email, form.password)
      Alert.alert("Success", "Logged in successfully")
      
      router.replace('/home')
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally{
      setSubmitting(false)
    }

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-6 flex justify-center my-6">
          <Image 
            source={images.logo}
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl font-semibold font-pregular text-white mt-4">Log in to Aora </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
