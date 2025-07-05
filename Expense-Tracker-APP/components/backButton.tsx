import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const BackButton = ({color = '#00BFA6'}) => {
    const router = useRouter();
  return (
    <TouchableOpacity  onPress={() => router.back()}>
        <Ionicons name="chevron-back-circle" size={32} color={color} />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({

})