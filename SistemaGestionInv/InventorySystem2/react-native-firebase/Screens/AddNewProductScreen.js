import React,{useEffect,useState,Fragment} from "react";
import { View,Text, StyleSheet, ScrollView} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from '../DataBase/Firebase';
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'

import { Button,Overlay,CheckBox } from 'react-native-elements';
import { Input } from "react-native-elements/dist/input/Input";
import AddProductsNumScreen from "./AddProductsNumScreen";

const AddNewProductScreen=()=> 
{
    const [newAttributeIsCantidad,setnewAttributeIsCantidad]=useState(false);
    const [newAttributeIsNumericField,setnewAttributeIsNumericField]=useState(false);
  const [newAttributeName,setNewAttributeName]=useState('')
  const [newAttributeValue,setNewAttributeValue]=useState('')
  const [Attributes,setAttributes]=useState({Nombre:'',Tipo:'',Costo:0,"Precio de venta":0,"Demanda semanal":0,"Tiempo de reabastecimiento [dias]":0,"Criticidad":"baja"})
  const [NumericAttributes,setNumericAttributes]=useState(["Costo","Precio de venta","Demanda semanal","Tiempo de reabastecimiento [dias]"])
  const [Cantidades,setCantidades]=useState([])
  const [UpdatedAttributes,setUpdatedAttributes]=useState({Nombre:'',Tipo:'',Costo:0,"Precio de venta":0,"Demanda semanal":0,"Tiempo de reabastecimiento [dias]":0,"Criticidad":"baja"})
  const [KeyboardTypeOverlay,setKeyboardTypeOverlay]=useState('default')
  const [visible, setVisible] = useState(false);
  const DropDownPickerAtts=["Precio de venta","Demanda semanal","Tiempo de reabastecimiento [dias]"]
  //Dropdown PickerStates
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([{label:'baja',value:'baja'},{label:'moderada',value:'moderada'},{label:'alta',value:'alta'}]);
  
    const toggleOverlay = () => {
      setVisible(!visible);
      setNewAttributeName('');
      setNewAttributeValue('');
      setnewAttributeIsCantidad(false);
    };
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
    const HandleCreationOfInputsWithAttributesArr=(Att)=>
    {
        if(Att[0]!="Criticidad" && NumericAttributes.indexOf(Att[0])==-1 && Cantidades.indexOf(Att[0])==-1 )
        {
            return(
                <Fragment key={Att[0]}>
                    <Input label={Att[0]} value={UpdatedAttributes[Att[0]]} onChangeText={(value)=>HandleTextChangeWotUpdate(Att[0],value)} ></Input>
                </Fragment>
            );
        }
        else if(Att[0]!="Criticidad")
        {
            return(
                <Fragment key={Att[0]}>
                    <Input label={Att[0]} keyboardType={'numeric'}  value={UpdatedAttributes[Att[0]]} onChangeText={(value)=>HandleTextChangeWotUpdate(Att[0],value)} ></Input>
                </Fragment>
            ); 
        }
        else 
        {
            return(
                <Fragment key={Att[0]}>
                    <Text>{Att[0]} </Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        onChangeValue={(value)=>{
                            setUpdatedAttributes({...Attributes,["Criticidad"]:value})
                        }}
                    />
                    </Fragment>
            )
        }
    }
    const HandleSave=()=>
    {

        let Atts=UpdatedAttributes;
        let CantidadesObj={};
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
        console.log(Cantidades)

        firebase.db.collection('Productos').add(Atts).then(CreatedDoc=>{
            const docID=CreatedDoc.id;
            firebase.db.collection('Lista Productos').doc('Lista').set({
                [docID]:{
                'Nombre':Atts.Nombre,
                'Tipo':Atts.Tipo,
                'Cantidades':Cantidades
             }
            }, { merge: true })
        })   
        
    }

        return(
            <ScrollView style={{paddingVertical:50}}>
                <Overlay  isVisible={visible} overlayStyle={styles.OverStyle} > 
                    <Input label={'Nombre del atributo'} onChangeText={(value)=>setNewAttributeName(value)}></Input>
                    <Input label={'Valor'} keyboardType={KeyboardTypeOverlay} value={newAttributeValue} onChangeText={(value)=>setNewAttributeValue(value)}></Input>
                    <CheckBox title={'Es una cantidad del producto'} checked={newAttributeIsCantidad} disabled={newAttributeIsNumericField}onPress={toggleAttributeCantidad}></CheckBox>
                    <CheckBox title={'Es un campo numerico'} checked={newAttributeIsNumericField} disabled={newAttributeIsCantidad}onPress={toggleAttributeNumericField}></CheckBox>
                    <Button title={'Save'} buttonStyle={styles.ButtonStyle} onPress={HandleNewAttribute}></Button>
                    <Button title={'Cancel'} onPress={toggleOverlay} buttonStyle={styles.ButtonStyle}></Button>
                </Overlay>
                {Object.entries(Attributes).map((Att)=>HandleCreationOfInputsWithAttributesArr(Att))}
                

                <Button title={'Add Attribute'} onPress={toggleOverlay}></Button>
                <Button title={'Save'}  onPress={HandleSave}></Button>
                <Button title={'Cancel'} ></Button>
            </ScrollView>
        );
    
}
const styles = StyleSheet.create({
    OverStyle:{
        height:"75%",
        width:'75%',
    },
    ButtonStyle:{
        height:40,
        width:80
    },
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