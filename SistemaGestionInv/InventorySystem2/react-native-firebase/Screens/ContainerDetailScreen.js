import React,{Component} from "react";
import { View,Text, StyleSheet} from "react-native";
import { Button,Divider } from 'react-native-elements';
import { Input } from "react-native-elements/dist/input/Input";
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'
import DetailScreen from "../CustomComponents/DetailScreen";
class ProductDetailScreen extends Component
{
    constructor(props)
  {
      super(props);
      this.state={
        BackUpContainer:{},
        Container:{},
        DocId:"",
      }
      this.HandleContainerUpdate=this.HandleContainerUpdate.bind(this);
      this.getContainerInfo=this.getContainerInfo.bind(this);
      this.HandleSave=this.HandleSave.bind(this);
  }
    getContainerInfo= async (DocId)=>
    {
        const dbRef=firebase.db.collection('Contenedores').doc(DocId)
        const doc= await dbRef.get();
        const ContainerData=doc.data();
        let ContainerDataAux={};
        Object.entries(ContainerData).forEach((Prop)=>{
            ContainerDataAux={...ContainerDataAux,[Prop[0]]:Prop[1]};
        });
        this.setState({Container:ContainerDataAux});
        this.setState({BackUpContainer:ContainerDataAux});
        console.log(ContainerDataAux)
    }
    componentDidMount()
    {
        this.setState({DocId:this.props.route.params.DocId});
        this.getContainerInfo(this.props.route.params.DocId);
    }
    HandleContainerUpdate=(ContainerAux)=>
    {
        this.setState({Container:ContainerAux})
    }
    HandleSave= async()=>
    {
        const ProductInfo=this.state.Product;
        firebase.db.collection('Contenedores').doc(this.state.DocId).set(ProductInfo);
        Object.entries(this.state.BackUpContainer) .forEach((att)=>
        {
            const {BackUpContainer:BUC}=this.state;
            const {Container:Ct}=this.state;
            this.setState({BackUpContainer:{...BUC ,[att[0]]:Ct[att[0]]}});
        })

    }
    render(){
        return(
            <View style={styles.MainViewContainer}>
                <DetailScreen
                setObject={this.HandleContainerUpdate}
                Object={this.state.Container}
                BackUpObject={this.state.BackUpContainer}
                HandleSave={this.HandleSave}
                TitleText={this.state.BackUpContainer['Nombre']}
                SubTitleText={this.state.BackUpContainer['Tipo']}
                />
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
  
  
export default ProductDetailScreen;