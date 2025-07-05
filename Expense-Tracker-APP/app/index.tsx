import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Animated,{ FadeIn } from 'react-native-reanimated';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typography from '@/components/Typography';
import PrimaryButton from '@/components/PrimaryButton';

const index = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
       <View style={styles.headerRight}>
  <TouchableOpacity onPress={() => router.push('/login')}>
    <Text style={styles.signupText}>Sign In</Text>
  </TouchableOpacity>
</View>

    <View style={styles.container}>
        
      <Animated.Image entering= {FadeIn.duration(1000)}
        style={styles.frontImage}
        resizeMode="contain"
        source={require("../assets/images/front.png")}
      />
      <Typography>
        <Animated.View entering={FadeIn.duration(1000)}>
      <Text style={styles.title}>Track Your Spending</Text>
      <Text style={styles.subtitle}>Manage your money smarter, every day.</Text>
      </Animated.View>
      </Typography>
    <PrimaryButton style={styles.getStartedButton} onPress={() => router.push('/register')} label="Get Started" />
      
       
      
     
      
    </View>
    </ScreenWrapper>
  );
};

export default index;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101010',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  frontImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 32,
  },
   headerRight: {
    position: 'absolute',
    top: 65, 
    right: 20,
    zIndex: 10,
  },
  signupText: {
    color: '#00BFA6',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 32,
  },
  getStartedButton: {
    backgroundColor: '#00BFA6',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#00BFA6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
