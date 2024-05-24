import React from 'react';
import {Icon, IconButton, Text} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RouterServices from '../routers/RouterServices';
import Setting from './Setting';
import Appoinent from './Appoinent';

const Tab = createBottomTabNavigator();
export default function Customer() {
  return (
    <Tab.Navigator initialRouteName="RouterServices">
      <Tab.Screen
        name="RouterServices"
        component={RouterServices}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: () => <Icon source="home" color="red" size={26} />,
          tabBarLabelStyle: {color: 'red', fontSize: 13},
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appoinent}
        options={{
          tabBarLabel: 'Appointment',
          headerStyle: {backgroundColor: 'red'},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => <Icon source="cash" color="red" size={26} />,
          tabBarLabelStyle: {color: 'red', fontSize: 13},
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          headerStyle: {backgroundColor: 'red'},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => <Icon source="cog" color="red" size={26} />,
          tabBarLabelStyle: {color: 'red'},
        }}
      />
    </Tab.Navigator>
  );
}