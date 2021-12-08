import React,{useEffect,useState,Fragment} from "react";
import { View,Text, StyleSheet, ScrollView, ActionSheetIOS} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from '../DataBase/Firebase';
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'

import { Button,Overlay,CheckBox } from 'react-native-elements';
import { Input } from "react-native-elements/dist/input/Input";
import AddProductsNumScreen from "./AddProductsNumScreen";
import RadioButtonsGroup from '../CustomComponents/RadioButtonsGroup'

const AddNewProductScreen=(props)=> 
{
    const [newAttributeIsCantidad,setnewAttributeIsCantidad]=useState(false);
    const [newAttributeIsNumericField,setnewAttributeIsNumericField]=useState(false);
  const [newAttributeName,setNewAttributeName]=useState('')
  const [newAttributeValue,setNewAttributeValue]=useState('')

  const [Attributes,setAttributes]=useState({Nombre:'',Tipo:'',Costo:"0","Precio de venta":"0","Demanda mensual":"0","Tiempo de reabastecimiento [dias]":"0","Criticidad":"baja"})
  const [NumericAttributes,setNumericAttributes]=useState(["Costo","Precio de venta","Demanda mensual","Tiempo de reabastecimiento [dias]"])
  const [Cantidades,setCantidades]=useState([])
  const [UpdatedAttributes,setUpdatedAttributes]=useState({Nombre:'',Tipo:'',Costo:"0","Precio de venta":"0","Demanda mensual":"0","Tiempo de reabastecimiento [dias]":"0","Criticidad":"baja"})
  
  const [KeyboardTypeOverlay,setKeyboardTypeOverlay]=useState('default')
  const [visible, setVisible] = useState(false);
  const [Criticality, setCriticality] = useState({"baja":true,"moderada":false,"alta":false});
  
  
    const toggleOverlay = () => {
      setVisible(!visible);
      setNewAttributeName('');
      setNewAttributeValue('');
      setnewAttributeIsCantidad(false);
    };
    useEffect(()=>
    {
        props.navigation.setOptions({headerShown: true});
    },[])
    const SetNumericKeyboardOverlay=(boolean)=>
    {
        if(boolean==true)
        {
            setKeyboardTypeOverlay('numeric')
        }
        else
        {
            setKeyboardTypeOverlay('default')
        }
      setNewAttributeValue('');
    }
    const toggleAttributeCantidad = () => {
        SetNumericKeyboardOverlay(!newAttributeIsCantidad)
        setnewAttributeIsCantidad(!newAttributeIsCantidad);
      };
    const toggleAttributeNumericField = () => {
      SetNumericKeyboardOverlay(!newAttributeIsNumericField)
      setnewAttributeIsNumericField(!newAttributeIsNumericField);
      };
    const HandleNewAttribute=()=>
    {
        if(newAttributeValue!='' && newAttributeName!='')
        {
            if(newAttributeIsCantidad)
            {
                setCantidades([...Cantidades,newAttributeName])

            }
            else if(newAttributeIsNumericField)
            {
                setNumericAttributes([...NumericAttributes,newAttributeName])
            }
            setAttributes({...Attributes,[newAttributeName]:newAttributeValue});
            setUpdatedAttributes({...UpdatedAttributes,[newAttributeName]:newAttributeValue});
            toggleOverlay();
        }
        else
        {
            alert('Llene todos los campos');
        }
    }
    const HandleTextChangeWotUpdate=(Attribute,Value)=>
    {
        setUpdatedAttributes({...UpdatedAttributes,[Attribute]:Value});
    }
    const setCriticalityToRadioButtons=(value)=>
    {
        setUpdatedAttributes({...UpdatedAttributes,["Criticidad"]:value})
    }
    const HandleCreationOfInputsWithAttributesArr=(Att)=>
    {
        if(Att[0]!="Criticidad" && NumericAttributes.indexOf(Att[0])==-1 && Cantidades.indexOf(Att[0])==-1 )
        {
            return(
                <Fragment key={Att[0]}>
                    <Input label={Att[0]} value={UpdatedAttributes[Att[0]]} labelStyle={styles.TextStyle} inputStyle={styles.TextStyle} onChangeText={(value)=>HandleTextChangeWotUpdate(Att[0],value)} ></Input>
                </Fragment>
            );
        }
        else if(Att[0]!="Criticidad")
        {
            return(
                <Fragment key={Att[0]}>
                    <Input label={Att[0]} keyboardType={'numeric'} labelStyle={styles.TextStyle}  inputStyle={styles.TextStyle} value={UpdatedAttributes[Att[0]]} onChangeText={(value)=>HandleTextChangeWotUpdate(Att[0],value)} ></Input>
                </Fragment>
            ); 
        }
        else 
        {
            return (
                <RadioButtonsGroup key={Att[0]}
                RadioButtonBoolsObjects={Criticality}
                FuncToUpdateWithKey={setCriticalityToRadioButtons}
                labelText={Att[0]}
                selectedKey={"baja"}
                />
            );
        }
    }
 
    const HandleSave=()=>
    {
        let Atts=UpdatedAttributes;
        let CantidadesObj={};
        if(UpdatedAttributes["Nombre"]!="" && UpdatedAttributes["Tipo"]!="" )
        {
            Cantidades.forEach((Cantidad)=>
            {
                if(Atts[Cantidad]!=NaN)
                {
                    CantidadesObj={...CantidadesObj,[Cantidad]:parseInt(Atts[Cantidad])}
                }
                else
                {
                    CantidadesObj={...CantidadesObj,[Cantidad]:0}
                }
                delete Atts[Cantidad]
            })
            NumericAttributes.forEach((NumericAtt)=>
            {
                if(isNaN(parseInt(Atts[NumericAtt]))==false)
                {
                    Atts={...Atts,[NumericAtt]:parseInt(Atts[NumericAtt])}
                }
                else
                {
                    Atts={...Atts,[NumericAtt]:0}
                }
            })
            if(Object.keys(CantidadesObj).length === 0)
            {
                CantidadesObj={"General":0}
                Cantidades.push("General");
            }
            Atts={...Atts,['Cantidades']:CantidadesObj}

            firebase.db.collection('Productos').add(Atts).then(CreatedDoc=>{
                const docID=CreatedDoc.id;
                firebase.db.collection('Listas').doc('Productos').set({
                    [docID]:{
                    'Nombre':Atts.Nombre,
                    'Tipo':Atts.Tipo,
                    'Cantidades':Cantidades,
                    "Precio de venta":Atts["Precio de venta"]
                }
                }, { merge: true })
                let today = new Date();
                let key=today.getHours()+"_" + today.getMinutes()+"_" + today.getSeconds()+"_"+today.getDate()+"_"+(today.getMonth()+1)+"_"+today.getFullYear()
                firebase.db.collection('Historial').doc(`${today.getMonth()+1}${today.getUTCFullYear()}`).set(
                {
                    [key]:{
                        'Nombre':Atts.Nombre,
                        'Operacion':'Creacion',
                        "Fecha": firebase.FieldValue.serverTimestamp()
                    }
                }
                ,{merge:true})
            }).then(()=>{
                alert("Se registro correctamente") 
                props.navigation.navigate('HomeScreen');
            })
        }
        else
        {
            alert("Llene los campos correctamente")
        }
        
    }

        return(
            <ScrollView style={styles.GralView} >
                <Overlay  isVisible={visible} overlayStyle={styles.OverStyle} > 
                    <Input label={'Nombre del atributo'} inputContainerStyle={styles.inputContainerStyle} labelStyle={styles.TextStyle} inputStyle={styles.inputStyle} inputContainerStyle={styles.inputContainerStyle} onChangeText={(value)=>setNewAttributeName(value)}></Input>
                    <Input label={'Valor'} inputContainerStyle={styles.inputContainerStyle} labelStyle={styles.TextStyle} inputStyle={styles.inputStyle} inputContainerStyle={styles.inputContainerStyle} keyboardType={KeyboardTypeOverlay} value={newAttributeValue} onChangeText={(value)=>setNewAttributeValue(value)}></Input>

                    <CheckBox title={'Es una cantidad del producto'} containerStyle={styles.containerStyleCheckBox} checkedColor="#ecf0f1" uncheckedColor="#ecf0f1" textStyle={styles.LowerTextStyle} checked={newAttributeIsCantidad} disabled={newAttributeIsNumericField}onPress={toggleAttributeCantidad}></CheckBox>
                    <CheckBox title={'Es un campo numerico'} containerStyle={styles.containerStyleCheckBox} checkedColor="#ecf0f1" uncheckedColor="#ecf0f1" textStyle={styles.LowerTextStyle}  checked={newAttributeIsNumericField} disabled={newAttributeIsCantidad}onPress={toggleAttributeNumericField}></CheckBox>
                    <View style={styles.ButtonsContainer}>
                    <Button title={'Save'} buttonStyle={styles.ButtonStyle} onPress={HandleNewAttribute}></Button>
                    <Button title={'Cancel'} onPress={toggleOverlay} buttonStyle={styles.ButtonStyle}></Button>
                    </View>
                </Overlay>
                {Object.entries(Attributes).map((Att)=>HandleCreationOfInputsWithAttributesArr(Att))}
                
                <Button title={'Add Attribute'} onPress={toggleOverlay}></Button>
                <Button title={'Save'} onPress={HandleSave}></Button>
                <Button title={'Cancel'}  ></Button>
            </ScrollView>
        );
    
}
const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor: '#7f8c8d',
    },
    OverStyle:{
        height:"60%",
        width:'75%',
        backgroundColor: '#7f8c8d',
    },
    ButtonsContainer:
    {
        alignItems:"center",
        textAlign:"center"
    },
    CheckBoxStyle:{

        backgroundColor: '#7f8c8d',
    },
    ButtonStyle:{
        width:'65%',
        marginVertical:2,
        alignItems:'center',
        alignContent:"center",
        justifyContent:'space-evenly',
    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'#ecf0f1'
    },
    LowerTextStyle:
    {
        fontSize:15,
        fontFamily: 'Futura',
        color:'#ecf0f1'
    },
    inputStyle:
    {
        height:40,
        fontSize:20,
        fontFamily: 'Futura',
        color:'#ecf0f1',
    },
    inputContainerStyle:
    {
        borderBottomColor:"#ecf0f1",
        color:'#ecf0f1'
    },
    containerStyleCheckBox:{
        backgroundColor:'#7f8c8d',
        borderColor:'#7f8c8d'
    },
    
  });
  
  
export default AddNewProductScreen;


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