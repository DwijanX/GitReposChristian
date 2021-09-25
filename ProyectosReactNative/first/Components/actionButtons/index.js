import React, {Component} from "react";
import { TouchableOpacity,Text, StyleSheet } from "react-native";
import { Fragment } from "react";

class ActionButtons extends Component
{
    render(){
    const{actionreset,actionplus}=this.props;
    return (
        //el fragment me permite exportar dos o mas componentes para que el padre que los invoque lo ajuste a sus estilos
        <Fragment>
            <TouchableOpacity style={styles.ResetButtonContainer} onPress={actionreset}>
                    <Text style={styles.btnTxt}>
                        reset
                    </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ResetButtonContainer} onPress={actionplus}>
            <Text style={styles.btnTxt}>
                +10
            </Text>
            </TouchableOpacity>
        </Fragment>
    );
    }
}
const styles = StyleSheet.create({
  ResetButtonContainer:
  {
    height:50,
    width:200,
    backgroundColor:'#e74c3c',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal: 2
  },
  btnTxt:
    {
      fontSize:25,
      color: '#2c3e50',
      fontWeight: 'bold',
    }
})
export default ActionButtons;