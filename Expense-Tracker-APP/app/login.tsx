import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { TextInput, useTheme } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import BackButton from '@/components/backButton'
import Typography from '@/components/Typography'
import { useRouter } from 'expo-router'
import PrimaryButton from '@/components/PrimaryButton'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useAuth } from '@/contexts/authContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  const theme = useTheme();
  const {login} = useAuth();

  

  const handleSubmit = async () => {
    if(!email || !password){
      Alert.alert("Please fill the all fields")
    }
    const result = await login(email,password);

    if(result.success){
      router.replace('/(tabs)')
      
    }
    else{
      Alert.alert('Login falied! ',result.msg)
    }
  }

  return (
    <ScreenWrapper>
      <BackButton />

      <View style={styles.headerWrapper}>
        <Typography variant='title'>Hey, Welcome Back!</Typography>
        <Typography variant='subtitle'>Log in to continue tracking your expenses</Typography>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={setEmail}
          value={email}
          keyboardType='email-address'
          autoCapitalize='none'
          style={styles.input}
          placeholder='Enter your email address'
          textColor='#ffffff'
          theme={{
            colors: {
              primary: '#00BFA6',     // focused border and label color
              text: '#ffffff',        // input text color
              placeholder: '#cccccc', // label color when not focused
              background: '#1c1c1c',  // background color if needed
            }
          }}
        />

        <TextInput
          label="Password"
          mode="outlined"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={styles.input}
          placeholder='******************'
          textColor='#ffffff'
          theme={{
            colors: {
              primary: '#00BFA6',     
              text: '#ffffff',        
              placeholder: '#cccccc', 
              background: '#1c1c1c',  
            }
          }}
        />
      </View>

      <Pressable onPress={() => router.push('/changePassword')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </Pressable>

      <PrimaryButton label="Sign In" onPress={handleSubmit} />

      <View style={styles.signupWrapper}>
        <Typography variant="body">Don't have an account?</Typography>
        <Pressable onPress={() => router.push('/register')}>
          <Text style={styles.signupText}> Sign Up</Text>
        </Pressable>
      </View>
    </ScreenWrapper>

  )
}
export default Login

const styles = StyleSheet.create({
  headerWrapper: {
    marginBottom: 24,
    paddingTop:50
  },
  inputWrapper: {
    gap: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1c1c1c', // for dark theme match
    color:'#ffffff'

  },
  forgotText: {
    color: '#00BFA6',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 32,
    fontWeight: '500',
  },
  signupWrapper: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#00BFA6',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 14,
  },
});
