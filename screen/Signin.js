import {Alert, StyleSheet, View} from 'react-native';
import {Button, Icon, Text, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
import '@react-native-firebase/app';
import {login, useMyContextController} from '../store';

function Signin({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const {userLogin} = controller;
  const [showPass, setShowPass] = React.useState(false);

  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role == 'admin') {
        navigation.navigate('Admin');
      } else if (userLogin.role == 'customer') {
        navigation.navigate('Customer');
      }
    }
    console.log(userLogin);
  }, [navigation, userLogin]);

  const handleLogin = () => {
    login(dispatch, email, pass);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerName}>Login</Text>
      <TextInput
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        underlineColor="transparent"
        underlineStyle={0}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={!showPass}
        label={'Password'}
        value={pass}
        onChangeText={setPass}
        right={
          <TextInput.Icon
            icon={showPass ? 'eye-off' : 'eye'}
            onPress={() => setShowPass(!showPass)}
          />
        }
        underlineColor="transparent"
        underlineStyle={0}
      />
      <Button style={styles.button} mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <View style={{flexDirection: 'column'}}>
        <Button onPress={() => navigation.navigate('Signup')}>
          Create account
        </Button>
        <Button onPress={() => navigation.navigate('ForgotPass')}>
          Forgot password
        </Button>
      </View>
    </View>
  );
}
export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#dcdcdc',
    padding: 30,
  },
  headerName: {
    alignSelf: 'center',
    fontSize: 70,
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