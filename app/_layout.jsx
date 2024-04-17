import { Stack } from "expo-router"

const RootLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" component={index} />   
      </Stack>
    </>
  )
}

export default RootLayout

