import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, Button, Modal, TextInput, Alert, Pressable, ScrollView, Image} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { styles } from '../Styles/styles';
import { RadioButton } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';




export const Lista = () => {

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
  const [IDEliminar, setIDEliminar] = useState('');
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


  const ConfirmarEliminacion = (ID: string) => {
    Alert.alert(
      'Confirmación de eliminación',
      'Estas Seguro que deseas eliminar este registro',
      [
        { text: 'Eliminar', onPress: () => { Eliminar(ID) } },
        { text: 'Cancelar', onPress: () => console.log('Cancelar presionado') },
      ]
    );
  };

  const showAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => { } }]
    );
  };

  // ================ Metodo para obtener la fecha y formatearla ============
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);

    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    setSelectedDateText(formattedDate);
  };

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

  // =========== metodo para Elimiar el dato de la BD  =============================
  const Eliminar = (ID: string) => {
    setIDEliminar(ID)
    DeleteGestor(ID)
    GetGestor()
    console.log(ID)
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

  // ==================== metodo para refrescar la lista ========
  const handleScroll = () => {
    // Realiza cualquier lógica adicional aquí si es necesario
    GetGestor()
  };

  // ==================== metodo para cargar los datos de la BD a la lista ===================
  const GetGestor = () => {
    //192.168.1.115
    axios.get('https://recordapi.azurewebsites.net/Recordatorio').then(Response => {
      setDatos(Response.data)
    }).catch(err => console.log(err));
  }

  // ==================== metodo para ACTUALIZAR los datos de la BD  ===================
  const UpdateGestor = (
    ID: string,
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
      showAlert('Notificación del sistema', 'Todos los campos son obligatorios');
      return;
    }
    axios.put(`https://recordapi.azurewebsites.net/Recordatorio/${ID}`, {

      CedulaCliente: CedulaCliente,
      NombreCliente: NombreCliente,
      Genero: Genero,
      FechaReservacion: FechaReservacion,
      TipoBisi: TipoBisi,
      Precio: Precio,

    },
      { headers: { 'Content-Type': 'application/json' } })
      .then(Response => {
        limpiarCampos();
        showAlert('Mensaje de Confirmacion', 'Actualizacion del paquete Exitoso');
        GetGestor();
      }).catch(err => console.log(err));

  };
  //--------  Peticion Delete para eliminar los datos de la BD --------
  const DeleteGestor = (ID: string) => {
    axios.delete(`https://recordapi.azurewebsites.net/Recordatorio/${ID}`)
      .then(Res => {
        GetGestor();
        console.log(Res.data)
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    GetGestor()
  }, [])

  const openEditModal = (item: IUser) => {
    setEditData(item);
    setModalVisible(true);

    // Asignar los valores del elemento seleccionado a los campos de entrada
    SetTxtNumId(item.ID.toString()); // Convertir a cadena de texto
    SetTxtCedula(item.CedulaCliente);
    SetTxtNombreCliente(item.NombreCliente);
    SetCheckSexo(item.Genero);
    SetFechaReservacion(item.FechaReservacion);
    SetCheckpaquete(item.TipoBisi);
    SetTxtPrecio(item.Precio);

  };
  return (

    <SafeAreaView style={styles.PanelPrincipal2} >
      <ScrollView onScroll={handleScroll}>
        <FlatList
          data={Datosvalue}
          keyExtractor={(item: IUser) => item.ID}
          renderItem={({ item }) => (
            <View>
              <View
                style={styles.Lista}>
                <Text style={styles.DatosLista}> Pedido #: {item.ID}</Text>
                <Text style={styles.DatosLista}> Cedula: {item.CedulaCliente}</Text>
                <Text style={styles.DatosLista}> Nombre Completo: {item.NombreCliente}</Text>
                <Text style={styles.DatosLista}> Genero: {item.Genero}</Text>
                <Text style={styles.DatosLista}> Fecha: {item.FechaReservacion}</Text>
                <Text style={styles.DatosLista}> Paquete Adquirido: {item.TipoBisi}</Text>
                <Text style={styles.DatosLista}> Precio: {item.Precio}</Text>
                <View style={styles.containerBoton}>
                  <TouchableOpacity onPress={() => openEditModal(item)}>
                    <Image source={require('../Resource/edit_48px.png')} style={styles.SizeImage} />
                    {/* <Text style={styles.ButtonEditar}>Editar</Text> */}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { ConfirmarEliminacion(item.ID) }}>
                    <Image source={require('../Resource/waste_48px.png')} style={styles.SizeImage} />
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          )}
        />
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={true}
        style={styles.Modals}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Aquí puedes diseñar el contenido del modal */}
        {editData && (

          <ScrollView style={styles.modalContainer}>
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

              <View style={styles.panelBtnRadio}>
                <RadioButton.Group onValueChange={newValue => SetCheckSexo(newValue)} value={CheckSexo}>
                  <Text style={styles.Label}>Genero</Text>
                  <View style={styles.radiobuton}>
                    <Text style={styles.Labelradio}>Masculino</Text>
                    <RadioButton color='#fff' value="Masculino" />
                    <Text style={styles.Labelradio}>Femenino</Text>
                    <RadioButton color='#fff' value="Femenino" />
                  </View>

                </RadioButton.Group>
              </View>


              <View style={styles.botonfecha}>
                <Button title="Seleccionar fecha" onPress={showDateTimePicker} />

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


              <Pressable
                onPress={() => {
                  UpdateGestor(
                    txtId,
                    txtCedula,
                    txtNombreCliente,
                    CheckSexo,
                    selectedDateText,
                    Checkpaquete, // Utiliza el valor de Checkpaquete en lugar de TxtTipoBisi
                    TxtPrecio
                  )
                  GetGestor()
                  limpiarCampos()
                  setModalVisible(false)
                }}
              >
                <Image source={require('../Resource/save_close_48px.png')} style={styles.SizeImageSave} />
              </Pressable>
            </View>
            



          </ScrollView>
        )}
      </Modal>

    </SafeAreaView>

  )
}


