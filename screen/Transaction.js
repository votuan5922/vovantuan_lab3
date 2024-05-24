import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useMyContextController} from '../store';
import firestore from '@react-native-firebase/firestore';

export default function Transaction({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [appoimentLst, setAppoimentLst] = React.useState([]);
  const TRANSACTION = firestore().collection('APPOIMENTS');

  useEffect(() => {
    if (userLogin == null) navigation.navigate('Signin');

    const list = TRANSACTION.onSnapshot(response => {
      var arr = [];
      response.forEach(async doc => {
        const appointmentData = doc.data();
        const serviceDocRef = firestore()
          .collection('SERVICES')
          .doc(appointmentData.serviceId);

        const serviceDoc = await serviceDocRef.get();
        if (serviceDoc.exists) {
          const serviceData = serviceDoc.data();
          const appointmentWithServiceName = {
            ...appointmentData,
            service: serviceData.serviceName,
          };
          arr.push(appointmentWithServiceName);
          setAppoimentLst([...arr]);
        }
      });
    });
    return () => list();
  }, [userLogin]);

  const handleAccept = (id, complete) => {
    TRANSACTION.doc(id).update({complete: !complete});
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <View style={{...styles.borderFlatlst, flexDirection: 'row'}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              padding: 5,
              marginLeft: 5,
              marginRight: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                User name:{' '}
              </Text>
              <Text style={{fontSize: 18}}>{item.customerId}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Service name:{' '}
              </Text>
              <Text style={{fontSize: 18}}>{item.service}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Date: </Text>
              <Text style={{fontSize: 18}}>
                {item.datetime.toDate().toLocaleString()}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              left: 40,
            }}>
            <IconButton
              icon={
                item.complete ? 'check-circle' : 'checkbox-blank-circle-outline'
              }
              color={item.complete ? 'green' : 'gray'}
              onPress={() => handleAccept(item.id)}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        margin: 10,
      }}>
      <Text variant="headlineSmall" style={{color: '#000', fontWeight: 'bold'}}>
        Danh sách dịch vụ đăng kí
      </Text>
      <FlatList
        data={appoimentLst}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
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