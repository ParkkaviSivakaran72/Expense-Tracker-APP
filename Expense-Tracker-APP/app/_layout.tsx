import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/contexts/authContext'

const StackLayout = () => {
  return (
    <Stack screenOptions = {{headerShown:false}}></Stack>
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