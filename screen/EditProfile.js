import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Avatar, Button, Text, TextInput} from 'react-native-paper';
import {useMyContextController} from '../store';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

export default function EditProfile({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [imageAvatar, setImageAvatar] = React.useState('');
  const id = 0;

  const USERS = firestore().collection('USERS');

  useEffect(() => {
    if (userLogin == null) navigation.navigate('Signin');
    const showInfo = USERS.doc(userLogin.email).onSnapshot(doc => {
      if (doc.exists) {
        const userData = doc.data();
        setFullname(userData.fullname);
        setPhone(userData.phone);
        setImageAvatar(userData.image);
      } else {
        Alert.alert('User not found');
      }
    });

    return () => {
      showInfo();
    };
  }, [userLogin]);

  const updateInfo = () => {
    USERS.doc(userLogin.email).update({
      fullname: fullname,
      phone: phone,
    });
    const refImage = storage().ref('/avatar/' + `${id + 1}` + '.png');
    refImage
      .putFile(imageAvatar)
      .then(response => {
        if (imageAvatar != '') {
          console.log('Image Path: ' + imageAvatar);
        }

        refImage.getDownloadURL().then(link => {
          USERS.doc(userLogin.email)
            .update({
              image: link,
            })
            .then(() => {
              Alert.alert('Update successfully');
            });
        });
        firestore()
          .collection('APPOIMENTS')
          .where('email', '==', userLogin.email)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.update({customerId: fullname});
            });
          });
        Alert.alert('Cập nhật thành công!');
      })
      .catch(error =>
        console.error('Lỗi khi cập nhật thông tin người dùng: ', error),
      );
  };

  const handleImageUpload = () => {
    ImagePicker.openPicker({
      height: 300,
      width: 400,
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        setImageAvatar(image.path);
      })
      .catch(e => console.log(e.message));
  };

  return (
    <View style={{flex: 1}}>
      <View style={[{flex: 1, backgroundColor: 'red'}, styles.avatar]}>
        <TouchableOpacity onPress={handleImageUpload}>
          <Avatar.Image
            style={{
              height: 154,
              width: 154,
              borderColor: 'white',
              borderWidth: 2,
            }}
            size={150}
            source={
              imageAvatar ? {uri: imageAvatar} : require('../asset/R.png')
            }
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, padding: 10}}>
        <View>
          <Text style={{fontSize: 18, marginBottom: 10, fontWeight: 'bold'}}>
            User name:{' '}
          </Text>
          <TextInput
            style={styles.textInput}
            label="User name"
            value={fullname}
            onChangeText={setFullname}
          />
        </View>
        <View>
          <Text style={{fontSize: 18, marginBottom: 10, fontWeight: 'bold'}}>
            Phone:{' '}
          </Text>
          <TextInput
            style={styles.textInput}
            label="Phone"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <Button style={styles.button} mode="contained" onPress={updateInfo}>
          Update
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
  textInput: {
    marginBottom: 10,
    backgroundColor: null,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    fontSize: 18,
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
    padding: 5,
    backgroundColor: 'red',
  },
});