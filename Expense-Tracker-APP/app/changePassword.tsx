import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Header from "@/components/header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { auth } from "@/config/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import BackButton from "@/components/backButton";
import Typography from "@/components/Typography";
import { useRouter } from "expo-router";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters.");
      return;
    }

    if (!auth.currentUser || !auth.currentUser.email) {
      Alert.alert("Error", "No authenticated user.");
      return;
    }

    setLoading(true);
    try {
      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update password
      await updatePassword(auth.currentUser, newPassword);
      router.back();
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      console.log("Error updating password:", error);
      Alert.alert("Error", error.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <BackButton />
      <Header title="Change Password" center />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.form}>
          <Typography variant="subtitle" style={styles.label}>
            Current Password
          </Typography>
          <TextInput
            mode="outlined"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            style={styles.input}
            placeholder="Enter current password"
            textColor="#ffffff"
            theme={{
            colors: {
              primary: '#00BFA6',           
              placeholder: '#cccccc', 
              background: '#1c1c1c',  
            }
          }}

          />

          <Typography variant="subtitle" style={styles.label}>
            New Password
          </Typography>
          <TextInput
            mode="outlined"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
            placeholder="Enter new password"
            textColor="#ffffff"
            theme={{
            colors: {
              primary: '#00BFA6',       
              placeholder: '#cccccc', 
              background: '#1c1c1c',  
            }
          }}
          />

          <Typography variant="subtitle" style={styles.label}>
            Confirm New Password
          </Typography>
          <TextInput
            mode="outlined"
            secureTextEntry
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            style={styles.input}
            placeholder="Confirm new password"
            textColor="#ffffff"
            theme={{
            colors: {
              primary: '#00BFA6',      
              placeholder: '#cccccc', 
              background: '#1c1c1c',  
            }
          }}
          />

          <Button
            mode="contained"
            loading={loading}
            onPress={handleChangePassword}
            contentStyle={styles.buttonContent}
            style={styles.button}
          >
            Change Password
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  form: {
    marginTop: 12,
  },
  label: {
    marginBottom: 4,
    color: "#aaa",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#1e1e1e",
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#00BFA6",
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
