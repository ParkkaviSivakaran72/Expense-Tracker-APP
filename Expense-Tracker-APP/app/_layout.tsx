import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/contexts/authContext'
import { UserDataType } from '@/types/type'

const StackLayout = () => {
  

  return (
    <Stack screenOptions = {{headerShown:false}}>
      <Stack.Screen name="/(modals)/profileModal"
      options={{presentation:"modal"}}></Stack.Screen>
    </Stack>
  )
}
const RootLayout = () => {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})