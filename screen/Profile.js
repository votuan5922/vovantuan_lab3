import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Button, Icon, Text} from 'react-native-paper';
import {logout, useMyContextController} from '../store';
import firestore from '@react-native-firebase/firestore';

export default function Profile({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [imageAvatar, setImageAvatar] = React.useState('');
  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
    }

    const loadInfo = async () => {
      const userDoc = await firestore()
        .collection('USERS')
        .doc(userLogin.email)
        .get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setImageAvatar(userData.image);
      }
    };
    loadInfo();
  }, [userLogin]);

  return (
    <View style={styles.container}>
      <View style={[{flex: 1, backgroundColor: 'red'}, styles.avatar]}>
        <Avatar.Image
          style={{
            height: 154,
            width: 154,
            borderColor: 'white',
            borderWidth: 2,
          }}
          size={150}
          source={imageAvatar ? {uri: imageAvatar} : require('../asset/R.png')}
        />
      </View>
      <View style={styles.containerInfo}>
        <View style={styles.viewTxt}>
          <Icon source="account" size={30} />
          <Text style={styles.txt}>User Name: </Text>
          <Text style={styles.txtInfo}>
            {userLogin !== null && userLogin.fullname}
          </Text>
        </View>
        <View style={styles.viewTxt}>
          <Icon source="email" size={30} />
          <Text style={styles.txt}>Email: </Text>
          <Text style={styles.txtInfo}>
            {userLogin !== null && userLogin.email}
          </Text>
        </View>
        <View style={styles.viewTxt}>
          <Icon source="phone" size={30} />
          <Text style={styles.txt}>Phone: </Text>
          <Text style={styles.txtInfo}>
            {userLogin !== null && userLogin.phone}
          </Text>
        </View>
        <Button
          style={styles.logoutBtn}
          mode="contained"
          onPress={() =>
            navigation.navigate('EditProfile', {
              email: userLogin.email,
            })
          }>
          Edit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    marginTop: 20,
    margin: 10,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTxt: {
    flexDirection: 'row',
    margin: 10,
  },
  txt: {
    marginLeft: 10,
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
  txtInfo: {
    fontSize: 20,
  },
  logoutBtn: {
    margin: 10,
    marginTop: 100,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'red',
  },
});