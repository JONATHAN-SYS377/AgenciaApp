import React, { useEffect } from 'react'
import { TextInput, Alert, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from '../Styles/styles';
//import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { NativeBaseProvider, View, Button, Input, Modal, Text, SearchIcon, FormControl, ScrollView, Radio, AspectRatio, Container, Stack, Icon } from 'native-base';

interface Props extends StackScreenProps<any, any> { };
export const Registros = ({ navigation }: Props) => {

  interface IUser {
    ID: string;
    CedulaCliente: string;
    NombreCliente: string;
    Genero: string;
    FechaReservacion: string;
    TipoBisi: string;
    Precio: string;
    Tarjeta: string;
    CVC: string;
  }
  // const navigation = useNavigation();
  const [txtId, SetTxtNumId] = useState('');
  const [txtCedula, SetTxtCedula] = useState('');
  const [txtNombreCliente, SetTxtNombreCliente] = useState('');
  const [CheckSexo, SetCheckSexo] = React.useState('');
  const [TxtFechaReservacion, SetFechaReservacion] = useState('');
  const [TxtTipoBisi, SetTipoBisi] = useState('');
  const [Checkpaquete, SetCheckpaquete] = React.useState('');
  const [TxtPrecio, SetTxtPrecio] = useState('');
  const [Datosvalue, setDatos] = useState<IUser[]>();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateText, setSelectedDateText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState<IUser | null>(null);
  const [TxtTarjeta, setTxtTarjeta] = useState('');
  const [TxtCVC, setTxtCVC] = useState('');



  // =========== Metodo para asignar el valod de paquete al txt precio====================
  const handlePaqueteChange = (value: string) => {
    SetCheckpaquete(value);

    // Asignar valor al campo TxtPrecio según la selección
    let precio = '';
    let paquete = '';
    if (value === 'La Ruta de Conquistadores') {
      precio = '450';
      paquete = 'La Ruta de Conquistadores';
    } else if (value === 'Alpen Tour Trophy 2023') {
      precio = '3 999';
      paquete = 'La Alpen Tour Trophy 2023';
    } else if (value === 'Bike TransAlp 2023') {
      precio = '5 209';
      paquete = 'Bike TransAlp 2023';
    } else if (value === 'Camino de Santiago España') {
      precio = '4 999';
      paquete = 'Camino de Santiago España';
    }
    SetTxtPrecio(precio);
    SetTipoBisi(paquete);
    console.log(TxtTipoBisi,
      TxtPrecio)

  };



  // ================ Metodo asignar los valores de los txt =====================
  const NumId = (text: string) => {
    SetTxtNumId(text);
  }

  const Cedula = (text: string) => {
    const numberRegex = /^[0-9]*$/
    if (numberRegex.test(text)) {
      SetTxtCedula(text);
    }

  }

  const NombreCompleto = (text: string) => {

    SetTxtNombreCliente(text);


  }

  const FechaReservacion = (text: string) => {
    SetFechaReservacion(text);
  }

  const TipoBisi = (text: string) => {
    SetTipoBisi(text);
  }

  const Precioo = (text: string) => {
    SetTxtPrecio(text);
  }
  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  // Limitar la longitud a 16 caracteres
  const Tarjeta = (text: string) => {
    const numberRegex = /^[0-9]*$/
    if (numberRegex.test(text)) {
      setTxtTarjeta(text);
    }
    if (text.length === 16) {
      setTxtTarjeta(text);
    }
  };

  // Limitar la longitud a 3 caracteres
  const CVC = (text: string) => {
    const numberRegex = /^[0-9]*$/
    if (numberRegex.test(text)) {
      setTxtCVC(text);
    }
    if (text.length === 3) {
      setTxtCVC(text);
    }
  };

  // ================ Metodo para obtener la fecha y formatearla ============
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);

    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    setSelectedDateText(formattedDate);
  };

  // ============================metodo para limpiar los campos ========
  const limpiarCampos = () => {
    SetTxtNumId('');
    SetTxtCedula('');
    setSelectedDateText('');
    SetTxtNombreCliente('');
    SetFechaReservacion('');
    SetTipoBisi('');
    SetTxtPrecio('');
    SetCheckpaquete('');
  };



  // ================ Alerta de nuevo registro =========================
  const showAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => { } }]
    );
  };


  // ============ Metodo para guardar en la base de datos=================
  const CreateGestor = async (
    CedulaCliente: string,
    NombreCliente: string,
    Genero: string,
    FechaReservacion: string,
    TipoBisi: string,
    Precio: string,
    Tarjeta: string,
    CVC: string,
  ) => {
    // Validar que todos los campos no estén vacíos
    if (
      CedulaCliente.trim() === '' ||
      NombreCliente.trim() === '' ||
      Genero.trim() === '' ||
      FechaReservacion.trim() === '' ||
      TipoBisi.trim() === '' ||
      Precio.trim() === '' ||
      Tarjeta.trim() === '' ||
      CVC.trim() === ''
    ) {
      showAlert('Notificación del sistema', 'Todos los campos son obligatorios');
      return;
    }

    axios
      .post(
        'https://recordapi.azurewebsites.net/Recordatorio',
        {
          CedulaCliente: CedulaCliente,
          NombreCliente: NombreCliente,
          Genero: Genero,
          FechaReservacion: FechaReservacion,
          TipoBisi: TipoBisi,
          Precio: Precio,
          Tarjeta: Tarjeta,
          CVC: CVC,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(Response => {
        console.log(Response.data);
        limpiarCampos();
        showAlert('Mensaje de Confirmacion', 'La compra de su paquete fue existosa');
        GetGestor();
        navigation.navigate('Home');
      })
      .catch(err => console.log(err));
  };



  // ============ Peticion a la API para obtener los datos de la BD=================
  const GetGestor = () => {
    //192.168.1.115
    axios.get('https://recordapi.azurewebsites.net/Recordatorio').then(Response => {
      setDatos(Response.data)
    }).catch(err => console.log(err));
  }

  // ============ Activacion de la peticion a la API =================
  useEffect(() => {
    GetGestor()
  }, [])



  return (

    <NativeBaseProvider >
      <View backgroundColor={'#84776F'} width={'100%'}>
        <ImageBackground style={{ width: '100%', height: '100%' }} source={require("../Resource/20.png")} />
        < ScrollView flex={1} position="absolute" top={0} bottom={0} left={0} right={0} w="100%">
          <View style={styles.ContenedorInput}>

            <FormControl isRequired>
              <Text color={'white'} fontSize={'lg'} marginBottom={1} marginTop={3}>Numero de Cedula *</Text>
              <Input variant="underlined"
                value={txtCedula}
                onChangeText={Cedula}
                color={'white'}
                //style={styles.TextBox}
                //inputMode='numeric'
                keyboardType="numeric"
                size="xl"
              />
            </FormControl>

            <FormControl isRequired>
            <Text color={'white'} fontSize={'lg'} marginBottom={1} marginTop={3}>Numero de Cedula *</Text>
              <Input variant="underlined"
                value={txtNombreCliente}
                onChangeText={NombreCompleto}
                color={'white'}
                inputMode='text'
                size='xl'
              />
            </FormControl>

            <FormControl isRequired>
              <Text color={'white'} fontSize={'lg'} marginBottom={1} marginTop={3}>Genero *</Text>
              <RadioButton.Group onValueChange={newValue => SetCheckSexo(newValue)} value={CheckSexo}>
                {/* <Text style={styles.Label}>Genero</Text> */}
                <View style={styles.radiobuton}>
                  <Text color={'white'} fontSize={'md'} style={styles.Labelradio2}>Masculino</Text>
                  <RadioButton color='#34FF01' value="Masculino" />
                  <Text color={'white'} fontSize={'md'} style={styles.Labelradio2}>Femenino</Text>
                  <RadioButton color='#34FF01' value="Femenino" />
                </View>

              </RadioButton.Group>
            </FormControl>

            <FormControl isRequired>

              <Button size="md" width={200} marginBottom={3} variant="subtle" onPress={showDateTimePicker}>
                Seleccionar fecha *
              </Button>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="datetime"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              <Input variant="underlined"
                //style={styles.TextBox}
                value={selectedDateText}
                onChangeText={(text) => setSelectedDateText(text)}
                inputMode='text'
                id='Lanzamiento'
                editable={false}
                size='xl'
                color={'white'}
              />

            </FormControl>

            <FormControl isRequired>

              <Radio.Group name="myRadioGroup" onChange={handlePaqueteChange} value={Checkpaquete}>

                <Text color={'white'} marginBottom={3} marginTop={3} fontSize={'lg'}>Seleccione el paquete que desea adquirir *</Text>
                <View style={styles.radiobuton2}>


                  <Radio marginBottom={1} color={'amber.100'} size="lg" colorScheme="emerald" value="La Ruta de Conquistadores" >
                    <Text color={'white'} fontSize={'lg'} >
                      La Ruta de Conquistadores
                    </Text>
                  </Radio>
                  <Radio marginBottom={1} size="lg" colorScheme="emerald" value="Alpen Tour Trophy 2023" >

                    <Text color={'white'} fontSize={'lg'} >
                      Alpen Tour Trophy 2023
                    </Text>
                  </Radio>
                  <Radio marginBottom={1} size="lg" colorScheme="emerald" value="Bike TransAlp 2023" >

                    <Text color={'white'} fontSize={'lg'} >
                      Bike TransAlp 2023
                    </Text>
                  </Radio>
                  <Radio marginBottom={1} size="lg" colorScheme="emerald" value="Camino de Santiago España" >

                    <Text color={'white'} fontSize={'lg'} >
                      Camino de Santiago España
                    </Text>
                  </Radio>
                </View>

              </Radio.Group>
            </FormControl>

            <FormControl isRequired>

              <Text color={'white'} fontSize={'lg'} marginBottom={1} marginTop={3} >Precio del paquete seleccionado *</Text>

              <Input variant="underlined"
                //style={styles.TextBox}
                value={TxtPrecio}
                onChangeText={SetTxtPrecio}
                inputMode='numeric'
                id='Desarrollador'
                size='xl'
                color={'white'}

              />
            </FormControl>

            <FormControl isRequired>

              <Text color={'white'} fontSize={'lg'} marginBottom={1} marginTop={3} >Ingrese los numeros de su tarjeta *</Text>

              <Input variant="underlined"
                //style={styles.TextBox}
                value={TxtTarjeta}
                onChangeText={setTxtTarjeta}
                inputMode='numeric'
                id='Desarrollador'
                size='xl'
                maxLength={16}
                color={'white'}

              />
            </FormControl>

            <FormControl>

              <Text color={'white'} fontSize={'lg'} marginBottom={1} marginTop={3}>CVC *</Text>

              <Input variant="underlined"
                //style={styles.TextBox}
                value={TxtCVC}
                onChangeText={setTxtCVC}
                inputMode='numeric'
                id='Desarrollador'
                size='xl'
                maxLength={3}
                color={'white'}

              />
            </FormControl>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}  >
              <Button size="md" variant="solid" width={150} marginRight={5} onPress={() => navigation.navigate('Home')}>
                Cancelar
              </Button>
              <Button variant="subtle" size="md" width={150} marginLeft={5}
                onPress={() =>
                  CreateGestor(
                    txtCedula,
                    txtNombreCliente,
                    CheckSexo,
                    selectedDateText,
                    Checkpaquete, // Utiliza el valor de Checkpaquete en lugar de TxtTipoBisi
                    TxtPrecio,
                    TxtTarjeta,
                    TxtCVC,
                  )
                } >
                Comprar
              </Button>
            </View>

            {/* <TouchableOpacity
              onPress={() =>
                CreateGestor(
                  txtCedula,
                  txtNombreCliente,
                  CheckSexo,
                  selectedDateText,
                  Checkpaquete, // Utiliza el valor de Checkpaquete en lugar de TxtTipoBisi
                  TxtPrecio
                )
              }
            >
              <Image source={require('../Resource/buy_48px.png')} style={styles.SizeImageSave} />
            </TouchableOpacity>*/}
          </View>
        </ScrollView>
      </View>
    </NativeBaseProvider>



  )
}
