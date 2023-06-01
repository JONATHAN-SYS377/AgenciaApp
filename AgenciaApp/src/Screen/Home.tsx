import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { View, Text, Button, Modal, TextInput, Alert, Pressable, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../Styles/styles';
import { FAB } from 'react-native-paper';


interface Props extends StackScreenProps<any, any> { };

export const Home = ({ navigation }: Props) => {

  
  const handleExitApp = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.ContenedorPrincipal}>
      
      <ScrollView >
      
        {/* Primer panel de imagenes */}
        <View style={styles.ContenedorImagen}>
          <Image style={styles.Imagenes} source={require('../Resource/9.jpeg')} />
          <Text style={styles.precio}>$ 450.00</Text>
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
          <Image style={styles.Imagenes} source={require('../Resource/6.jpg')} />
          <Text style={styles.precio}>$ 3,499.00</Text>
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
          <Image style={styles.Imagenes} source={require('../Resource/7.jpg')} />
          <Text style={styles.precio}>$ 5,299.00</Text>
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
          <Image style={styles.Imagenes} source={require('../Resource/8.jpg')} />
          <Text style={styles.precio}>$ 4,999.00</Text>
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
      <FAB
        label={'Adquirir Paquete'}
        style={styles.fab2}
        animated={true}
        color='#FFFFFF'
        
        onPress={() => navigation.navigate('Registros')}
      />
      <FAB
        label={'Mis Paquetes'}
        style={styles.fab1}
        animated={true}
        color='#FFFFFF'
        
        onPress={() => navigation.navigate('Lista')}
      />
      
    </View>


  )
}
