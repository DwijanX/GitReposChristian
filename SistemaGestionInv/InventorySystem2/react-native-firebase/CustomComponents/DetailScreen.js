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
        EditionModeTittle:'Habilitar modo edicion',
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
            if(ObjectAtt[0]=='Cantidades')
            {
                return(
                    <View  key={ObjectAtt[0]} >
                        <Text style={styles.TextStyle}>Cantidades</Text>
                        {Object.entries(ObjectAtt[1]).map((Cantidad)=>
                        {
                            return(
                                <Text key={Cantidad[0]}  style={styles.TextStyle}>
                                    {Cantidad[0]} : {Cantidad[1]}
                                </Text>
                            );
                        })}
                    </View> 
                    );
            }
            else
            {
            
                return(<Input key={ObjectAtt[0]} 
                labelStyle={styles.TextStyle}  inputStyle={styles.TextStyle}
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
            this.setState({EditionModeTittle:"Deshabilitar modo edicion"});
        }
        else
        {
            this.props.setViewMode(true);
            this.setState({EditionModeTittle:'Habilitar modo edicion'});
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
                    labelStyle={styles.TextStyle}  inputStyle={styles.TextStyle}
                    label={'Nombre'} 
                    disabled={this.props.ViewMode} 
                    onChangeText={(value)=>this.HandleChangeAtt('Nombre',value)}>
                        {this.props.BackUpObject['Nombre']}
                </Input>
                <Input 
                    labelStyle={styles.TextStyle}  inputStyle={styles.TextStyle}
                    label={'Tipo'} 
                    disabled={this.props.ViewMode} 
                    onChangeText={(value)=>this.HandleChangeAtt('Tipo',value)}>
                        {this.props.BackUpObject['Tipo']}
                </Input>
                {Object.entries(this.props.BackUpObject).map((ObjectAtt)=>this.HandleCreationOfAppropiateComps(ObjectAtt))}
                </View>
                <Divider orientation="horizontal" />
                <Button title={this.state.EditionModeTittle}  onPress={this.HandleViewMode}/>
                <Button title={"Guardar"}  onPress={this.props.HandleSave}/>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    MainViewContainer:
    {
        flex:1,
        backgroundColor: '#7f8c8d',
        alignContent:"center",
        justifyContent:"flex-start"  
    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'#ecf0f1'
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
        color:'#ecf0f1'

    },
    SubTitleCont:
    {
        fontSize:15,
        fontFamily: 'Futura',
        color:'#ecf0f1'
    },
  });
  
  
export default DetailScreen;