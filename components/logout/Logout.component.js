import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {palette} from '../../styles/palette';

function Logout({navigation}) {
  async function onLogout() {
    await AsyncStorage.removeItem('isLogged');
    navigation.navigate('Login');
  }

  return (
    <View style={styles.logoutContainer}>
      <TouchableOpacity onPress={() => onLogout()}>
        <Text style={styles.logoutButton}>Logout!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: palette.grey.medium,
    padding: 10,
    borderRadius: 10,
  },
});

export default Logout;
