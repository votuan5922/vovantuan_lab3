import React from 'react';
import {Icon} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RouterServices from '../routers/RouterServices';
import Transaction from './Transaction';
import Setting from './Setting';
import CustomerAdmin from './CustomerAdmin';

const Tab = createBottomTabNavigator();
export default function Admin() {
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
        name="Transaction"
        component={Transaction}
        options={{
          tabBarLabel: 'Transaction',
          headerStyle: {backgroundColor: 'red'},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => <Icon source="cash" color="red" size={26} />,
          tabBarLabelStyle: {color: 'red', fontSize: 13},
        }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerAdmin}
        options={{
          tabBarLabel: 'Customer',
          headerStyle: {backgroundColor: 'red'},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => (
            <Icon source="account-multiple" color="red" size={26} />
          ),
          tabBarLabelStyle: {color: 'red'},
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