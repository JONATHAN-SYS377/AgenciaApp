import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button as ButtonNative, TextInput, Pressable, Alert, ScrollView, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { styles } from '../Styles/styles';
import { RadioButton } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { View, NativeBaseProvider, Button, Input, Modal, Text, Icon, SearchIcon, FormControl, Radio, } from 'native-base';
import * as Animatable from 'react-native-animatable';


interface Props extends StackScreenProps<any, any> { };
export const Lista = ({ navigation }: Props) => {

  //============   Creacion de la interface para almacenar datos ============   
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

  //============   Todas las constances que utilzare para la APP =============
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
  const [Size, setSize] = React.useState('xl')
  const [TxtTarjeta, SetTxtTarjeta] = useState('');
  const [TxtCVC, SetTxtCVC] = useState('');

  //============   metodo para el tamaño del modal =================
  const handleSizeClick = (newSize: React.SetStateAction<string>) => {
    setSize(newSize);
    setModalVisible(!modalVisible);
  };


  // ================ Metodo asignar los valores de los txt =====================
  const NumId = (text: string) => {
    SetTxtNumId(text);
  }

  //============   metodo para validar los datos que se ingresan en la cedula =================
  const Cedula = (text: string) => {
    const numberRegex = /^[0-9]*$/
    if (numberRegex.test(text)) {
      SetTxtCedula(text);
    }

  }

  //============   metodo para capturar  los datos de nombre =================
  const NombreCompleto = (text: string) => {
    SetTxtNombreCliente(text);
  }

  //============   metodo para capturar el precio del paquete ==================
  const Precioo = (text: string) => {
    SetTxtPrecio(text);
  };

  //============   metodo para mostrar el DateTimePicker =================================
  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  //============  Limitar la longitud a 16 caracteres ============ 
  const Tarjeta = (text: string) => {
    const numberRegex = /^[0-9]*$/
    if (numberRegex.test(text)) {
      SetTxtTarjeta(text);
    }
    if (text.length === 16) {
      SetTxtTarjeta(text);
    }
  };

  // Limitar la longitud a 3 caracteres
  const CVC = (text: string) => {
    const numberRegex = /^[0-9]*$/
    if (numberRegex.test(text)) {
      SetTxtCVC(text);
    }
    if (text.length === 3) {
      SetTxtCVC(text);
    }
  };

  //============   alerta para confirmar la eliminacion de un registro
  const ConfirmarEliminacion = (ID: string) => {
    Alert.alert(
      'Confirmación de eliminación',
      'Estas Seguro que deseas Cancelar el paquete que compraste',
      [
        { text: 'Eliminar', onPress: () => { Eliminar(ID) } },
        { text: 'Cancelar', onPress: () => console.log('Cancelar presionado') },
      ]
    );
  };

  //============   Alert personalizado para mostrar mensajes ==================
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
  const handlePaqueteChange = (newValue: string) => {
    SetCheckpaquete(newValue);
    const selectedPackage = Packages.find((item) => item.value === newValue);
    if (selectedPackage) {
      const packagePrice = Number(selectedPackage.price.replace(/\s/g, '')); // Eliminar espacios en blanco
      const storedPrice = Number(editData?.Precio.replace(/\s/g, '')); // Eliminar espacios en blanco

      if (packagePrice === storedPrice) {
        Alert.alert(
          'Cambio de paquete',
          'Ya tienes seleccionado ese paquete.',
          [
            { text: 'Aceptar', style: 'cancel' }
          ]
        );
      }
      else {
        console.log('no entro a las condicionales');
        SetTxtPrecio(selectedPackage.price);
      }

      if (packagePrice > storedPrice) {
        const difference = packagePrice - storedPrice;
        Alert.alert(
          'Cambio de paquete',
          `Para cambiar de paquete debes pagar una diferencia de $ ${difference} más.`,
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Aceptar', onPress: () => SetTxtPrecio(selectedPackage.price) }

          ]
        );
      }
      if (packagePrice < storedPrice) {
        const difference = storedPrice - packagePrice;
        Alert.alert(
          'Cambio de paquete',
          `Se te reembolsará $ ${difference} como diferencia de precio. Precio del nuevo paquete: $ ${selectedPackage.price}`,
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Aceptar', onPress: () => SetTxtPrecio(selectedPackage.price) }

          ]
        );

      }

    }
  };

  //============   Lista de paquetes =================================
  const Packages = [
    { label: 'La Ruta de Conquistadores', value: 'La Ruta de Conquistadores', price: '450' },
    { label: 'Alpen Tour Trophy 2023', value: 'Alpen Tour Trophy 2023', price: '3 999' },
    { label: 'Bike TransAlp 2023', value: 'Bike TransAlp 2023', price: '5 209' },
    { label: 'Camino de Santiago España', value: 'Camino de Santiago España', price: '4 299' }
  ];

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
    SetTxtTarjeta(''),
      SetTxtCVC('');
  };

  // ==================== metodo para refrescar la lista ========
  const handleScroll = () => {
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
    Tarjeta: string,
    CVC: string,
  ) => {
    // Validar que todos los campos no estén vacíos y que cumplan con la longitud corresta de la tarjeta y cvc
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
      
    } else if (Tarjeta.length < 16) {
      showAlert('Notificacion del sistema', 'Longitud de tarjeta incorrecta');
    }else if (CVC.length < 3) {
      showAlert('Notificacion del sistema', 'Longitud de codigo de seguridad incorrecto');
    }
    else {
      axios.put(`https://recordapi.azurewebsites.net/Recordatorio/${ID}`, {

        CedulaCliente: CedulaCliente,
        NombreCliente: NombreCliente,
        Genero: Genero,
        FechaReservacion: FechaReservacion,
        TipoBisi: TipoBisi,
        Precio: Precio,
        Tarjeta: '',
        CVC: '',

      },
        { headers: { 'Content-Type': 'application/json' } })
        .then(Response => {
          setModalVisible(false)
          showAlert('Mensaje de Confirmacion', 'Actualizacion del paquete Exitoso');
          GetGestor()
          limpiarCampos()


        }).catch(err => console.log(err));
    }


  };
  //--------  Peticion Delete para eliminar los datos de la BD mediante al ID --------
  const DeleteGestor = (ID: string) => {
    showAlert('Notificacion de Reembolso',`Se te reembolsará en un lapso de 2 Dias maximo la cantidad de $ ${editData?.Precio} por motivo de la cancelación`)
    
    axios.delete(`https://recordapi.azurewebsites.net/Recordatorio/${ID}`)
      .then(Res => {
        
        
        GetGestor();
        handleirHome();
        console.log(Res.data)
      }).catch(err => console.log(err))
  }

  //========== Inicializacion de la peticion GET ==============================
  useEffect(() => {
    GetGestor()
  }, [])


  //========== Metodo para abrir el modal pasando por parametro el ID del paquete para actualizarlo 
  const openEditModal = (item: IUser) => {
    setEditData(item);
    setModalVisible(true);

    // Asignar los valores del elemento seleccionado a los campos de entrada
    SetTxtNumId(item.ID.toString()); // Convertir a cadena de texto
    SetTxtCedula(item.CedulaCliente);
    SetTxtNombreCliente(item.NombreCliente);
    SetCheckSexo(item.Genero);
    setSelectedDateText(item.FechaReservacion);
    SetCheckpaquete(item.TipoBisi);
    SetTxtPrecio(item.Precio);

  };

  //========== Metodo para ir al Screen Home =================================
  const handleirHome = () => {
    navigation.navigate('Home');
  };

  return (

    <NativeBaseProvider>
      <View style={styles.menu2}>
        <Button onPress={handleirHome} marginBottom={3} variant="solid" colorScheme={'primary'}>
          ir a Home
        </Button>

      </View>
      <View backgroundColor={'#84776F'} height={'auto'} paddingBottom={10}>


        <ImageBackground style={{ width: '100%', height: '100%' }} source={require("../Resource/20.png")} />

        <View flex={1} position="absolute" top={0} bottom={0} left={0} right={0} w="100%" h={"100%"} padding={2}>

          <FlatList
            data={Datosvalue}
            renderItem={({ item }) => (
              <View style={styles.Lista}>
                <Text color={'black'} style={styles.DatosLista}>Pedido # {item.ID}</Text>
                <Text color={'black'} style={styles.DatosLista}>Cedula: {item.CedulaCliente}</Text>
                <Text color={'black'} style={styles.DatosLista}>Nombre Completo:  {item.NombreCliente}</Text>
                <Text color={'black'} style={styles.DatosLista}>Genero: {item.Genero}</Text>
                <Text color={'black'} style={styles.DatosLista}>Fecha: {item.FechaReservacion}</Text>
                <Text color={'black'} style={styles.DatosLista}>Paquete Adquirido: {item.TipoBisi}</Text>
                <Text color={'black'} style={styles.DatosLista}>Precio: ${item.Precio}</Text>
                {/* <Text color={'black'} style={styles.DatosLista}>Tarjeta #: {item.Tarjeta}</Text>
                <Text color={'black'} style={styles.DatosLista}>CVC: {item.CVC}</Text> */}
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
            )}
            keyExtractor={(item) => item.ID}
          />



          <Modal
            isOpen={modalVisible}
            _backdrop={{
              _dark: { bg: "coolGray.800" },
              bg: "warmGray.50"
            }}
            onClose={() => setModalVisible(false)}
            size={Size}
          >
            {editData && (
              <Modal.Content>
                <Modal.CloseButton />

                <Modal.Header>Actualizar Datos</Modal.Header>

                <Modal.Body>

                  <FormControl>
                    <Text color={'black'} fontSize={'lg'} marginBottom={1} marginTop={3}>Numero de Cedula *</Text>
                    <Input variant="underlined"
                      value={txtCedula}
                      onChangeText={Cedula}
                      color={'black'}
                      //style={styles.TextBox}
                      inputMode='numeric'
                      size="xl"
                    />
                  </FormControl>

                  <FormControl>
                    <Text color={'black'} fontSize={'lg'} marginBottom={1} marginTop={3}>Numero de Cedula *</Text>
                    <Input variant="underlined"
                      value={txtNombreCliente}
                      onChangeText={NombreCompleto}

                      inputMode='text'
                      size='xl'
                    />
                  </FormControl>

                  <FormControl>
                    <Text color={'black'} fontSize={'lg'} marginBottom={1} marginTop={3}>Genero *</Text>
                    <Radio.Group name="myRadioGroup" onChange={newValue => SetCheckSexo(newValue)} value={CheckSexo}>
                      {/* <Text style={styles.Label}>Genero</Text> */}
                      <View style={styles.radiobuton}>
                        <Radio value="Masculino" marginBottom={1} marginLeft={3} color={'amber.100'} size="lg" colorScheme="emerald">
                          <Text color={'black'} marginRight={7} fontSize={'lg'} >
                            Masculino
                          </Text>
                        </Radio>
                        <Radio value="Femenino" marginBottom={1} color={'amber.100'} size="lg" colorScheme="emerald">
                          <Text color={'black'} fontSize={'lg'} >
                            Femenino
                          </Text>
                        </Radio>

                      </View>

                    </Radio.Group>
                  </FormControl>

                  <FormControl>

                    <Button onPress={showDateTimePicker}>
                      Seleccionar fecha
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
                    />

                  </FormControl>

                  {/* <FormControl>
                    <Radio.Group name="myRadioGroup" onChange={handlePaqueteChange} value={Checkpaquete}>

                      <Text color={'black'} marginBottom={3} marginTop={3} fontSize={'lg'}>Seleccione el paquete que desea adquirir *</Text>
                      <View style={styles.radiobuton2}>


                        <Radio marginBottom={1} color={'amber.100'} size="lg" colorScheme="emerald" value="La Ruta de Conquistadores" >
                          <Text color={'black'} fontSize={'lg'} >
                            La Ruta de Conquistadores
                          </Text>
                        </Radio>
                        <Radio marginBottom={1} size="lg" colorScheme="emerald" value="Alpen Tour Trophy 2023" >

                          <Text color={'black'} fontSize={'lg'} >
                            Alpen Tour Trophy 2023
                          </Text>
                        </Radio>
                        <Radio marginBottom={1} size="lg" colorScheme="emerald" value="Bike TransAlp 2023" >

                          <Text color={'black'} fontSize={'lg'} >
                            Bike TransAlp 2023
                          </Text>
                        </Radio>
                        <Radio marginBottom={1} size="lg" colorScheme="emerald" value="Camino de Santiago España" >

                          <Text color={'black'} fontSize={'lg'} >
                            Camino de Santiago España
                          </Text>
                        </Radio>
                      </View>

                    </Radio.Group>
                  </FormControl> */}

                  <FormControl>
                    <Text color={'black'} fontSize={'lg'} marginBottom={1} marginTop={3}>Seleccione el paquete por el que deseas cambiar</Text>
                    <Radio.Group name="packageGroup" onChange={handlePaqueteChange} value={Checkpaquete}>
                      {Packages.map((item, index) => (
                        <Radio value={item.value} my={1} key={index} marginBottom={1} size="lg" colorScheme="emerald">
                          {item.label}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </FormControl>

                  <FormControl>
                    <Text color={'black'} fontSize={'lg'} marginBottom={1} marginTop={3} >Precio del paquete seleccionado *</Text>
                    <Input variant="underlined"
                      //style={styles.TextBox}
                      value={'$ ' + TxtPrecio}
                      onChangeText={SetTxtPrecio}
                      inputMode='numeric'
                      id='Desarrollador'
                      size='xl'

                    />
                  </FormControl>

                  <FormControl isRequired>

                    <Text color={'black'} fontSize={'lg'} marginBottom={1} marginTop={3} >Ingrese los numeros de su tarjeta *</Text>

                    <Input variant="underlined"
                      //style={styles.TextBox}
                      value={TxtTarjeta}
                      onChangeText={SetTxtTarjeta}
                      inputMode='numeric'
                      id='Desarrollador'
                      size='xl'
                      maxLength={16}
                      color={'black'}

                    />
                  </FormControl>

                  <FormControl>

                    <Text color={'black'} fontSize={'lg'} marginBottom={1} marginTop={3}>CVC *</Text>

                    <Input variant="underlined"
                      //style={styles.TextBox}
                      value={TxtCVC}
                      onChangeText={SetTxtCVC}
                      inputMode='numeric'
                      id='Desarrollador'
                      size='xl'
                      maxLength={3}
                      color={'black'}

                    />
                  </FormControl>

                </Modal.Body>
                <Modal.Footer>
                  <Button.Group>
                    <Button variant={'ghost'} colorScheme={'secondary'} onPress={() => { setModalVisible(false) }}>
                      Cancelar
                    </Button>
                    <Button onPress={() => {
                      UpdateGestor(
                        txtId,
                        txtCedula,
                        txtNombreCliente,
                        CheckSexo,
                        selectedDateText,
                        Checkpaquete, // Utiliza el valor de Checkpaquete en lugar de TxtTipoBisi
                        TxtPrecio.replace('$', ''),
                        TxtTarjeta,
                        TxtCVC,
                      )

                    }}>
                      Guardar
                    </Button>
                  </Button.Group>

                </Modal.Footer>

              </Modal.Content>

            )}
          </Modal>

        </View>

      </View>
    </NativeBaseProvider >


  )
}


