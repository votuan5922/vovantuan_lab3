import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useMyContextController} from '../store';
import {useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

export default function UpdateService({navigation}) {
  const route = useRoute();
  const {id} = route.params;
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [serviceName, setServiceName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [service, setService] = React.useState([]);
  const [imageService, setImageService] = React.useState('');
  const hasErrorServiceName = () => serviceName === '';
  const hasErrorPrice = () => price <= 0;
  const [image, setImage] = useState(null);
  const SERVICES = firestore().collection('SERVICES');

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
    } else setIsAdmin(userLogin.role == 'admin');

    const getService = SERVICES.doc(id).onSnapshot(doc => {
      const service = doc.data();
      if (doc.exists) {
        setImage(service.image);
        setServiceName(service.serviceName);
        setPrice(service.price);
      } else Alert.alert('Service not found');
    });

    return getService;
  }, [id, userLogin]);

  const handleUpdateService = () => {
    SERVICES.doc(id)
      .update({
        serviceName: serviceName,
        price: price,
        updatedBy: userLogin.fullname,
      })
      .then(() => {
        const refImage = storage().ref('/services/' + id + '.png');

        if (image != '') {
          console.log('Image path:', image);

          refImage
            .putFile(image)
            .then(() => {
              console.log('Image uploaded successfully');

              refImage.getDownloadURL().then(link => {
                SERVICES.doc(id)
                  .update({
                    serviceName: serviceName,
                    price: price,
                    image: link,
                    updatedBy: userLogin.fullname,
                  })
                  .then(() => {
                    Alert.alert('Update success!');
                    navigation.goBack();
                  })
                  .catch(e => Alert.alert('Update failed', e.message));
              });
            })
            .catch(e => console.error('Upload image failed', e));
        } else {
          Alert.alert('Update success!');
          navigation.goBack();
        }
      })
      .catch(e => Alert.alert('Update failed', e.message));
  };

  const handleUploadImage = () => {
    ImagePicker.openPicker({
      height: 300,
      width: 400,
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => setImage(image.path))
      .catch(e => console.log(e.message));
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      {image != null && <Image source={{uri: image}} style={{height: 300}} />}
      <Text style={styles.text}>Service name: </Text>
      <TextInput
        style={styles.inputText}
        label="Input a new service"
        value={serviceName}
        onChangeText={setServiceName}
        underlineColor="transparent"
        underlineStyle={0}
      />
      <HelperText type="error" visible={hasErrorServiceName}>
        Service name not empty
      </HelperText>
      <Text style={styles.text}>Price: </Text>
      <TextInput
        keyboardType="numeric"
        style={styles.inputText}
        label="Input price"
        value={price}
        onChangeText={setPrice}
        underlineColor="transparent"
        underlineStyle={0}
      />
      <HelperText type="error" visible={hasErrorPrice}>
        {'Price > 0'}
      </HelperText>

      <Button onPress={handleUploadImage}>Upload Image</Button>
      {isAdmin && (
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleUpdateService}>
          Update
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputText: {
    backgroundColor: 'none',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  button: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'red',
  },
});