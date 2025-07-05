import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import {ScreenWrapperProps} from '@/types/type'

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  return (
    <View style={[styles.wrapper, style]}>
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    color:'#ffffff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 70,
    paddingHorizontal: 20,
    backgroundColor: '#101010',
  },
});
