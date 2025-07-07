import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import Header from "@/components/header";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typography from "@/components/Typography";
import { auth } from "@/config/firebase";
import { signOut } from "@firebase/auth";
import { router } from "expo-router";
import Animated from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
import * as Icons from "phosphor-react-native";
import Constants from "expo-constants";
import BackButton from "@/components/backButton";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  const showLogout = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => handleLogout(), style: "destructive" },
    ]);
  };

  const handlePress = (routeName?: any) => {
    if (routeName) {
      router.push(routeName);
    }
  };

  return (
    <ScreenWrapper>
        <BackButton />
      <Header title="Settings" center />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.optionsWrapper}>
          {/* Edit Profile */}
          <Animated.View entering={FadeInDown.springify()}>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => handlePress("/(modals)/profileModal")}
            >
              <View style={[styles.iconWrapper, { backgroundColor: "#00BFA6" }]}>
                <Icons.User size={24} weight="fill" color="#fff" />
              </View>
              <Typography variant="subtitle" style={styles.optionText}>
                Edit Profile
              </Typography>
            </TouchableOpacity>
          </Animated.View>

          {/* Change Password */}
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => handlePress("/changePassword")}
            >
              <View style={[styles.iconWrapper, { backgroundColor: "#FF9800" }]}>
                <Icons.Key size={24} weight="fill" color="#fff" />
              </View>
              <Typography variant="subtitle" style={styles.optionText}>
                Change Password
              </Typography>
            </TouchableOpacity>
          </Animated.View>

          {/* Dark Mode */}
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <View style={styles.optionItem}>
              <View style={[styles.iconWrapper, { backgroundColor: "#0077FF" }]}>
                <Icons.MoonStars size={24} weight="fill" color="#fff" />
              </View>
              <Typography variant="subtitle" style={styles.optionText}>
                Dark Mode
              </Typography>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                style={styles.switch}
              />
            </View>
          </Animated.View>

          {/* Notifications */}
          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <View style={styles.optionItem}>
              <View style={[styles.iconWrapper, { backgroundColor: "#FFC107" }]}>
                <Icons.Bell size={24} weight="fill" color="#fff" />
              </View>
              <Typography variant="subtitle" style={styles.optionText}>
                Notifications
              </Typography>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                style={styles.switch}
              />
            </View>
          </Animated.View>

          {/* Language */}
          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => Alert.alert("Select Language", "Coming soon...")}
            >
              <View style={[styles.iconWrapper, { backgroundColor: "#9C27B0" }]}>
                <Icons.Globe size={24} weight="fill" color="#fff" />
              </View>
              <Typography variant="subtitle" style={styles.optionText}>
                Language
              </Typography>
            </TouchableOpacity>
          </Animated.View>

          {/* App Information */}
          <Animated.View entering={FadeInDown.delay(500).springify()}>
            <View style={styles.optionItem}>
              <View style={[styles.iconWrapper, { backgroundColor: "#4CAF50" }]}>
                <Icons.Info size={24} weight="fill" color="#fff" />
              </View>
              <Typography variant="subtitle" style={styles.optionText}>
                App Version: {Constants.expoConfig?.version || "1.0.0"}
              </Typography>
            </View>
          </Animated.View>

          {/* Logout */}
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <TouchableOpacity style={styles.optionItem} onPress={showLogout}>
              <View style={[styles.iconWrapper, { backgroundColor: "#FF3B30" }]}>
                <Icons.SignOut size={24} weight="fill" color="#fff" />
              </View>
              <Typography variant="subtitle" style={styles.optionText}>
                Logout
              </Typography>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 16,
  },
  optionsWrapper: {
    paddingHorizontal: 16,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
  },
  switch: {
    marginLeft: "auto",
  },
});
