import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

interface ButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  icon?: React.ReactNode;
  textSize?: number;
  styleOverride?: {};
  textStyleOverride?: {};
}

const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  disabled = false,
  title,
  onPress,
  color = '#007bff',
  textColor = '#ffffff',
  icon,
  textSize = 16,
  styleOverride = {},
  textStyleOverride = {},
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? '#cccccc' : color,
        },
        { ...styleOverride },
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={[styles.icon]}>{icon}</View>}
          <Text
            style={[
              styles.buttonText,
              { color: textColor, fontSize: textSize },
              { ...textStyleOverride },
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'ib',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
});

export default Button;
