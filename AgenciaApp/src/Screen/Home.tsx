import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
import { Text, Modal, TextInput, Alert, Pressable, Image, ImageBackground } from 'react-native';
import { styles } from '../Styles/styles';
import { FAB } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { NativeBaseProvider, View, ScrollView, Box, Menu, Button } from 'native-base';


interface Props extends StackScreenProps<any, any> { };

export const Home = ({ navigation }: Props) => {
  //============   Variables para el estado del menu ============   
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  //============   metodo para cerrar cesion  ================== 
  const handleCloseSeccion = () => {
    navigation.navigate('LoginScreen');
    toggleMenu();
  };

  //============   Metodo para ocultar y mostara el menu  ==================
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  //============   Metodo para navegar al screen de registros  ==================
  const handleAdquirirPaquete = () => {
    navigation.navigate('Registros');
    toggleMenu();
  };


  //============   Metodo para navegar al screen de Lista  ==================
  const handleMisPaquetes = () => {
    navigation.navigate('Lista');
    toggleMenu();
  };

  return (
    <NativeBaseProvider>
      <View style={styles.menu}>
        {isMenuVisible ? (
          <View style={styles.menuBoton} >
            <Button onPress={toggleMenu} variant="ghost">
              <Image style={{ width: 30, height: 30 }}  source={require('../Resource/menu.png')} />
            </Button>
            <Button marginBottom={1} marginTop={1} variant="solid" colorScheme={'primary'} onPress={handleAdquirirPaquete}>
              Adquirir Paquete
            </Button>
            <Button onPress={handleMisPaquetes} marginBottom={1}  variant="solid" colorScheme={'primary'}>
              Mis Paquetes
            </Button>
            <Button onPress={handleCloseSeccion} marginBottom={3}  variant="solid" colorScheme={'primary'}>
              Cerrar Secion
            </Button>
          </View>
        ) : (
          <Button onPress={toggleMenu} style={styles.boton} variant="ghost">
            <Image style={{ width: 30, height: 30 }} source={require('../Resource/menu.png')} />
          </Button>
        )}
      </View>
      <View backgroundColor={'#84776F'} height={'auto'} paddingBottom={10}>

        <ImageBackground style={{ width: '100%', height: '100%' }} source={require("../Resource/20.png")} />


        <ScrollView flex={1} position="absolute" top={0} bottom={0} left={0} right={0} w="100%" h={"100%"} padding={2}>
          {/* Primer panel de imagenes */}
          <View style={styles.ContenedorImagen}>
            <Animatable.Image
              animation="pulse"
              iterationCount="infinite"
              easing="ease-out"
              style={styles.Imagenes} source={require('../Resource/9.jpeg')} />
            <Animatable.Text
              //animation="fadeIn"
              animation="pulse"
              iterationCount="infinite"
              easing="ease-out"
              style={styles.precio}>
              $ 450.00
            </Animatable.Text>
            <View style={styles.ViewTitulo}>
              <Text style={styles.TituloImagen}>
                La Ruta de Conquistadores
              </Text>
            </View>
            <View style={styles.TituloImagen}>
              <Text style={styles.TextoImagen}>
                Fecha: jueves 30 noviembre 2023, La edición La Ruta de Conquistadores 2023 se disputará el con salida en Siquirres, cantón Siquirres, Limón.
              </Text>
            </View>
          </View>

          {/* Segundo panel de imagenes */}
          <View style={styles.ContenedorImagen}>
            <Animatable.Image
              animation="pulse"
              iterationCount="infinite"
              easing="ease-out"
              style={styles.Imagenes} source={require('../Resource/6.jpg')} />
            <Animatable.Text
              //animation="fadeIn"
              animation="pulse"
              iterationCount="infinite"
              easing="ease-out"
              style={styles.precio}>
              $ 3,499.00
            </Animatable.Text>
            <View style={styles.ViewTitulo}>
              <Text style={styles.TituloImagen}>
                Alpen Tour Trophy 2023
              </Text>
            </View>
            <View >
              <Text style={styles.TextoImagen}>
                Nueva Fecha: 18 al 26 de junio 2023
                Te presentamos una nueva oportunidad para viajar a Europa y cumplir el sueño de competir en un evento UCI de la categoría </Text>
            </View>
          </View>

          {/* Tercer panel de imagenes */}
          <View style={styles.ContenedorImagen}>
            <Animatable.Image
              animation="pulse"
              iterationCount="infinite"
              easing="ease-out"
              style={styles.Imagenes} source={require('../Resource/7.jpg')} />
            <Animatable.Text
              style={styles.precio}
              //animation="fadeIn"
              animation="pulse"
              iterationCount="infinite"
              easing="ease-out">
              $ 5,299.00
            </Animatable.Text>
            <View style={styles.ViewTitulo}>
              <Text style={styles.TituloImagen}>
                Bike TransAlp 2023
              </Text>
            </View>
            <View >
              <Text style={styles.TextoImagen}>
                Del 05 al 16 de julio
                El Bike TransAlp es una competencia de MTB en parejas (o individual a partir del 2019) que consiste en siete etapas en el continente
              </Text>
            </View>
          </View>

          {/* Cuarto panel de imagenes */}
          <View style={styles.ContenedorImagen}>
            <Animatable.Image
              animation="pulse"
              iterationCount="infinite"
              easing="ease-out"
              style={styles.Imagenes} source={require('../Resource/8.jpg')} />
            <Animatable.Text
              style={styles.precio}
              //animation="fadeIn"
              animation="pulse"
              iterationCount="infinite"
              easing="ease-out">
              $ 4,999.00
            </Animatable.Text>
            <View style={styles.ViewTitulo}>
              <Text style={styles.TituloImagen}>
                Camino de Santiago España (Otoño 2023)
              </Text>
            </View>
            <View style={styles.TituloImagen}>
              <Text style={styles.TextoImagen}>
                Fecha: Otoño. Del 18 de setiembre al 04 de octubre 2023
                Esta será la décima edición de nuestro viaje hasta España para realizar esta maravillosa peregrinación.
              </Text>
            </View>
          </View>

        </ScrollView>



      </View>
    </NativeBaseProvider>
  )
}
