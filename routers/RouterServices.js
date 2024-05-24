import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {useMyContextController} from '../store';
import Services from '../screen/Services';
import AddNewService from '../screen/AddNewService';
import ServiceDetail from '../screen/ServiceDetail';

const Stack = createStackNavigator();
export default function RouterServices({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  useEffect(() => {
    if (userLogin == null) navigation.navigate('Signin');
  }, [navigation, userLogin]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Services"
        component={Services}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddNewService"
        component={AddNewService}
        options={{
          headerTitle: 'Service',
          headerStyle: {backgroundColor: 'red'},
          headerTitleStyle: {color: 'white'},
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{
          headerTitle: 'Service Detail',
          headerStyle: {backgroundColor: 'red'},
          headerTitleStyle: {color: '#fff'},
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}