import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text} from 'react-native';

import Library from '../library/Library.component';
import Logout from '../logout/Logout.component';

const Tab = createBottomTabNavigator();

function WhishList() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>WhishList!</Text>
    </View>
  );
}

function Screens() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Library') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'WhishList') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Logout') {
            iconName = focused ? 'exit-sharp' : 'exit-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Library"
        component={Library}
        options={{tabBarLabel: 'Home!'}}
      />
      <Tab.Screen name="WhishList" component={WhishList} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  );
}

export default Screens;
