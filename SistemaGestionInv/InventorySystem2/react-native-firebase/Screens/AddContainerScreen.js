import React,{Component,useEffect,useState} from 'react';
import { View,StyleSheet,TextInput, ScrollView,Text} from 'react-native';
import firebase from '../DataBase/Firebase';
import { Button} from 'react-native-elements';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Input } from 'react-native-elements/dist/input/Input';


class AddContainerScreen extends Component
{
    
    constructor(props)
    {
        super(props)
        this.state={
            Tipo:"",
            Nombre:"",
            Ubicacion:"",
            Descripcion:""
        }
        this.HandleTextChange=this.HandleTextChange.bind(this);
        this.HandleContainerCreation=this.HandleContainerCreation.bind(this);
    }
    HandleTextChange(att,value)
    {
        this.setState({[att]:value})
    }
    HandleContainerCreation()
    {
        if(this.state.Tipo!="" && this.state.Nombre!="" && this.state.Ubicacion!="" && this.state.Descripcion!="")
        {
            firebase.db.collection('Contenedores').add(
                {
                    Tipo:this.state.Tipo,
                    Nombre:this.state.Nombre,
                    Ubicacion:this.state.Ubicacion,
                    Descripcion:this.state.Descripcion,
                }
            ).then((CreatedDoc)=>
            {
                firebase.db.collection('ProductosContenidos').doc(CreatedDoc.id).set({Nombre:this.state.Nombre})
                firebase.db.collection('Listas').doc('Contenedores').set({[CreatedDoc.id]:{Nombre:this.state.Nombre,Tipo:this.state.Tipo}},{merge:true})
            }).then(()=>
            {
                alert("Se registro correctamente") 
                this.props.navigation.navigate('HomeScreen');
            })
        }
        else
        {
            alert('Llene todos los campos');
        }
    }
    componentDidMount()
    {
    this.props.navigation.setOptions({headerShown: true});
    }
    render(){
        return(
            <View style={styles.GralView} >
                <Input labelStyle={styles.TextStyle}  inputStyle={styles.TextStyle}
                label={"Nombre"}
                onChangeText={(value)=>this.HandleTextChange("Nombre",value)}
                ></Input>
                <Input labelStyle={styles.TextStyle}  inputStyle={styles.TextStyle}
                label={"Tipo"}
                onChangeText={(value)=>this.HandleTextChange("Tipo",value)}
                ></Input>
                <Input labelStyle={styles.TextStyle}  inputStyle={styles.TextStyle}
                label={"Descripcion de la ubicacion"}
                onChangeText={(value)=>this.HandleTextChange("Ubicacion",value)}
                ></Input>
                <Input labelStyle={styles.TextStyle}  inputStyle={styles.TextStyle}
                label={"Descripcion del contenedor"}
                onChangeText={(value)=>this.HandleTextChange("Descripcion",value)}
                ></Input> 
                <View style={styles.ButtonsContainer}>
                    <Button title="Guardar" buttonStyle={styles.ButtonStyle} onPress={this.HandleContainerCreation}/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor: 'white',
    },
    OverStyle:{
        height:"75%",
        width:'75%',
    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'black'
    },
    ButtonsContainer:
    {
        alignItems:"center",
        textAlign:"center"
    },
    ButtonStyle:{
        marginTop:10,
        width:'70%',
        marginVertical:2,
        alignItems:'center',
        alignContent:"center",
        justifyContent:'space-evenly',
        backgroundColor:"#7b838c"
    },
  });
export default AddContainerScreen