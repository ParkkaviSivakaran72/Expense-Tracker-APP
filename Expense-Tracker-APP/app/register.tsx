import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { TextInput, useTheme } from 'react-native-paper'
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import BackButton from '@/components/backButton'
import Typography from '@/components/Typography'
import { useRouter } from 'expo-router'
import PrimaryButton from '@/components/PrimaryButton'

const Register = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if(!userName || !email || !password || !confirmedPassword){
      Alert.alert("Please fill the all fields")
    }
    console.log(userName)
    console.log(email)
    console.log(password)
  }

  return (
    <ScreenWrapper>
      <BackButton />

      <View style={styles.headerWrapper}>
        <Typography variant='title'>Create an Account!</Typography>
        <Typography variant='subtitle'>Register to start tracking your expenses</Typography>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          label="userName"
          mode="outlined"
          onChangeText={setUserName}
          value={userName}
          autoCapitalize='none'
          style={styles.input}
          placeholder='Enter your User name'
          textColor='#ffffff'
          theme={{
            colors: {
              primary: '#00BFA6',          
              placeholder: '#cccccc',
              background: '#1c1c1c', 
            }
          }}
        />
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
              primary: '#00BFA6',       
              placeholder: '#cccccc', 
              background: '#1c1c1c', 
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

        <TextInput
          label="Confirmed Password"
          mode="outlined"
          onChangeText={setConfirmedPassword}
          value={confirmedPassword}
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

      

      <PrimaryButton label="Sign Up" onPress={handleSubmit} />

      <View style={styles.signupWrapper}>
        <Typography variant="body">Already have an account?</Typography>
        <Pressable onPress={() => router.push('/login')}>
          <Text style={styles.signupText}> Sign In</Text>
        </Pressable>
      </View>
    </ScreenWrapper>

  )
}
export default Register

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
