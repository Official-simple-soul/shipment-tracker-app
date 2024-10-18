import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const SplashScreen = () => {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const topPartScale = useRef(new Animated.Value(1)).current;
  const topPartOpacity = useRef(new Animated.Value(1)).current;
  const bottomPartTranslateY = useRef(new Animated.Value(0)).current;
  const screenBackgroundColor = useRef(new Animated.Value(0)).current;

  const [showParts, setShowParts] = useState(false);

  useEffect(() => {
    Animated.timing(logoScale, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setShowParts(true);

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(topPartScale, {
            toValue: 5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(topPartOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(bottomPartTranslateY, {
            toValue: -500,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(screenBackgroundColor, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]).start();
      }, 1000);
    });
  }, []);

  const backgroundColor = screenBackgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#2f54eb'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <StatusBar style="light" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {!showParts && (
          <Animated.Image
            source={require('@/assets/images/splash-logo.png')}
            style={{
              width: 144,
              height: 139.17,
              transform: [{ scale: logoScale }],
            }}
            resizeMode="contain"
          />
        )}
        {showParts && (
          <>
            <Animated.Image
              source={require('@/assets/images/splash-logo-top.png')}
              style={[
                styles.topPart,
                {
                  transform: [{ scale: topPartScale }],
                  opacity: topPartOpacity,
                },
              ]}
              resizeMode="contain"
            />
            <Animated.Image
              source={require('@/assets/images/splash-logo-bottom.png')}
              style={[
                styles.bottomPart,
                {
                  transform: [{ translateY: bottomPartTranslateY }],
                },
              ]}
              resizeMode="contain"
            />
          </>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topPart: {
    width: 144,
    height: 47.99,
  },
  bottomPart: {
    width: 144,
    height: 91.18,
  },
});

export default SplashScreen;
