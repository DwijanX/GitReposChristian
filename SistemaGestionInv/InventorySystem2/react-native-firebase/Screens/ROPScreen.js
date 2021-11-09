import React,{Fragment, useEffect,useState} from "react";
import { View,Text, StyleSheet, ScrollView} from "react-native";
import { Button,Divider,ListItem,Overlay } from 'react-native-elements';
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'
import DropDownPicker from 'react-native-dropdown-picker';


const ROPScreen=(props)=>
{
    const [Product,setProduct]=useState({})
    const [ROP,setROP]=useState({})

    const CalculateROP=(Product)=>
    {
        let DemandMonth=Product["Demanda mensual"];
        let LeadTimeMonth=Product["Tiempo de reabastecimiento"]
        let ROP=
    }
    useEffect(()=>
    {
        setProduct(props.route.params.Product);
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
  
export default ROPScreen
