import React,{useEffect,useState,Fragment} from "react";
import { View,Text, StyleSheet} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from '../DataBase/Firebase';
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'

import { Button,Overlay,CheckBox } from 'react-native-elements';
import { Input } from "react-native-elements/dist/input/Input";
import AddProductsNumScreen from "./AddProductsNumScreen";

const AddNewProductScreen=()=> 
{
    const [newAttributeIsTalla,setNewAttributeIsTalla]=useState(false);
  const [newAttributeName,setNewAttributeName]=useState('')
  const [newAttributeValue,setNewAttributeValue]=useState('')
  const [Attributes,setAttributes]=useState({Nombre:'',Tipo:''})
  const [Tallas,setTallas]=useState([])
  const [UpdatedAttributes,setUpdatedAttributes]=useState({Nombre:'',Tipo:''})

    const [visible, setVisible] = useState(false);
  
    const toggleOverlay = () => {
      setVisible(!visible);
      setNewAttributeName('');
      setNewAttributeValue('');
      setNewAttributeIsTalla(false);
    };
    const toggleAttributeTalla = () => {
        setNewAttributeIsTalla(!newAttributeIsTalla);
      };
    const HandleNewAttribute=()=>
    {
        if(newAttributeValue!='' && newAttributeName!='')
        {
            if(isNaN(newAttributeValue)==false)
            {
                setAttributes({...Attributes,[newAttributeName]:parseInt(newAttributeValue)});
                setUpdatedAttributes({...UpdatedAttributes,[newAttributeName]:parseInt(newAttributeValue)});
                setTallas([...Tallas,newAttributeName])
            }
            else
            {
                setAttributes({...Attributes,[newAttributeName]:newAttributeValue});
                setUpdatedAttributes({...UpdatedAttributes,[newAttributeName]:newAttributeValue});
            }
            
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
    const HandleCounters=(ModifiedTalla,Value)=>
    {
        setUpdatedAttributes({...UpdatedAttributes, [ModifiedTalla]:Value})
    }
    const HandleCreationOfInputsWithAttributesArr=(Att)=>
    {
        if(Att[1]=='' || isNaN(Att[1]) )
        {
            return(
                <Fragment key={Att[0]}>
                    <Input label={Att[0]} value={UpdatedAttributes[Att[0]]} onChangeText={(value)=>HandleTextChangeWotUpdate(Att[0],value)} ></Input>
                </Fragment>
            );
        }
        else
        {
            return(
            <CustomCounter key={Att[0]}
                numOfCounter={UpdatedAttributes[Att[0]]} 
                textStyle={styles.CounterTextStyle} 
                buttonStyle={styles.CounterButtonsStyle}
                disabledPlus={false}
                containerStyle={styles.ContainerCounter}
                label={"Cantidad: "+Att[0]}
                labelStyle={styles.CounterTextStyle} 
                funcToDoWhenModifyVal={HandleCounters}
                NameOfStateToChange={Att[0]}
            >
            </CustomCounter>
            );
        }
    }
    const HandleSave=()=>
    {

        let Atts=UpdatedAttributes;
        let TallasObj={};
        Tallas.forEach((talla)=>
        {
            TallasObj={...TallasObj,[talla]:Atts[talla]}
            delete Atts[talla]
        })
        Atts={...Atts,['Cantidades']:TallasObj}
        firebase.db.collection('Productos').add(Atts).then(CreatedDoc=>{
            const docID=CreatedDoc.id;
            firebase.db.collection('Lista Productos').doc('Lista').set({
                [docID]:{
                'Nombre':Atts.Nombre,
                'Tipo':Atts.Tipo,
                'Cantidades':Tallas
             }
            }, { merge: true })
        })      
        
    }

        return(
            <View style={{paddingVertical:50}}>
                <Overlay  isVisible={visible} overlayStyle={styles.OverStyle} > 
                    <Input label={'Nombre del atributo'} onChangeText={(value)=>setNewAttributeName(value)}></Input>
                    <Input label={'Valor'} onChangeText={(value)=>setNewAttributeValue(value)}></Input>
                    <CheckBox title={'Es una cantidad'} checked={newAttributeIsTalla} onPress={toggleAttributeTalla}></CheckBox>
                    <Button title={'Save'} buttonStyle={styles.ButtonStyle} onPress={HandleNewAttribute}></Button>
                    <Button title={'Cancel'} onPress={toggleOverlay} buttonStyle={styles.ButtonStyle}></Button>
                </Overlay>
                {Object.entries(Attributes).map((Att)=>HandleCreationOfInputsWithAttributesArr(Att))}
                

                <Button title={'Add Attribute'} onPress={toggleOverlay}></Button>
                <Button title={'Save'}  onPress={HandleSave}></Button>
                <Button title={'Cancel'} ></Button>
            </View>
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