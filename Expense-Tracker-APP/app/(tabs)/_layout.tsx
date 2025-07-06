import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'
import MyTabBar from '@/components/customTabNavigator'

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <MyTabBar {...props} />} screenOptions={{headerShown:false}}>
        <Tabs.Screen name="index"  />
        <Tabs.Screen name="wallet" />
        <Tabs.Screen name="statstics"  />
        <Tabs.Screen name="profile"  />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})