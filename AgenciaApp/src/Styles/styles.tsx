import { StyleSheet, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  NavigationContainer: {
    backgroundColor: '#6750A4',
  },

  ContenedorPrincipal: {
    flex: 1,
    backgroundColor: '#6750A4',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,

  },
  ContenedorImagen: {
    width: '100%',
    height: 410,
    //elevation: 10,
    marginBottom: 10,
    borderColor: '#9A9A9A',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',



  },
  Imagenes: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  ViewTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 0,
    height: '10%',
  },
  TituloImagen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 10,
    fontSize: 20,
    top: 0,
    color: '#535355',
    textAlign: 'left',
    fontFamily: 'Century Gotic',
    height: '100%',



  },
  TextoImagen: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 20,
    top: 0,
    color: '#535355',
    justifyContent: 'flex-start',
    textAlign: 'left',
    fontFamily: 'Century Gotic',
    flexDirection: 'row',
    alignItems: 'flex-start',

  },
  precio: {
    position: 'absolute',
    backgroundColor: '#A02A1D',
    fontSize: 20,
    top: 10,
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
    width: 110,
    height: 30,
    paddingLeft: 10,
    color: '#FFFFFF',
    textAlign:'center',
    justifyContent: 'center',
  },
  fab1: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: '#6750A4', // Color de fondo del botón
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
  fab2: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6750A4', // Color de fondo del botón
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
    fontSize: 20,
  },
  PanelPrincipalRegistro: {
    width: '100%',
    height: '100%',
    backgroundColor: '#6750A4',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    padding: 1,

  },
  ContenedorInput: {
    flex: 1,
    padding: 15,
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',


  },
  Label: {
    width: '100%',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 1,
    marginTop: 10,
    marginLeft: 20,
    paddingBottom: 5
  },
  TextBox: {
    // // width: '100%',
    // //backgroundColor: 'white',
    // // fontSize: 20,
    // padding: 5,
    // marginTop: 5,
    // // marginLeft: 10,
    // // marginRight: 10,
    // width: '95%',
    // height: 40,
    // paddingLeft: 20,
    // textAlign: 'left',
    // borderColor: '#fff',
    // borderWidth: 2,
    // borderRadius: 15,
    // marginBottom: 12,
    // paddingHorizontal: 7,
    color: '#fff',
    // fontSize: 22,
    marginLeft: 10,


  },
  contendorBotonFecha: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
    alignContent: 'flex-end',
    marginLeft: -150,
  },
  botonfecha: {
    padding: 10,
    marginBottom: 1,
    marginLeft: -100,
    borderRadius: 10,

  },
  radiobuton: {
    paddingRight: 20,
    paddingLeft: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',


  },
  radiobuton2: {
    paddingRight: 0,
    paddingLeft: 0,
    flexDirection: 'column',
    // alignItems: 'center',
    //backgroundColor: '#D3CDE4',
    borderRadius: 10,


  },
  Labelradio: {
    color: '#fff',
    fontWeight: '800',
    marginRight: 1,
    marginLeft: 15,
    fontSize: 20,
  },
  Labelradio2: {
    color: 'white',
    //fontWeight: '800',
    marginRight: 1,
    marginLeft: 15,
    //fontSize: 20,
  },
  Labelradio3: {
    color: '#000',
    //fontWeight: '800',
    marginRight: 1,
    marginLeft: 15,
    //fontSize: 20,
  },
  SizeImageSave: {
    width: 100,
    height: 50,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 100,
    marginRight: 100,
    //backgroundColor:'#FFFFFF',
  },
  Modals: {
    backgroundColor: '#6750A4',
    position: 'absolute'
  },
  modalContainer: {
    bottom: 0,
    marginLeft: 10,
    marginRight: 10,
    width: '95%',
    height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#6750A4',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  ButtonCerrar: {
    alignSelf: 'flex-end',
    width: 45,
    height: 35,
    textAlign: 'center',
    //backgroundColor: '#C42B1C',
    color: '#FFFFFF',
    borderRadius: 100,
    padding: 6,
    //marginBottom: 10,
    marginLeft: '75%', // Ajusta el margen derecho según sea necesario
    fontSize: 17,
    fontWeight: 'bold',
  },
  panelBtnRadio: {
    width: '95%',

  },

  Lista: {
    // //backgroundColor: '#D8F9F1',
    // borderRadius: 10,
    // padding: 10
    // marginHorizontal: 16,
    //backgroundColor: '#FFFFE0', // Color de fondo similar a las notas rápidas de Windows
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  DatosLista: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#fff',
    lineHeight: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#fff',
    paddingBottom: 3,
    paddingTop:3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  SizeImage: {
    width: 35,
    height: 35
  },
  containerBoton: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  PanelPrincipal2: {
    padding: 10,
    flex: 1,
    // flexDirection: "column",
    // width: '100%',
    backgroundColor: "#6750A4",
  },
  contendorBotonGuardar: {
    width:200
  },
  LabelT:{
    fontSize:24,
  },
  backgroundImage: {
    flex: 1,
    width: 'auto', // Utilizar el alto de la ventana como ancho para acoplar la imagen
    //height: 'auto',
    resizeMode: 'cover',
    //justifyContent: 'center',
    //transform: [{ rotate: '0deg' }] // Girar la imagen 45 grados
  },
});