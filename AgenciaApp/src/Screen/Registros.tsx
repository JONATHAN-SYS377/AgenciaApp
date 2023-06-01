import React, { useEffect } from 'react'
import { View, Text, Button, TextInput, Alert, Image, TouchableOpacity, } from 'react-native';
import { styles } from '../Styles/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const Registros = () => {

  interface IUser {
    ID: string;
    CedulaCliente: string;
    NombreCliente: string;
    Genero: string;
    FechaReservacion: string;
    TipoBisi: string;
    Precio: string;
  }
  const navigation = useNavigation();
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
    SetTxtCedula(text);
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
      [{ text: 'OK', onPress: () => {} }]
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
  ) => {
    // Validar que todos los campos no estén vacíos
    if (
      CedulaCliente.trim() === '' ||
      NombreCliente.trim() === '' ||
      Genero.trim() === '' ||
      FechaReservacion.trim() === '' ||
      TipoBisi.trim() === '' ||
      Precio.trim() === ''
    ) {
      showAlert('Notificación del sistema','Todos los campos son obligatorios');
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
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(Response => {
        console.log(Response.data);
        limpiarCampos();
        showAlert('Mensaje de Confirmacion','La compra de su pauqete fue existosa');
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

    < ScrollView style={styles.PanelPrincipalRegistro}>
      {/* <ImageBackground style={{ flex: 1,
        padding: 5,
        width: '95%',
        }} source={require("../Resource/11.jpg")} /> */}

      <View style={styles.ContenedorInput}>

        <Text style={styles.Label}>Numero de Cedula</Text>
        <TextInput
          value={txtCedula}
          onChangeText={Cedula}
          style={styles.TextBox}
          inputMode='text'
        >
        </TextInput>

        <Text style={styles.Label}>Nombre Completo</Text>
        <TextInput
          value={txtNombreCliente}
          onChangeText={NombreCompleto}
          style={styles.TextBox}
          inputMode='text'
        >
        </TextInput>

        <View style= {styles.panelBtnRadio}>
        <RadioButton.Group onValueChange={newValue => SetCheckSexo(newValue)} value={CheckSexo}>
          <Text style={styles.Label}>Genero</Text>
          <View style={styles.radiobuton}>
            <Text style={styles.Labelradio}>Masculino</Text>
            <RadioButton color='#fff' value="Masculino" />
            <Text style={styles.Labelradio}>Femenino</Text>
            <RadioButton  color='#fff' value="Femenino" />
          </View>

        </RadioButton.Group>
        </View>


        <View style={styles.botonfecha}>
          <Button  title="Seleccionar fecha" onPress={showDateTimePicker} />

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <TextInput
          style={styles.TextBox}
          value={selectedDateText}
          onChangeText={(text) => setSelectedDateText(text)}
          inputMode='text'
          id='Lanzamiento'
          editable={false}
        />




        <RadioButton.Group onValueChange={handlePaqueteChange} value={Checkpaquete}>
          <Text style={styles.Label}>Seleccione el paquete</Text>
          <View style={styles.radiobuton2}>
            <RadioButton.Item label="La Ruta de Conquistadores" value="La Ruta de Conquistadores" />
            <RadioButton.Item label="Alpen Tour Trophy 2023" value="Alpen Tour Trophy 2023" />
            <RadioButton.Item label="Bike TransAlp 2023" value="Bike TransAlp 2023" />
            <RadioButton.Item label="Camino de Santiago España" value="Camino de Santiago España" />
          </View>

        </RadioButton.Group>

        <Text style={styles.Label}>Precio</Text>
        <TextInput
          style={styles.TextBox}
          value={TxtPrecio}
          onChangeText={SetTxtPrecio}
          inputMode='text'
          id='Desarrollador'

        >
        </TextInput>


        <TouchableOpacity
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
        </TouchableOpacity>
      </View>

    </ScrollView>


  )
}
