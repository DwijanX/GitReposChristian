import React,{Component,Fragment,useEffect,useState} from 'react';
import { View,StyleSheet, ScrollView,Text} from 'react-native';
import { Button,Overlay,CheckBox } from 'react-native-elements';


//class ViewProductsScreen extends Component

const RadioButtonsGroup = (props) => {

    const [SelectedKey,setSelectedKey]=useState("")
    useEffect(()=>
    {
        setSelectedKey(props.selectedKey)
    },[])
    const HandleCheckBoxClicked=(key)=>
    {
        let aux=props.RadioButtonBoolsObjects
        if(aux[key]==false)
        {
            if(SelectedKey!="")
            {
                aux[SelectedKey]=false;

            }
            aux[key]=true;
            setSelectedKey(key)
            props.FuncToUpdateWithKey(key)
        }

    }
    return (
        <Fragment >
                    <Text style={styles.TextStyle}>{props.labelText} </Text>
                    <View style={{flexDirection:'row'}}>
                    {Object.entries(props.RadioButtonBoolsObjects).map((Key)=>
                    {
                        return(
                        <CheckBox key={Key[0]}title={Key[0]} disabled={props.disabled} checkedColor={"#ecf0f1"} textStyle={styles.TextStyle} containerStyle={styles.CheckBoxStyle} checked={Key[1]} onPress={()=>{
                            HandleCheckBoxClicked(Key[0])}}></CheckBox>
                        );
                        
                    })}
                    </View>
                    </Fragment>
    );
  };
  
  
  const styles = StyleSheet.create({
    GralView:
    {
        backgroundColor: '#7f8c8d',
        width:'100%'
    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'#ecf0f1'
    },
    SubTitleStyle:
    {
        fontSize:15,
        fontFamily: 'Futura',
        color:'#ecf0f1'
    },
    CheckBoxStyle:{

        backgroundColor: '#7f8c8d',
    },
  });
export default RadioButtonsGroup;