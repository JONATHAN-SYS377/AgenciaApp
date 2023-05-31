import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { View, Text, Button, Modal, TextInput, Alert, Pressable, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../Styles/styles';

interface Props extends StackScreenProps<any, any> { };

export const Home = ({ navigation }: Props) => {

  return (
    <ScrollView style={styles.ContenedorPrincipal}>
      <View style={styles.ContenedorImagen}>
        <Image style={styles.Imagenes} source={require('../Resource/descarga.jpeg')} />
      </View>

      <View style={styles.ContenedorImagen}>
        <Image style={styles.Imagenes} source={require('../Resource/2.jpeg')} />
      </View>
      <View style={styles.ContenedorImagen}>
        <Image style={styles.Imagenes} source={require('../Resource/3.jpeg')} />
      </View>
      <View style={styles.ContenedorImagen}>
        <Image style={styles.Imagenes} source={require('../Resource/4.jpeg')} />
      </View>
      <View style={styles.ContenedorImagen}>
        <Image style={styles.Imagenes} source={require('../Resource/5.jpeg')} />
      </View>
    </ScrollView>
  )
}
