import {Alert, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import React from 'react';
import auth from '@react-native-firebase/auth';

function ForgotPass({navigation}) {
  const [email, setEmail] = React.useState('');
  const handlResetPass = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Error...'))
      .catch(e => Alert.alert(e.message));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerName}>Forget Pass</Text>
      <TextInput
        style={styles.textInput}
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        underlineColor="transparent"
        underlineStyle={0}
      />
      <Button style={styles.button} mode="contained" onPress={handlResetPass}>
        Send Email
      </Button>
      <View style={{flexDirection: 'column'}}>
        <Button onPress={() => navigation.navigate('Signin')}>Back</Button>
      </View>
    </View>
  );
}
export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#dcdcdc',
    padding: 30,
  },
  headerName: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },

  textInput: {
    marginBottom: 10,
    backgroundColor: 'none',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },

  button: {
    borderRadius: 10,
    marginTop: 20,
    padding: 5,
    backgroundColor: 'red',
  },
});