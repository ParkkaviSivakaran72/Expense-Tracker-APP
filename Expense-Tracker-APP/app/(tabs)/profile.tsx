import Header from '@/components/header';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typography from '@/components/Typography';
import { useAuth } from '@/contexts/authContext';
import React from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Animated from 'react-native-reanimated'
import { getProfileImage } from '@/services/imageService';
import * as Icons from 'phosphor-react-native';
import { accountType } from '@/types/type';
import { router } from 'expo-router';
import { FadeInDown } from 'react-native-reanimated';
import { auth } from '@/config/firebase';
import { signOut } from '@firebase/auth';

const Profile = () => {
  const { user } = useAuth();

  const accountOptions: accountType[] = [
    {
      title: 'Edit Profile',
      icon: <Icons.User size={24} weight="fill" color="#fff" />,
      routeName: '/(modals)/profileModal',
      bgColor: '#00BFA6',
    },
    {
      title: 'Settings',
      icon: <Icons.Gear size={24} weight="fill" color="#fff" />,
      routeName: '/(modals)/settings',
      bgColor: '#0077FF',
    },
    {
      title: 'Privacy Policy',
      icon: <Icons.Lock size={24} weight="fill" color="#fff" />,
      routeName: '/(modals)/privacyPolicy',
      bgColor: '#FFC107',
    },
    {
      title: 'Logout',
      icon: <Icons.SignOut size={24} weight="fill" color="#fff" />,
      bgColor: '#FF3B30',
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login')
  }

  const showLogout = () => {
    Alert.alert("confirm", "Are you sure you want to Logout?", [
      {
        text: 'cancel',
        onPress: () => console.log("Cancel logout"),
        style: 'cancel'

      },
      {
        text: 'Logout',
        onPress: () => handleLogout(),
        style: 'destructive'
      }
    ])

  }

  const handlePress = (item: accountType) => {
    if (item.title == "Logout") {
      showLogout();
    }
    if(item.routeName){
      router.push(item.routeName)
    }
  }

  return (
    <ScreenWrapper>
      <Header title="Profile" center />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            source={getProfileImage(user?.image)}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
          <Typography variant="title" style={styles.name}>
            {user?.name || 'Guest User'}
          </Typography>
          <Typography variant="subtitle" style={styles.email}>
            {user?.email || 'Not Signed In'}
          </Typography>
        </View>

        <View style={styles.optionsWrapper}>
          {accountOptions.map((item, key) => (
            <Animated.View
              key={key}
              entering={FadeInDown.delay(100 * key).springify().damping(10)}
            >
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handlePress(item)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconWrapper, { backgroundColor: item.bgColor }]}>
                  {item.icon}
                </View>
                <Typography variant="subtitle" style={styles.optionText}>
                  {item.title}
                </Typography>
              </TouchableOpacity>
            </Animated.View>

          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 32,
  },
  container: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 14,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#aaa',
  },
  optionsWrapper: {
    paddingHorizontal: 5,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
});
