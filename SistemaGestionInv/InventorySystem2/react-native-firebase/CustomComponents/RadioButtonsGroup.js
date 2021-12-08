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
                    <Text  style={{color:props.TextColor}} style={styles.TextStyleBold}>{props.labelText} </Text>
                    <View style={{flexDirection:'row'}}>
                    {Object.entries(props.RadioButtonBoolsObjects).map((Key)=>
                    {
                        return(
                        <CheckBox key={Key[0]}title={Key[0]}
                         disabled={props.disabled} 
                         checkedColor={props.TextColor} 
                         textStyle={styles.TextStyle} 
                         textStyle={{color:props.TextColor}} 
                         containerStyle={{backgroundColor: props.BgrColor, }} 
                         checked={Key[1]} onPress={()=>{
                            HandleCheckBoxClicked(Key[0])}}></CheckBox>
                        );
                        
                    })}
                    </View>
                    </Fragment>
    );
  };
  
  
  const styles = StyleSheet.create({
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
    },
    TextStyleBold:
    {
        fontSize:18,
        fontWeight:'bold',
        fontFamily: 'Futura',
    },
  });
export default RadioButtonsGroup;