import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { images } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext()

  const [isSubmitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Submitting form 
  const submit = async () => {
    if(!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill all fields")
    }

    setSubmitting(true)
    try {
      const result = await createUser(form.username, form.email, form.password)
      setUser(result)
      setIsLogged(true)
      
      if(result) {
        setTimeout(() => {
          Alert.alert("Success", "Account created successfully")
        }, 100)
        router.replace('/home')
      }
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally{
      setSubmitting(false)
    }

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[95vh] px-6 flex justify-center my-6">
          <Image 
            source={images.logo}
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl font-semibold font-pregular text-white mt-4">Register to Aora </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign-In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
