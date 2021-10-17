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
  const [Tallas,setTallas]=useState({});
  useEffect(()=>
    {
      firebase.db.collection('Lista Productos').doc('Lista').get().then((doc)=>
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
    const setTallasArray=(value)=>
    {
        if(value!=0)
        {
            let Tallas={};
            Products[value]['Tallas'].forEach((Talla)=>
            {
                Tallas={...Tallas,[Talla]:0}
            })
            setTallas(Tallas);
        }
    }
    const HandleCounters=(ModifiedTalla,Value)=>
    {
        setTallas({...Tallas, [ModifiedTalla]:Value})
    }
    const HandleCreationOfCounters=(Talla)=> //Talla [Talla,Qty]
    {
        return(
            <CustomCounter key={Talla[0]}
                numOfCounter={Tallas[Talla[0]]} 
                textStyle={styles.CounterTextStyle} 
                buttonStyle={styles.CounterButtonsStyle}
                disabledPlus={false}
                containerStyle={styles.ContainerCounter}
                label={"Talla: "+Talla[0]}
                labelStyle={styles.CounterTextStyle} 
                funcToDoWhenModifyVal={HandleCounters}
                NameOfStateToChange={Talla[0]}
            >
            </CustomCounter>
            );
    }
    const HandleSave=()=>
    {
        firebase.db.collection('Productos').doc(value).get().then((doc)=>
        {
            Object.entries(doc.data()['Tallas']).forEach((Talla)=>
            {
                setTallas({...Tallas,[Talla[0]]:Talla[1]+Tallas[Talla[0]]})
            })
        }).then(()=>
        {
            firebase.db.collection('Productos').doc(value).update(Tallas);
        })

    }
    
        return(
            <View>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onChangeValue={setTallasArray}
                    />
                
                {Object.entries(Tallas).map((Talla)=>HandleCreationOfCounters(Talla))}
                <Button title={'Save'} onPress={HandleSave}>

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