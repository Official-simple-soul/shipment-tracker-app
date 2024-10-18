import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import InputField from '@/components/InputField';
import { AntDesign } from '@expo/vector-icons';
import { login } from '@/services/auth.service';
import { useGlobalContext } from '@/store/context';
import { Redirect, router } from 'expo-router';
import Loader from '@/components/Loader';
import { validateAndHandleErrors } from '@/utils/validator';

export default function Index() {
  const { isLoading, setIsLoading, setCurrentUser } = useGlobalContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // TODO: Implement form validation
    const hasErrors = validateAndHandleErrors({ username, password });

    if (hasErrors) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await login({ usr: username, pwd: password, url });
      setCurrentUser(response);
      router.replace('/protected');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Login failed', error + '');
    } finally {
      setIsLoading(false);

      // TODO: Clear form inputs
    }
  };

  // if (usern.exist()) {
  //   return <Redirect href={'/protected'} />;
  // }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require('@/assets/images/root-index-logo.png')}
        style={{ width: 207.63, height: 36 }}
      />
      <Button
        title="Login"
        onPress={() => setShowLoginModal(true)}
        color="#ffffff"
        textColor={Colors.pri}
        styleOverride={{ width: '100%', position: 'absolute', bottom: 20 }}
      />

      <Modal visible={showLoginModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={{
                width: 30,
                height: 5,
                backgroundColor: Colors.sec,
                borderRadius: 4,
                alignSelf: 'center',
              }}
              onPress={() => setShowLoginModal(false)}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 2,
                alignSelf: 'flex-start',
                marginBottom: 10,
              }}
              onPress={() => setShowLoginModal(false)}
            >
              <AntDesign name="left" size={20} color={Colors.pri} />
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.loginTitle}>Login</Text>
            <Text style={styles.subtitle}>
              Please enter your First, Last name and your phone number in order
              to register
            </Text>
            <InputField
              label="URL"
              value={`https://${url}`}
              onChangeText={(text) => {
                const urlWithoutPrefix = text.replace('https://', '');
                setUrl(urlWithoutPrefix);
              }}
              keyboardType="url"
            />
            <InputField
              label="Username / Email"
              value={username}
              onChangeText={setUsername}
              keyboardType="email-address"
            />
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'flex-end',
                paddingVertical: 20,
              }}
            >
              <Button
                title="Login"
                onPress={handleLogin}
                color={Colors.pri}
                textColor="#ffffff"
                isLoading={isLoading}
                styleOverride={{
                  width: '100%',
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pri,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    width: '99%',
    height: '96%',
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 20,
    shadowColor: 'gray',
    shadowOpacity: 0.2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cancelText: {
    alignSelf: 'flex-start',
    color: Colors.pri,
    fontSize: 16,
    fontFamily: 'ir',
  },
  loginTitle: {
    fontSize: 32,
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontFamily: 'isb',
  },
  subtitle: {
    fontSize: 14,
    color: '#A8A6A7',
    marginBottom: 20,
    alignSelf: 'flex-start',
    fontFamily: 'ir',
  },
});
