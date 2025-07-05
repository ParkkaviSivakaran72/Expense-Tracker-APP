import { TypographyProps } from '@/types/type';
import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';



const Typography = ({ children, variant = 'body', style }: TypographyProps) => {
  return <Text style={[styles[variant], style]}>{children}</Text>;
};

export default Typography;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#aaa',
    marginBottom: 12,
  },
  body: {
    fontSize: 14,
    color: '#ccc',
  },
});
