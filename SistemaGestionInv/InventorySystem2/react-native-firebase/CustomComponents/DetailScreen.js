import React,{Component} from "react";
import { View,Text, StyleSheet} from "react-native";
import { Button,Divider } from 'react-native-elements';
import { Input } from "react-native-elements/dist/input/Input";
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'
import { render } from "react-dom";
class DetailScreen extends Component
{
    constructor(props)
  {
      super(props);
      this.state={
        ViewMode:true,
        EditionModeTittle:'Enable edition mode',
        BackUpProduct:{},
        Product:{},
        DocId:"",
      }
      this.HandleChangeAtt=this.HandleChangeAtt.bind(this);
      this.HandleCreationOfAppropiateComps=this.HandleCreationOfAppropiateComps.bind(this);
      this.HandleViewMode=this.HandleViewMode.bind(this);
  }
    HandleChangeAtt= (ProductAtt,newValue)=>
    {
        this.props.setObject({...this.props.Object,[ProductAtt]:newValue});
    }
    HandleCreationOfAppropiateComps= (ObjectAtt)=>
    {
        if(typeof ObjectAtt[1]=='number')
        {
            return(
                <CustomCounter key={ObjectAtt[0]} 
                numOfCounter={this.props.Object[ObjectAtt[0]]} 
                textStyle={styles.CounterTextStyle} 
                buttonStyle={styles.CounterButtonsStyle}
                disabledPlus={this.state.ViewMode}
                disabledSubs={true}
                containerStyle={styles.ContainerCounter}
                label={ObjectAtt[0]}
                labelStyle={styles.SubTitleCont} 
                funcToDoWhenModifyVal={this.HandleChangeAtt}
                NameOfStateToChange={ObjectAtt[0]}
                ></CustomCounter>
                );
        }
        else
        {
        
            return(<Input key={ObjectAtt[0]} 
            label={ObjectAtt[0]} 
            disabled={this.state.ViewMode} 
            onChangeText={(value)=>this.HandleChangeAtt(ObjectAtt[0],value)}>
                {ObjectAtt[1]}
            </Input>);
        }
    }
    HandleViewMode=()=>
    {
        if(this.state.ViewMode)
        {
            this.setState({ViewMode:false});
            this.setState({EditionModeTittle:"Cancel"});
        }
        else
        {
            this.setState({ViewMode:true});
            this.setState({EditionModeTittle:'Enable edition mode'});
        }
    }
    render(){
        return(
            <View style={styles.MainViewContainer}>
                <View style={styles.SubViewTitle}>
                    <Text style={styles.TittleTextCont}>
                        {this.props.TitleText}
                    </Text>
                    <Text style={styles.SubTitleCont}>
                       {this.props.SubTitleText}

                    </Text>
                </View>
                <Divider orientation="horizontal" />
                <View key={this.state.EditionModeTittle}>
                
                {Object.entries(this.props.BackUpObject).map((ObjectAtt)=>this.HandleCreationOfAppropiateComps(ObjectAtt))}
                </View>
                <Divider orientation="horizontal" />
                <Button title={this.state.EditionModeTittle}  onPress={this.HandleViewMode}/>
                <Button title={"Save"}  onPress={this.props.HandleSave}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    MainViewContainer:
    {
        flex:1,
        alignContent:"center",
        justifyContent:"flex-start"  
    },
    SubViewTitle:
    {
        paddingVertical:15,
        width:"100%",
        alignContent:"center",
        alignItems:'center',
        justifyContent:"center"  
    },
    TittleTextCont:
    {
        fontSize:30,
        fontFamily: 'Futura',
    },
    SubTitleCont:
    {
        fontSize:15,
        fontFamily: 'Futura',
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
  
  
export default DetailScreen;