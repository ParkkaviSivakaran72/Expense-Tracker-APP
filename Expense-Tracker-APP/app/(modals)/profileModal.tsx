import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import Header from '@/components/header';
import { Image } from 'expo-image';
import { getProfileImage } from '@/services/imageService';
import { UserDataType } from '@/types/type';
import Typography from '@/components/Typography';
import { TextInput, Button } from 'react-native-paper';
import BackButton from '@/components/backButton';
import * as Icons from 'phosphor-react-native'
import { useAuth } from '@/contexts/authContext';
import { updateUser } from '@/services/userServices';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const ProfileModal = () => {
  const [userData, setUserData] = useState<UserDataType>({
    name: '',
    image: null,
  });
  const [loading,setLoading] = useState(false)
  const {user, updateUserData} = useAuth();
  const router = useRouter();

  useEffect(()=>{
    setUserData({
        name:user?.name || "",
        image:user?.image || null
    })

  },[])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUserData({...userData, image:result.assets[0]});
    }
  };

  const handleSubmit = async () => {
    let {name,image} = userData;
    if(!name ){
        Alert.alert('Please fill all fields!')
    }
    setLoading(true);
    const response = await updateUser(user?.uid as string,userData);
    setLoading(false);
    if(response.success){
      updateUserData(user?.uid as string);
      router.back()
    }
    else{
      Alert.alert('Update Failed', response.msg || 'Something went wrong, please try again later.');
    }
  }

  return (
    <ScreenWrapper>
        <BackButton />
      <Header title="Update Profile" center />

      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={pickImage}>
          <Image
            source={getProfileImage(userData.image)}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
          
          <Icons.PencilLine size={32} weight="fill" style={styles.editIcon} />
          </TouchableOpacity>
          
        </View>

        <View style={styles.form}>
          <Typography variant="subtitle" style={styles.label}>
            Name
          </Typography>
          <TextInput
            mode="outlined"
            value={userData.name}
            onChangeText={(value) => setUserData({ ...userData, name: value })}
            style={styles.input}
            textColor='#ffffff'
            theme={{
              colors: {
                primary: '#00BFA6',
                text: '#fff',
                placeholder: '#aaa',
                background: '#1e1e1e',
              },
            }}
          />

          <Button
            mode="contained"
            onPress={() => handleSubmit()}
            contentStyle={styles.buttonContent}
            style={styles.button}
            loading={loading}
          >
            Save Changes
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 14,
    
  },
  
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    position:'relative'
  },
  editIcon: {
  position: 'absolute',
  bottom: 1,
  right: 10,
  backgroundColor: '#dddddd',
  borderRadius: 20,
  padding: 6,
},
  form: {
    marginTop: 12,
  },
  label: {
    marginBottom: 4,
    color: '#aaa',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#1e1e1e',
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#00BFA6',
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
