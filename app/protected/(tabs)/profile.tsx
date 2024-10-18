import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useGlobalContext } from '@/store/context';
import { router } from 'expo-router';

const profile = () => {
  const { currentUser, setCurrentUser } = useGlobalContext();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>profile</Text>
      <Text>{currentUser?.full_name}</Text>
      <Pressable onPress={() => {}}>
        <Text style={{ color: 'red' }}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
