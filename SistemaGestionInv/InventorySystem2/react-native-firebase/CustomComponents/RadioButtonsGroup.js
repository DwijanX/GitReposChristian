import React,{Component,Fragment,useEffect,useState} from 'react';
import { View,StyleSheet, ScrollView,Text,Dimensions, Platform, PixelRatio} from 'react-native';
import { Button,Overlay,CheckBox } from 'react-native-elements';


const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;
function normalize(size) 
{
    const newSize = size * scale 
    if (Platform.OS === 'ios') 
    {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } 
    else 
    {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}
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
                    <View style={{width:"100%",flexDirection:'row'}}>
                    {Object.entries(props.RadioButtonBoolsObjects).map((Key)=>
                    {
                        return(
                        <CheckBox key={Key[0]}title={Key[0]}
                         disabled={props.disabled} 
                         checkedColor={props.TextColor} 
                         textStyle={{...styles.TextStyle,["color"]:props.TextColor}} 
                         containerStyle={{...styles.containerStyleCheckBox,["backgroundColor"]:props.BgrColor}} 
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
        fontSize:normalize(12),
        fontFamily: 'Futura',
    },
    TextStyleBold:
    {
        fontSize:18,
        fontWeight:'bold',
        fontFamily: 'Futura',
    },
    containerStyleCheckBox:
    {
        width:"28%",
        height:45,
    }
  });
export default RadioButtonsGroup;