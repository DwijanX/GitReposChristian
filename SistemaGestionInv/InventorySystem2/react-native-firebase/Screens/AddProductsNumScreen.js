import React,{useEffect,useState,Fragment} from "react";
import { View,Text, StyleSheet,Picker, ScrollView} from "react-native";
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
  const [SaveButtonPressed,setSaveButtonPressed]=useState(false)


  useEffect(()=>
    {
      props.navigation.setOptions({headerShown: true});
      firebase.db.collection('Listas').doc('Productos').get().then((doc)=>
      {
        let ProductsDDP=[];
        let Products=doc.data()
        Object.entries(doc.data()).forEach((Product)=>
        {
          let DataAux={
            label:Product[1]['Nombre'],
            value:Product[0]
          }
          ProductsDDP.push(DataAux);
          Products[Product[0]]["Cantidades"]=Product[1]["Cantidades"].sort()
        })
        setProducts(Products);
        ProductsDDP.sort(compareLabel);
        setItems(ProductsDDP);

      })
    },[]);
    const compareLabel=( a, b )=> {
        if ( a["label"] < b["label"] ){
          return -1;
        }
        if ( a["label"] > b["label"] ){
          return 1;
        }
        return 0;
      }
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
            let Keys=Object.keys(Cantidades)
            let RepeatedKey=false
            let BreakException = {};
            try
            {
                Keys.forEach((key)=>
                {
                    if(key==newAttributeName)
                    {
                        RepeatedKey=true
                        throw BreakException;
                    }
                })
            }   
            catch (e) {
                if (e !== BreakException) throw e;
            }
            if(newAttributeName!="" && RepeatedKey==false)
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
        setSaveButtonPressed(true)
        if(DDPValue!=0)
        {
             let AuxCantidades=Object.assign({}, Cantidades);
             let Name="aux"
            firebase.db.collection('Productos').doc(DDPValue).get().then((doc)=>
            {
                Name=doc.data()["Nombre"]
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
            }).then(()=>
            {
                let AuxCantidades2=Object.assign({}, Cantidades);
                Object.entries(AuxCantidades2).forEach((Cantidad)=>
                    {
                        if(Cantidad[1]==0)
                        {
                            delete AuxCantidades2[Cantidad[0]]
                        }
                    })
                let today = new Date();
                let key=today.getHours()+"_" + today.getMinutes()+"_" + today.getSeconds()+"_"+today.getDate()+"_"+(today.getMonth()+1)+"_"+today.getFullYear()
                firebase.db.collection('Historial').doc(`${today.getMonth()+1}${today.getUTCFullYear()}`).set(
                {
                    [key]:{
                        'Nombre':Name,
                        'Operacion':'Agregacion',
                        "Cantidades":AuxCantidades2,
                        "Fecha": firebase.FieldValue.serverTimestamp()
                    }
                }
                ,{merge:true})
            }).then(()=>
            {
                alert("Guardado exitoso")
                setDDPValue(0)
            })
        }
        else
        {
            alert("seleccione un producto");
        }
        setSaveButtonPressed(false)
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
                <ScrollView>
                <View style={styles.ButtonsContainer}>
                { DDPValue!=0 &&
                <Button title={'Crear nueva cantidad'} buttonStyle={styles.ButtonStyle} onPress={()=>{
                   
                    if(DDPValue!=0)
                    {
                        toggleOverlay()
                    }
                    else
                    {
                        alert("seleccione un producto");
                    }
                }}/>
              }
                { DDPValue!=0 &&
                <Button title={'Guardar'} disabled={SaveButtonPressed} buttonStyle={styles.ButtonStyle} onPress={HandleSave}/>
                }
                </View>

                { DDPValue!=0 &&
                    <View style={styles.CountersView}>
                        {Object.entries(Cantidades).map((Cantidad)=>HandleCreationOfCounters(Cantidad))}
                    </View>
                }   
                </ScrollView>
                <Overlay  isVisible={visible} overlayStyle={styles.OverStyle} > 
                    <Input label={'Nombre de la cantidad'} inputContainerStyle={styles.inputContainerStyle} labelStyle={styles.TextStyle} onChangeText={(value)=>setNewAttributeName(value)}></Input>
                    <Input label={'Cantidad'} inputContainerStyle={styles.inputContainerStyle} labelStyle={styles.TextStyle} keyboardType={"numeric"} value={newAttributeValue} onChangeText={(value)=>setNewAttributeValue(value)}></Input>
                    <View style={styles.ButtonsContainer}>
                    <Button title={'Save'} buttonStyle={styles.ButtonStyle} onPress={HandleNewQty}></Button>
                    <Button title={'Cancel'} buttonStyle={styles.ButtonStyle} onPress={toggleOverlay}></Button>
                    </View>
                </Overlay>
                
            </View>
        );
    
}
const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor: 'white',
    },
    CountersView:
    {
        paddingVertical:20
    },
    OverStyle:{
        height:"40%",
        width:'75%',
        backgroundColor: 'white',
    },
    CheckBoxStyle:{
        backgroundColor: 'white',
    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'black'
    },
    ContainerCounter:{
        paddingHorizontal:40,
    },
    CounterButtonsStyle:
    {
        height:50,
        width:50,
        backgroundColor:"#7b838c"
    },  
    inputStyle:
    {
        height:40,
        fontSize:20,
        fontFamily: 'Futura',
        color:'black',
    },
    inputContainerStyle:
    {
        borderBottomColor:"black",
        color:'black'
    },
    ButtonStyle:{
        marginTop:10,
        width:'65%',
        marginVertical:2,
        alignItems:'center',
        alignContent:"center",
        justifyContent:'space-evenly',
        backgroundColor:"#7b838c"
    },
    ButtonsContainer:
    {
        alignItems:"center",
        textAlign:"center"
    },
  });
  
  
export default AddProductsNumScreen;