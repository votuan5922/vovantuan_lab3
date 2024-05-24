import React, {useEffect, useState} from 'react';
import {  FlatList,  Image,  StyleSheet,  View,  TouchableOpacity } from 'react-native';
import {IconButton, List, Text, TextInput} from 'react-native-paper';
import {useMyContextController} from '../store';
import firestore from '@react-native-firebase/firestore';

export default function Services({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [serviceLst, setServiceLst] = useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [name, setName] = React.useState('');
  const [serviceData, setServiceData] = React.useState([]);
  const cSERVICES = firestore().collection('SERVICES');
  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
    } else setIsAdmin(userLogin.role == 'admin');

    cSERVICES.onSnapshot(respone => {
      var arr = [];
      respone.forEach(doc => arr.push(doc.data()));
      setServiceLst(arr);
      setServiceData(arr);
    });
  }, [navigation, userLogin]);

  useEffect(() => {
    setServiceData(serviceLst.filter(s => s.serviceName.includes(name)));
  }, [name]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ServiceDetail', {id: item.id})}>

        <View style={styles.borderFlatlst}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 5,
              marginLeft: 5,
              marginRight: 5,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {item.serviceName}
            </Text>
            <Text style={{fontSize: 18}}>{item.price} VND</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          backgroundColor: 'red',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          variant="displaySmall"
          style={{marginLeft: 10, color: '#fff', fontSize: 20}}>
          {userLogin !== null && userLogin.fullname.toUpperCase()}
        </Text>
        <IconButton
          icon="account-circle"
          size={40}
          iconColor="#fff"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Image
          source={require('../asset/logo.png')}
          style={{margin: 20, padding: 10, alignSelf: 'center'}}
        />

        <TextInput
          label={'Search name'}
          value={name}
          onChangeText={setName}
          underlineColor="transparent"
          underlineStyle={0}
          style={{
            margin: 10,
            backgroundColor: 'none',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: 1,
            borderColor: 'grey',
          }}
        />
        <View
          style={{
            height: 50,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text
            variant="headlineSmall"
            style={{color: '#000', fontWeight: 'bold'}}>
            Danh sách dịch vụ
          </Text>
          {isAdmin && (
            <IconButton
              icon="plus-circle"
              size={40}
              iconColor="red"
              onPress={() => navigation.navigate('AddNewService')}
            />
          )}
        </View>
        <FlatList
          data={serviceData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderFlatlst: {
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
    margin: 10,
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
});