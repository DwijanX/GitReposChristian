import React,{Component,Fragment} from "react";
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
        if(ObjectAtt[0]!='Nombre' && ObjectAtt[0]!='Tipo')
        {
        if(ObjectAtt[0]=='Tallas')
        {
            return(
                <View  key={ObjectAtt[0]} >
                    <Text>Tallas</Text>
                    {Object.entries(ObjectAtt[1]).map((Talla)=>
                    {
                        return(
                            <Text key={Talla[0]} >
                                {Talla[0]} : {Talla[1]}
                            </Text>
                        );
                    })}
                </View> 
                );
        }
        else
        {
        
            return(<Input key={ObjectAtt[0]} 
            label={ObjectAtt[0]} 
            disabled={this.props.ViewMode} 
            onChangeText={(value)=>this.HandleChangeAtt(ObjectAtt[0],value)}>
                {ObjectAtt[1]}
            </Input>);
        }
    }
    }
    HandleViewMode=()=>
    {
        if(this.props.ViewMode)
        {
            this.props.setViewMode(false);
            this.setState({EditionModeTittle:"Cancel"});
        }
        else
        {
            this.props.setViewMode(true);
            this.setState({EditionModeTittle:'Enable edition mode'});
        }
    }
    render(){
        return(
            <Fragment >
                <View style={styles.SubViewTitle}>
                    <Text style={styles.TittleTextCont}>
                        {this.props.BackUpObject['Nombre']}
                    </Text>
                    <Text style={styles.SubTitleCont}>
                       {this.props.BackUpObject['Tipo']}
                    </Text>
                </View>
                <Divider orientation="horizontal" />
                <View key={this.state.EditionModeTittle}>

                <Input 
                    label={'Nombre'} 
                    disabled={this.props.ViewMode} 
                    onChangeText={(value)=>this.HandleChangeAtt('Nombre',value)}>
                        {this.props.BackUpObject['Nombre']}
                </Input>
                <Input 
                    label={'Tipo'} 
                    disabled={this.props.ViewMode} 
                    onChangeText={(value)=>this.HandleChangeAtt('Tipo',value)}>
                        {this.props.BackUpObject['Tipo']}
                </Input>
                
                {Object.entries(this.props.BackUpObject).map((ObjectAtt)=>this.HandleCreationOfAppropiateComps(ObjectAtt))}
                </View>
                <Divider orientation="horizontal" />
                <Button title={this.state.EditionModeTittle}  onPress={this.HandleViewMode}/>
                <Button title={"Save"}  onPress={this.props.HandleSave}/>
            </Fragment>
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