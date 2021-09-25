import React,{Component} from "react";
import { View,Text } from "react-native";
import {  Button,ThemeProvider } from "react-native-elements";
import PropTypes from 'prop-types'


class CustomCounter extends Component
{
    static propTypes=
    {
        numOfCounter:PropTypes.number.isRequired,
    }
    static defaultProps=
    {
        numOfCounter:0,
    }

    constructor(props)
    {
        super(props);
        this.state={
            counter:this.props.numOfCounter,
        }
        this.HandlePlus=this.HandlePlus.bind(this);
        this.HandleSubs=this.HandleSubs.bind(this);
    }
    HandlePlus=()=>
  {
      const {counter:c}=this.state;
      this.setState({counter:c+1});
      this.props.funcToDoWhenModifyVal(this.props.NameOfStateToChange,c+1);
  }
   HandleSubs=()=>
  {
    const {counter:c}=this.state;
      if(c-1>=0)
      {
        this.setState({counter:c-1});
        this.props.funcToDoWhenModifyVal(this.props.NameOfStateToChange,c-1);
      }
  }
  render(){
    return(
      <View>
        <Text style={this.props.labelStyle}>
          {this.props.label}
        </Text>
        <View style={{justifyContent:'center', alignContent:'center',flexDirection:'row'}}>
                <Button buttonStyle={this.props.buttonStyle} 
                titleStyle={this.props.textStyle} 
                containerStyle={this.props.containerStyle} 
                disabled={this.props.disabledSubs}
                title='-' onPress={this.HandleSubs}/>
                <Text style={this.props.textStyle}>
                    {this.state.counter}
                </Text>
                <Button buttonStyle={this.props.buttonStyle} titleStyle={this.props.textStyle} containerStyle={this.props.containerStyle} disabled={this.props.disabledPlus} title='+' onPress={this.HandlePlus}>
                </Button>
        </View>
      </View>
    );
  }
}
export default CustomCounter;