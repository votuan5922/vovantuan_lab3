import {createContext, useContext, useMemo, useReducer} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

const MyContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN': {
      return {...state, userLogin: action.value};
    }
    case 'USER_LOGOUT': {
      return {...state, userLogin: null};
    }
    case 'FETCH_JOB': {
      return {...state, job: action.value};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const MyContextControllerProvider = ({children}) => {
  const initialState = {
    userLogin: null,
    job: [],
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

const useMyContextController = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      'useMyContextController should be used inside the MyContextControllerProvider',
    );
  }
  return context;
};

const USERS = firestore().collection('USERS');
const JOBS = firestore().collection('JOBS');

const signup = (email, password, fullname, phone, role) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert('Create account success with ' + email);
      USERS.doc(email).set({
        email,
        password,
        fullname,
        phone,
        role,
      });
    })
    .catch(e => console.log(e.message));
};

const login = (dispatch, email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      USERS.doc(email).onSnapshot(u => {
        if (u.exists) {
          Alert.alert('Login success with ' + u.id);
          dispatch({type: 'USER_LOGIN', value: u.data()});
        }
      });
    })
    .catch(e => Alert.alert('Wrong email or password'));
};
const logout = dispatch => {
  auth()
    .signOut()
    .then(() => dispatch({type: 'USER_LOGOUT'}));
};

const addJod = (jobId, newJob) => {
  JOBS.add({idJob: jobId, title: newJob})
    .then(() => console.log('add new job'))
    .catch(e => console.log(e.message));
};

export {
  MyContextControllerProvider,
  useMyContextController,
  login,
  logout,
  signup,
  addJod,
};