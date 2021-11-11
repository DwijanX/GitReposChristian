import React,{useEffect,useState,Fragment} from "react";
import { View,Text, StyleSheet,Picker} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from '../DataBase/Firebase';
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'

import { Button,Overlay } from 'react-native-elements';
import { Input } from "react-native-elements/dist/input/Input";
import { objectOf } from "prop-types";


const AddProductsNumScreen=(props)=> 
{
    const [open, setOpen] = useState(false);
  const [DDPValue, setDDPValue] = useState(0);
  const [items, setItems] = useState([]);
  const [Products,setProducts]=useState({});
  const [Cantidades,setCantidades]=useState({});
  const [newAttributeName,setNewAttributeName]=useState('')
  const [newAttributeValue,setNewAttributeValue]=useState('')
  const [visible, setVisible] = useState(false);
  const [newQtys,setNewQtys]=useState([])


  useEffect(()=>
    {
      props.navigation.setOptions({headerShown: true});
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
    const toggleOverlay = () => {
        setVisible(!visible);
        setNewAttributeName('');
        setNewAttributeValue('');
      };
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
        let aux=Cantidades;
        aux[ModifiedCantidad]+=Value; 
        //setCantidades({...Cantidades, [ModifiedCantidad]:aux})
    }
    const HandleCreationOfCounters=(Cantidad)=> //Cantidad [nombre,Qty]
    {
        return(
            <CustomCounter key={Cantidad[0]}
                numOfCounter={Cantidades[Cantidad[0]]} 
                textStyle={styles.TextStyle} 
                buttonStyle={styles.CounterButtonsStyle}
                disabledPlus={false}
                containerStyle={styles.ContainerCounter}
                label={"Cantidad: "+Cantidad[0]}
                labelStyle={styles.TextStyle} 
                funcToDoWhenModifyVal={HandleCounters}
                NameOfStateToChange={Cantidad[0]}
            >
            </CustomCounter>
            );
    }
    const HandleNewQty=()=>
    {
        if(DDPValue!=0)
        {
            if(newAttributeName!="")
            {
                if(isNaN(parseInt(newAttributeValue))==false)
                {
                    setCantidades({...Cantidades,[newAttributeName]:parseInt(newAttributeValue)})
                }
                else
                {
                    setCantidades({...Cantidades,[newAttributeName]:0})
                }
                setNewQtys([...newQtys,newAttributeName]);
            }
            else
            {
                alert("El nombre ingresado es invalido")
            }
            toggleOverlay();
        }
    }
    const HandleSave=()=>
    {
        if(DDPValue!=0)
        {
             let AuxCantidades=Object.assign({}, Cantidades);
            firebase.db.collection('Productos').doc(DDPValue).get().then((doc)=>
            {
                Object.entries(doc.data()['Cantidades']).forEach((Cantidad)=>
                {
                    if(Cantidades[Cantidad[0]]!=0)
                    {
                        let newQty=Cantidad[1]+Cantidades[Cantidad[0]];
                        AuxCantidades={...AuxCantidades,[Cantidad[0]]:newQty}
                    }
                    else
                    {
                        delete AuxCantidades[Cantidad[0]]
                    }
                })
            }).then(()=>
            {
                if(newQtys.length>0)
                {
                    firebase.db.collection("Listas").doc('Productos').set({
                        [DDPValue]:{"Cantidades":Object.keys(Cantidades)}
                    },{merge:true})
                }
                if(Object.entries(AuxCantidades).length != 0)
                {
                    firebase.db.collection('Productos').doc(DDPValue).set({
                        "Cantidades":AuxCantidades
                    }, { merge: true });
                }
            })
            /*var today = new Date();
            firebase.db.collection('Historial').doc(`${today.getMonth()+1}${today.getUTCFullYear()}`).set(
                {
                'Nombre':Atts.Nombre,
                'Operacion':'Agregacion',
                "Cantidad":,
                "Creado": firebase.FieldValue.serverTimestamp()
                }
                ,{merge:true})*/
        }
        else
        {
            alert("seleccione un producto");
        }
    }
    
        return(
            <View style={styles.GralView}>
                <DropDownPicker
                    open={open}
                    value={DDPValue}
                    items={items}
                    setOpen={setOpen}
                    setValue={setDDPValue}
                    setItems={setItems}
                    onChangeValue={setCantidadesArray}
                    />
                <View style={styles.CountersView}>
                    {Object.entries(Cantidades).map((Cantidad)=>HandleCreationOfCounters(Cantidad))}
                </View>
                <Overlay  isVisible={visible} overlayStyle={styles.OverStyle} > 
                    <Input label={'Nombre de la cantidad'} onChangeText={(value)=>setNewAttributeName(value)}></Input>
                    <Input label={'cantidad'} keyboardType={"numeric"} value={newAttributeValue} onChangeText={(value)=>setNewAttributeValue(value)}></Input>
                    <Button title={'Save'} buttonStyle={styles.ButtonStyle} onPress={HandleNewQty}></Button>
                    <Button title={'Cancel'} buttonStyle={styles.ButtonStyle} onPress={toggleOverlay}></Button>
                </Overlay>
                <Button title={'Crear nueva cantidad'} onPress={()=>{
                   
                    if(DDPValue!=0)
                    {
                        toggleOverlay()
                    }
                    else
                    {
                        alert("seleccione un producto");
                    }
                }}/>

                <Button title={'Guardar'} onPress={HandleSave}>


                </Button>
            </View>
        );
    
}
const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor: '#7f8c8d',
    },
    CountersView:
    {
        paddingVertical:20
    },
    OverStyle:{
        height:"75%",
        width:'75%',
    },
    CheckBoxStyle:{
        backgroundColor: '#7f8c8d',
    },
    ButtonStyle:{
        height:40,
        width:80
    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'#ecf0f1'
    },
    ContainerCounter:{
        paddingHorizontal:40,
    },
    CounterButtonsStyle:
    {
        height:50,
        width:50
    }
  });
  
  
export default AddProductsNumScreen;