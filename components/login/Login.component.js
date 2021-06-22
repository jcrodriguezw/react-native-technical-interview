import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {loginAction} from '../../redux/actions';
import axios from 'axios';

import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import {StackActions} from '@react-navigation/native';
import {palette} from '../../styles/palette';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
};

const ageArray = [
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
  56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
  75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93,
  94, 95, 96, 97, 98, 99,
];

function Login({navigation}) {
  const dispatch = useDispatch();
  const [term, setTerm] = useState(false);
  const [age, setAge] = useState(ageArray[0]);
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const isLogged = await AsyncStorage.getItem('isLogged');

      const userLogged = JSON.parse(isLogged);

      if (isLogged) {
        setUser(userLogged);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    function getScreen() {
      if (user) {
        const pushAction = StackActions.push('Home');

        navigation.dispatch(pushAction);
      }
    }

    getScreen();
  }, [user, navigation]);

  async function onHandleSubmitValues(values) {
    const evaluate = Object.keys(values);
    let newErrors = {};
    evaluate.forEach(item => {
      if (!values[item]) {
        newErrors = {
          ...newErrors,
          [item]: true,
        };
      }
      if (item === 'email') {
        const regex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]/g;
        if (!regex.test(values.email)) {
          newErrors = {
            ...newErrors,
            [item]: true,
          };
        }
      }
    });
    if (!age) {
      newErrors = {
        ...newErrors,
        age: true,
      };
    }
    if (!term) {
      newErrors = {
        ...newErrors,
        term: true,
      };
    }
    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }
    const {firstName, lastName, email} = values;
    const newUser = {
      firstName,
      lastName,
      email,
    };

    const response = await axios
      .post('http://10.0.2.2:3000/sign_in', newUser)
      .catch(err => console.log(err));

    if (!response) {
      return Alert.alert('something is wrong, try again');
    }

    if (response) {
      const result = await dispatch(loginAction(newUser));

      const {payload} = result;
      if (payload.email) {
        await AsyncStorage.setItem('isLogged', JSON.stringify(payload));
        navigation.navigate('Home');
      }
    }
  }

  function handleCheckInput(field) {
    if (errors[field]) {
      delete errors[field];
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}> Log in </Text>
      <Formik initialValues={INITIAL_VALUES} onSubmit={onHandleSubmitValues}>
        {({handleChange, handleSubmit, values}) => {
          const {firstName, lastName, email} = values;

          return (
            <View>
              <TextInput
                style={errors.firstName ? styles.inputError : styles.input}
                name="firstName"
                value={firstName}
                placeholder="FirstName"
                onChangeText={handleChange('firstName')}
                onChange={() => handleCheckInput('firstName')}
              />
              <TextInput
                style={errors.lastName ? styles.inputError : styles.input}
                name="lastName"
                value={lastName}
                placeholder="LastName"
                onChangeText={handleChange('lastName')}
                onChange={() => handleCheckInput('lastName')}
              />
              <TextInput
                style={errors.email ? styles.inputError : styles.input}
                name="email"
                value={email}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onChange={() => handleCheckInput('email')}
              />

              <Picker
                onValueChange={itemValue => setAge(itemValue)}
                selectedValue={age}>
                {ageArray.map(item => (
                  <Picker.Item key={item} label={`${item}`} value={item} />
                ))}
              </Picker>

              <View style={styles.agreementWrapper}>
                <CheckBox value={term} onValueChange={() => setTerm(!term)} />
                <Text>I have read the agreement</Text>
              </View>
              <Button
                disabled={!firstName || !lastName || !email || !age || !term}
                onPress={handleSubmit}
                title="LOGIN"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agreementWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 250,
    padding: 10,
    borderRadius: 10,
  },
  inputError: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 250,
    padding: 10,
    borderRadius: 10,
    borderColor: palette.red.medium,
  },
});

export default Login;
