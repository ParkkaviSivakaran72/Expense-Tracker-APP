import { HeaderProps } from '@/types/type';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const Header: React.FC<HeaderProps> = ({ title, subtitle, center = false }) => {
  return (
    <View style={[styles.container, center && styles.centerAlign]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#1c1c1c',
  },
  centerAlign: {
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#cccccc',
    fontSize: 14,
    marginTop: 4,
  },
});
