import React,{useEffect,useState,Fragment} from "react";
import { View,Text, StyleSheet,Picker} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from '../DataBase/Firebase';
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'

import { Button,Divider } from 'react-native-elements';
import { Input } from "react-native-elements/dist/input/Input";
import { objectOf } from "prop-types";


const AddProductsNumScreen=()=> 
{
    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([]);
  const [Products,setProducts]=useState({});
  const [Cantidades,setCantidades]=useState({});
  useEffect(()=>
    {
      firebase.db.collection('Listas').doc('Productos').get().then((doc)=>
      //firebase.db.collection('Lista Productos').doc('Lista').get().then((doc)=>
      {
        let Products=[];
        Object.entries(doc.data()).forEach((Product)=>
        {
          let DataAux={
            label:Product[1]['Nombre'],
            value:Product[0]
          }
          Products.push(DataAux);
        })
        setProducts(doc.data());
        setItems(Products);
      })
    },[]);
    const setCantidadesArray=(value)=>
    {
        if(value!=0)
        {
            let Cantidades={};
            Products[value]['Cantidades'].forEach((Cantidad)=>
            {
                Cantidades={...Cantidades,[Cantidad]:0}
            })
            setCantidades(Cantidades);
        }
    }
    const HandleCounters=(ModifiedCantidad,Value)=>
    {
        let aux=Cantidades[ModifiedCantidad]+Value;
        setCantidades({...Cantidades, [ModifiedCantidad]:aux})
    }
    const HandleCreationOfCounters=(Cantidad)=> //Cantidad [nombre,Qty]
    {
        return(
            <CustomCounter key={Cantidad[0]}
                numOfCounter={Cantidades[Cantidad[0]]} 
                textStyle={styles.CounterTextStyle} 
                buttonStyle={styles.CounterButtonsStyle}
                disabledPlus={false}
                containerStyle={styles.ContainerCounter}
                label={"Cantidad: "+Cantidad[0]}
                labelStyle={styles.CounterTextStyle} 
                funcToDoWhenModifyVal={HandleCounters}
                NameOfStateToChange={Cantidad[0]}
            >
            </CustomCounter>
            );
    }
    const HandleSave=()=>
    {
        let AuxCantidades=Cantidades;
        firebase.db.collection('Productos').doc(value).get().then((doc)=>
        {
            Object.entries(doc.data()['Cantidades']).forEach((Cantidad)=>
            {
                let newQty=Cantidad[1]+Cantidades[Cantidad[0]];
                AuxCantidades={...AuxCantidades,[Cantidad[0]]:newQty}
            })
        }).then(()=>
        {
            firebase.db.collection('Productos').doc(value).set({
                "Cantidades":AuxCantidades
            }, { merge: true });
        })

    }
    
        return(
            <View style={{paddingVertical:20}}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onChangeValue={setCantidadesArray}
                    />
                
                {Object.entries(Cantidades).map((Cantidad)=>HandleCreationOfCounters(Cantidad))}

                <Button title={'Crear nueva cantidad'}/>
                <Button title={'Guardar'} onPress={HandleSave}>


                </Button>
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
  
  
export default AddProductsNumScreen;