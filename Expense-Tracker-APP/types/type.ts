// types/type.ts
import { ReactNode } from "react";
import { GestureResponderEvent, TextStyle, ViewStyle } from "react-native";

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

// Fixed userType - removed the | null from the type definition
export type userType = {
    uid?: string;
    email?: string | null;
    name: string | null;
    image?: any;
};

export type UserDataType = {
    name: string;
    image?: any;
};

// Fixed AuthContextType - proper typing for setUser and updateUserData
// @types/type.ts
export interface AuthContextType {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
  login: (email: string, password: string) => Promise<{ success: boolean; msg?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; msg?: string }>;
  logout: () => Promise<{ success: boolean; msg?: string }>;
  updateUserData: (uid: string) => Promise<void>;
  loading: boolean;
}

export interface HeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export interface accountType {
    title:string,
    icon:React.ReactNode,
    bgColor:string,
    routeName?:any
}