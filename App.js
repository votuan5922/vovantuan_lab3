import React from 'react';
import { PaperProvider } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './routers/MyStack';
import {MyContextControllerProvider} from './store';

const App = () => {
    return (
        <MyContextControllerProvider>
            <PaperProvider>
                <NavigationContainer>
                    <MyStack />
                </NavigationContainer>
            </PaperProvider>
        </MyContextControllerProvider>
    );
};
export default App;