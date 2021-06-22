import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './components/login/Login.component';
import Screens from './components/screens/Screens.component';
import BookDetail from './components/detail/BookDetail.component';

import {Provider} from 'react-redux';
import store from './redux/store';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Login'}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Screens}
            options={{
              headerLeft: null,
              headerStyle: {
                backgroundColor: 'blue',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen name="BookDetail" component={BookDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
