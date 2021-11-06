import React,{Fragment, useEffect,useState} from "react";
import { View,Text, StyleSheet} from "react-native";
import { Button,Divider,ListItem,Overlay } from 'react-native-elements';
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'
import DropDownPicker from 'react-native-dropdown-picker';


const ABCScreen=(props)=>
{
    const [ClassificationAProducts,setClassificationAProducts]=useState([])
    const [ClassificationBProducts,setClassificationBProducts]=useState([])
    const [ClassificationCProducts,setClassificationCProducts]=useState([])
    const getCompromisedProducts=()=>
    {
        firebase.db.collection("ProductosContenidos").doc("CompromisedProducts").get().then((doc)=>
        {
            setCompromisedProducts(doc.data())
            setProductChecksObj(doc.data());
        })
    }
    useEffect(()=>
    {
        getCompromisedProducts()
    },[]);

    return(
    <View  >
    </View>
    );
    
}
const styles = StyleSheet.create({
    CounterButtonsStyle:
    {
        height:50,
        width:40,
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:'#e1a8c0',
    },
    CounterTextStyle:
    {
        color:'black',
        fontSize:25,
        fontFamily: 'Futura',
    },
    ContainerCounter:
    {
        paddingHorizontal:20
    }
  });
  
export default ABCScreen


/*
Demanda
muy Alta 1
Alta  0.78
Media 0.56
Baja 0.33 
Muy Baja 0.11

LeadTime
muy largo  1
largo  0.78
Media  0.56
corto 0.33
Muy corto 0.11

Criticality
High  1
Moderate  0.78
Low  0.33
*/

