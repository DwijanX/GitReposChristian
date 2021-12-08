import React,{Component,Fragment} from "react";
import { View,Text, StyleSheet} from "react-native";
import { Button,Divider } from 'react-native-elements';
import { Input } from "react-native-elements/dist/input/Input";
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'
import { render } from "react-dom";
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonsGroup from '../CustomComponents/RadioButtonsGroup'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

/*

                        {Object.entries(ObjectAtt[1]).map((Cantidad)=>
                        {
                            return(
                                <Text key={Cantidad[0]}  style={styles.TextStyle}>
                                    {Cantidad[0]} : {Cantidad[1]}
                                </Text>
                            );
                        })}*/
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
        open:false,
        CriticityValue:"",
        Criticality:{"baja":false,"moderada":false,"alta":false},
        QtysHeadTable: ['Nombre', 'Cantidad'],
      }
      this.HandleChangeAtt=this.HandleChangeAtt.bind(this);
      this.HandleCreationOfAppropiateComps=this.HandleCreationOfAppropiateComps.bind(this);
      this.HandleViewMode=this.HandleViewMode.bind(this);
      this.setCriticalityToRadioButtons=this.setCriticalityToRadioButtons.bind(this);
      this.setCriticalityToInitialState=this.setCriticalityToInitialState.bind(this);
      this.setObjectAsBackUpObject=this.setObjectAsBackUpObject.bind(this);
  }
    HandleChangeAtt= (ProductAtt,newValue)=>
    {
        this.props.setObject({...this.props.Object,[ProductAtt]:newValue});
    }
    setCriticalityToRadioButtons=(Crit)=>
    {
        this.props.setObject({...this.props.Object,["Criticidad"]:Crit});
    }
    HandleCreationOfAppropiateComps= (ObjectAtt)=>
    {

        if(ObjectAtt[0]!='Nombre' && ObjectAtt[0]!='Tipo')
        {
            if(ObjectAtt[0]=='Cantidades')
            {
                let QtysBodyTableAux=[]
                Object.entries(ObjectAtt[1]).forEach((Cantidad)=>
                {
                    QtysBodyTableAux.push([Cantidad[0],Cantidad[1]])
                })
                return(
                    <View style={styles.NotInputContainers} key={ObjectAtt[0]} >
                        <Text style={styles.TextStyleBold}>Cantidades</Text>
                        <Table borderStyle={{borderWidth: 2, borderColor: 'black'}}>
                            <Row data={this.state.QtysHeadTable}/>
                            <Rows data={QtysBodyTableAux} />
                        </Table>
                    </View> 
                    );
            }
            else if(ObjectAtt[0]=='Criticidad')
            {
                const CriticalityAux=this.state.Criticality
                CriticalityAux[this.props.Object["Criticidad"]]=true
                return(
                <View style={styles.NotInputContainers} key={ObjectAtt[0]}>
                    <RadioButtonsGroup 
                    RadioButtonBoolsObjects={this.state.Criticality}
                    FuncToUpdateWithKey={this.setCriticalityToRadioButtons}
                    labelText={ObjectAtt[0]}
                    selectedKey={this.props.Object["Criticidad"]}
                    disabled={this.props.ViewMode}
                    />
                </View>);
            }
            else if(isNaN(ObjectAtt[1]))
            {
            
                return(<Input key={ObjectAtt[0]} 
                labelStyle={styles.TextStyle}  inputStyle={styles.TextStyle}
                label={ObjectAtt[0]} 
                disabled={this.props.ViewMode} 
                onChangeText={(value)=>this.HandleChangeAtt(ObjectAtt[0],value)}>
                    {ObjectAtt[1]}
                </Input>);
            }
            else
            {
                return(<Input key={ObjectAtt[0]} 
                    labelStyle={styles.TextStyle}  inputStyle={styles.TextStyle}
                    keyboardType="numeric"
                    label={ObjectAtt[0]} 
                    disabled={this.props.ViewMode}
                    onChangeText={(value)=>this.HandleChangeAtt(ObjectAtt[0],parseInt(value) )}>
                        {ObjectAtt[1]}
                    </Input>);
            }
    }
    }
    setCriticalityToInitialState=()=>
    {
        const Crit={"baja":false,"moderada":false,"alta":false}
        Crit[this.props.BackUpObject["Criticidad"]]=true
        this.setState({...this.state,["Criticality"]:Crit})
    }
    setObjectAsBackUpObject=()=>
    {
        this.props.setObject(this.props.BackUpObject)
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
            this.setObjectAsBackUpObject();
            this.setCriticalityToInitialState();
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
                <Divider style={styles.DetailsMarginBottom} orientation="horizontal" />
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
        backgroundColor: 'white',
        alignContent:"center",
        justifyContent:"flex-start"  
    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'black'
    },
    TextStyleBold:
    {
        fontSize:18,
        fontWeight:'bold',
        fontFamily: 'Futura',
        color:'black'
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
        color:'black'

    },
    SubTitleCont:
    {
        fontSize:15,
        fontFamily: 'Futura',
        color:'black'
    },
    NotInputContainers:
    {
        marginHorizontal:7
    },
    DetailsMarginBottom:
    {
        marginBottom:10
    }
  });
  
  
export default DetailScreen;