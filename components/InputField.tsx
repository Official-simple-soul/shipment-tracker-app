import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'url';
  placeholder?: string;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  placeholder,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[styles.inputContainer, isFocused && { borderColor: Colors.pri }]}
    >
      <Text
        style={[
          styles.label,
          isFocused || value ? { top: 4, fontSize: 12, color: Colors.pri } : {},
        ]}
      >
        {label}
      </Text>
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor="#D8D8D8"
        placeholder={placeholder}
      />
      {icon ? icon : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    height: 50,
    backgroundColor: Colors.base,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  label: {
    position: 'absolute',
    left: 10,
    top: 15,
    color: '#A8A6A7',
    fontSize: 16,
    zIndex: 1,
    fontFamily: 'ir',
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 13,
    paddingLeft: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 2,
    fontFamily: 'ir',
    zIndex: 9999,
  },
});

export default InputField;
