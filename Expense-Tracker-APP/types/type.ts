import { GestureResponderEvent, TextStyle } from "react-native";

export interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: object;
}

export interface TypographyProps {
  children: React.ReactNode;
  variant?: 'title' | 'subtitle' | 'body';
  style?: TextStyle;
}

export interface PrimaryButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
}