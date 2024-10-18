import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { FontAwesome, FontAwesome5, EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const TabBarLabel = ({
  title,
  focused,
}: {
  title: string;
  focused: boolean;
}) => {
  return (
    <Text
      style={{
        color: focused ? Colors.pri : '#A8A6A7',
        fontSize: 10,
        marginTop: 4,
        fontFamily: 'ir',
      }}
    >
      {title}
    </Text>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.pri,
        tabBarInactiveTintColor: '#A8A6A7',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          height: Platform.OS === 'android' ? 72 : 80,
          borderTopColor: '#E5E5E5',
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Shipments',
          tabBarIcon: ({ color }) => (
            <>
              <FontAwesome name={'cubes'} size={25} color={color} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => (
            <>
              <MaterialCommunityIcons
                name="barcode-scan"
                size={25}
                color={color}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => (
            <>
              <FontAwesome5 name="wallet" size={25} color={color} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <>
              <EvilIcons name="user" size={25} color={color} />
            </>
          ),
        }}
      />
    </Tabs>
  );
}
