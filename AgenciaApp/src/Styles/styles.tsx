import { StyleSheet, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


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
        paddingLeft: 5,
        color: '#FFFFFF',

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
        padding: 2,
        backgroundColor: 'transparent',
        //position: 'absolute',
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    Label: {
        width: '100%',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 1,
        marginTop: 10,
        marginLeft: 10,
    },
    TextBox: {
        // width: '100%',
        backgroundColor: 'white',
        // fontSize: 20,
        padding: 5,
        marginTop: 5,
        // marginLeft: 10,
        // marginRight: 10,
        width: '95%',
        height: 40,
        paddingLeft: 20,
        textAlign: 'left',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 12,
        paddingHorizontal: 7,
        color: '#000000',
        fontSize: 22,
        marginLeft: 10,


    },
    botonfecha: {
        padding: 10,
        marginBottom: 1,

        marginLeft: 0,

    },
    radiobuton: {
        paddingRight: 20,
        paddingLeft: 12,
        flexDirection: 'row',
        alignItems: 'center',


    },
    radiobuton2: {
        paddingRight: 0,
        paddingLeft: 0,
        flexDirection: 'column',
        // alignItems: 'center',
        backgroundColor:'#fff',
        borderRadius:10,


    },
    Labelradio: {
        color: '#fff',
        fontWeight:'800',
        marginRight: 0,
        fontSize: 20,
    },
    SizeImageSave:{
        width: 80,
        height: 80,
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 100,
        marginRight: 100,
        backgroundColor:'#FFFFFF',
      },
      Modals: {
        backgroundColor: '#BFBFBF',
        position:'absolute'
      },
      modalContainer: {
        bottom: -100,
        marginLeft: 10,
        marginRight: 10,
        width: '95%',
        height: 560,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#37373D',
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
});