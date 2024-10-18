import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '@/constants/Colors';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'black',
              width: '100%',
              height: '100%',
              opacity: 0.8,
            }}
          ></View>
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 8,
              backgroundColor: Colors.pri,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator color={'white'} size={'large'} />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default Loader;
