import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/header";
import Typography from "@/components/Typography";
import BackButton from "@/components/backButton";

const PrivacyPolicy = () => {
  return (
    <ScreenWrapper>
      <BackButton />
      <Header title="Privacy Policy" center />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>

          <Typography variant="body" style={styles.paragraph}>
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you use our Expense Tracker
            application.
          </Typography>

          <Typography variant="subtitle" style={styles.subheading}>
            Information We Collect
          </Typography>
          <Typography variant="body" style={styles.paragraph}>
            We collect personal information you provide, such as your name,
            email address, and expense details you manually enter. We may also
            collect usage data, device information, and log data to improve the
            app.
          </Typography>

          <Typography variant="subtitle" style={styles.subheading}>
            How We Use Your Information
          </Typography>
          <Typography variant="body" style={styles.paragraph}>
            We use your information to:
            {"\n"}- Provide and improve our services.
            {"\n"}- Customize your experience.
            {"\n"}- Communicate with you regarding updates or important
            notices.
          </Typography>

          <Typography variant="subtitle" style={styles.subheading}>
            Sharing Your Information
          </Typography>
          <Typography variant="body" style={styles.paragraph}>
            We do not share your personal information with third parties except
            to comply with legal obligations or protect our rights.
          </Typography>

          <Typography variant="subtitle" style={styles.subheading}>
            Data Security
          </Typography>
          <Typography variant="body" style={styles.paragraph}>
            We implement reasonable measures to protect your data. However, no
            method of transmission over the Internet is 100% secure.
          </Typography>

          <Typography variant="subtitle" style={styles.subheading}>
            Your Rights
          </Typography>
          <Typography variant="body" style={styles.paragraph}>
            You have the right to access, update, or delete your personal
            information. Please contact us if you wish to exercise these rights.
          </Typography>

          <Typography variant="subtitle" style={styles.subheading}>
            Changes to This Policy
          </Typography>
          <Typography variant="body" style={styles.paragraph}>
            We may update this policy from time to time. We will notify you of
            any significant changes by posting the new policy within the app.
          </Typography>

          <Typography variant="subtitle" style={styles.subheading}>
            Contact Us
          </Typography>
          <Typography variant="body" style={styles.paragraph}>
            If you have any questions about this Privacy Policy, please contact
            us at support@example.com.
          </Typography>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 32,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop:20
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#fff",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
    color: "#00BFA6",
  },
  paragraph: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 24,
  },
});
