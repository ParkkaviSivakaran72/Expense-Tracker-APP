// components/customTabNavigator.tsx
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Icons from 'phosphor-react-native'

const MyTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row' ,backgroundColor:'#151515'}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label :any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabBarIcons :any = {
            index : (isFocused: boolean) => (
                <Icons.House size={32} weight={isFocused ? "fill" :"regular"} color= {isFocused ? '#00BFA6':'#ffffff'} />
            ),
            wallet : (isFocused: boolean) => (
                <Icons.Wallet size={32} weight={isFocused ? "fill" :"regular"} color= {isFocused ? '#00BFA6':'#ffffff'} />
            ),
            statstics : (isFocused: boolean) => (
                <Icons.ChartBar size={32} weight={isFocused ? "fill" :"regular"} color= {isFocused ? '#00BFA6':'#ffffff'} />
            ),
            profile : (isFocused: boolean) => (
                <Icons.User size={32} weight={isFocused ? "fill" :"regular"} color= {isFocused ? '#00BFA6':'#ffffff'} />
            )
        }

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center', padding: 10, margin:10  , justifyContent:'center' }}
          >
            {
                tabBarIcons[route.name] && tabBarIcons[route.name](isFocused)
            }
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default MyTabBar;
