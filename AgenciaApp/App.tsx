import 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { Navigator } from './src/Navigation/Navigator'
import { styles } from './src/Styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import  LoginScreen from './src/Screen/LoginScreen';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    // Lógica de autenticación aquí (por ejemplo, verificación de credenciales)
    // Si el inicio de sesión es exitoso, actualiza el estado a true
    setIsLoggedIn(true);
  };
  return (
    <NavigationContainer
    theme={DarkTheme}>
      {/* {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        
      )} */}
      <Navigator />
    </NavigationContainer>
  );
}

export default App
