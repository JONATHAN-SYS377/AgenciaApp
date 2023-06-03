import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ImageBackground, Dimensions, Pressable, Alert, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
const { height } = Dimensions.get("window");
import { BackHandler } from 'react-native';
import { Box, Center, FormControl, Heading, Input, Link, VStack, Button, HStack, NativeBaseProvider, Text } from 'native-base';

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
                Alert.alert('Alerta', 'Password Incorrecta o campo vacio');
            }
        } else {
            Alert.alert('Alerta', 'Usuario incorrecto o campo vacio');
        }
    };
    const handleExitApp = () => {
        BackHandler.exitApp();
    };
    return (
        <NativeBaseProvider >
            <ImageBackground style={{ height: '100%' }} source={require("../Resource/14.jpg")} />
            <Center flex={1} position="absolute" top={0} bottom={0} left={0} right={0} w="100%">

                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="2xl" fontWeight="600" color="white" _dark={{
                        color: "white"
                    }}>
                        Bienvenido
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "white"
                    }} color="white" fontWeight="medium" size="md">
                        ¡Inicia sesión para continuar!
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl>
                            <Text fontSize={'lg'} color={'white'} >Email</Text>
                            <Input
                                size="lg"
                                type="text"
                                value={username}
                                onChangeText={setUsername}
                                borderRadius={15}
                                borderWidth={2}
                                color={'white'} />
                        </FormControl>
                        <FormControl>

                            <Text fontSize={'lg'} color={'white'} >Password</Text>
                            <Input
                                size="lg"
                                type="password"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                borderRadius={15}
                                borderWidth={2}
                                color={'white'} />

                            <Link _text={{
                                fontSize: "lg",
                                fontWeight: "500",
                                color: "white"
                            }} alignSelf="flex-end" mt="1">
                                ¿ olvido la Contraseña ?
                            </Link>

                        </FormControl>
                        <Button mt="4" variant="solid" colorScheme="blue"
                            onPress={handleLogin}
                            borderRadius={10}
                            size={'lg'}

                        >
                            Sign in
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="lg" color="white" _dark={{
                                color: "white"
                            }}>
                                Registrarse.{" "}
                            </Text>
                            <Link _text={{
                                color: "white",
                                fontWeight: "medium",
                                fontSize: "md"
                            }} href="Home">
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>

                </Box>
                <Button mt="4" variant="solid" colorScheme="red"
                    onPress={handleExitApp}
                    borderRadius={10}
                    size={'lg'}
                    width={150}

                >
                    Salir    
                </Button>
            </Center>
        </NativeBaseProvider>


        // <View>
        //     <ImageBackground style={{ height: '100%' }} source={require("../Resource/14.jpg")} />
        //     <KeyboardAvoidingView behavior="height" enabled style={styles.container}>
        //         <Text style={styles.label}>Username:</Text>
        //         <TextInput
        //             style={styles.input}
        //             value={username}
        //             onChangeText={setUsername}
        //         />

        //         <Text style={styles.label}>Password:</Text>
        //         <TextInput
        //             style={styles.input}
        //             secureTextEntry
        //             value={password}
        //             onChangeText={setPassword}
        //         />
        //         <Pressable style={styles.BotonLogin} onPress={handleLogin}  >
        //             <Text style={styles.TextBotonLogin}>LOGIN</Text>
        //         </Pressable>
        //         {/* <Button  title="Login" />  */}

        //         <Pressable style={styles.BotonSalir} onPress={handleExitApp}  >
        //             <Text style={styles.TextBotonLogin}>Salir</Text>
        //         </Pressable>


        //     </KeyboardAvoidingView>




        // </View>



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
        top: 150
    },








});

export default LoginScreen;