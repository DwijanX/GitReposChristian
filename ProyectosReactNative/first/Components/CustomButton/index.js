import React from "react";
import { Component } from "react";
import {Text, TouchableOpacity,StyleSheet} from "react-native";
import PropTypes from 'prop-types'

class Button extends Component
{
  static PropTypes={
    label: PropTypes.string.isRequired,
    action: PropTypes.func,
  }
  static defaultProps=
  {
    label:'Button',
    action:()=>null,
  }
    render(){
        const{label,action}=this.props;
        return(
              <TouchableOpacity style={styles.btn} onPress={action}>
                <Text style={styles.btnTxt}>
                    {label}
                </Text>
              </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    
    btn:
    {
      width: 50,
      height: 50,
      justifyContent:"center",
      alignItems: 'center',
      backgroundColor: '#e74c3c',
    },
    btnTxt:
    {
      fontSize:18,
      color: '#2c3e50',
      fontWeight: 'bold',
    }
  });

export default Button;