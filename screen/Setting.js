import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-paper';
import {logout, useMyContextController} from '../store';

export default function Setting({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  useEffect(() => {
    if (userLogin == null) navigation.navigate('Signin');
  }, [navigation, userLogin]);
  const onSubmit = () => {
    logout(dispatch);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          marginBottom: 0,
          borderRadius: 10,
        }}
      >
        <Icon source="account" size={60} />
        <View style={{ justifyContent: 'center', marginLeft: 10 }}>
          <Text style={{ fontSize: 20, color: '#333' }}>
            User Name: {userLogin !== null && userLogin.fullname}
          </Text>
        </View>
      </View>
      <Button
        style={styles.logoutBtn}
        mode="contained"
        onPress={() => navigation.navigate('ChangePass')}>
        Đổi mât khẩu
      </Button>
      <Button style={styles.logoutBtn} mode="contained" onPress={onSubmit}>
        Đăng xuất
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    margin: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'red',
  },
});