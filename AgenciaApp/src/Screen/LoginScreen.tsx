import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Dimensions, Pressable, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
const { height } = Dimensions.get("window");
import { BackHandler } from 'react-native';

interface LoginScreenProps {
    onLogin: () => void;
}
interface Props extends StackScreenProps<any, any> { };

export const LoginScreen = ({ navigation }: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = () => {


        if (username === 'Admin') {

            if (password === 'Admin123@') {
                setUsername('');
                setPassword('');
                navigation.navigate('Home');

            } else {
                Alert.alert('Error', 'wrong or empty password');
            }
        } else {
            Alert.alert('Error', 'wrong or empty username');
        }
    };
    const handleExitApp = () => {
        BackHandler.exitApp();
    };
    return (


        <View>
            <ImageBackground style={{ height: '100%' }} source={require("../Resource/14.jpg")} />
            <KeyboardAvoidingView behavior="height" enabled style={styles.container}>
                <Text style={styles.label}>Username:</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />

                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Pressable style={styles.BotonLogin} onPress={handleLogin}  >
                    <Text style={styles.TextBotonLogin}>LOGIN</Text>
                </Pressable>
                {/* <Button  title="Login" />  */}

                <Pressable style={styles.BotonSalir} onPress={handleExitApp}  >
                    <Text style={styles.TextBotonLogin}>Salir</Text>
                </Pressable>


            </KeyboardAvoidingView>




        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 230,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    label: {
        fontSize: 25,
        marginBottom: 8,
        color: '#ffffff',
        fontWeight: '600',

    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 12,
        paddingHorizontal: 7,
        color: '#fff',
        fontSize: 30,
        marginLeft: 10,
        textAlign: 'left',
    },
    BotonLogin: {
        backgroundColor: '#6750A4',
        height: 50,
        width: 130,
        borderRadius: 20,
        justifyContent: 'center', // Centra verticalmente el contenido
    },

    TextBotonLogin: {
        textAlign: 'center', // Centra horizontalmente el texto
        color: '#fff',
        fontSize: 16,
    },
    BotonSalir: {
        backgroundColor: '#C50F1F',
        height: 60,
        width: 150,
        borderRadius: 20,
        justifyContent: 'center', // Centra verticalmente el contenido
        top:150
    },








});

export default LoginScreen;