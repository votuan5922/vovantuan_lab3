import {Alert, StyleSheet, View} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import React from 'react';
import '@react-native-firebase/app';
import {signup} from '../store';

function Signup({navigation}) {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleCreateAccount = () => {
    const role = 'customer';
    signup(email, pass, fullname, phone, role);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerName}>Signup</Text>
      <TextInput
        style={styles.textInput}
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        underlineColor="transparent"
        underlineStyle={0}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={!showPassword}
        label={'Password'}
        value={pass}
        onChangeText={setPass}
        underlineColor="transparent"
        underlineStyle={0}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <TextInput
        style={styles.textInput}
        label={'Full Name'}
        value={fullname}
        onChangeText={setFullname}
        underlineColor="transparent"
        underlineStyle={0}
      />
      <TextInput
        style={styles.textInput}
        label={'Phone'}
        value={phone}
        onChangeText={setPhone}
        underlineColor="transparent"
        underlineStyle={0}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleCreateAccount}>
        Create account
      </Button>
      <View style={{flexDirection: 'row'}}>
        <Button onPress={() => navigation.navigate('Signin')}>
          Login account
        </Button>
      </View>
    </View>
  );
}
export default Signup;

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