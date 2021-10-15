import React,{Component} from "react";
import { View,Text, StyleSheet, ScrollView} from "react-native";
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
        ViewMode:true,
        BackUpProduct:{},
        Product:{},
        DocId:"",
      }
      this.HandleProductUpdate=this.HandleProductUpdate.bind(this);
      this.getProductInfo=this.getProductInfo.bind(this);
      this.HandleSave=this.HandleSave.bind(this);
      this.setViewMode=this.setViewMode.bind(this);

  }
    getProductInfo= async (DocId)=>
    {
        const dbRef=firebase.db.collection('Productos').doc(DocId)
        const doc= await dbRef.get();
        const ProductData=doc.data();
        let ProductDataAux={};
        Object.entries(ProductData).forEach((Prop)=>{
            ProductDataAux={...ProductDataAux,[Prop[0]]:Prop[1]};
        });
        this.setState({Product:ProductDataAux});
        this.setState({BackUpProduct:ProductDataAux});
    }
    componentDidMount()
    {
        this.setState({DocId:this.props.route.params.DocId});
        this.getProductInfo(this.props.route.params.DocId);
    }
    HandleProductUpdate=(ProductAux)=>
    {
        this.setState({Product:ProductAux})
    }
    HandleSave= async()=>
    {
        const ProductInfo=this.state.Product;
        firebase.db.collection('Productos').doc(this.state.DocId).set(ProductInfo);
        this.setState({BackUpProduct:ProductInfo});
        this.setState({ViewMode:true});
    }
    setViewMode(ViewModeBool)
    {
        this.setState({ViewMode:ViewModeBool})
    }
    render(){
        return(
            <ScrollView >
                <View style={{flex:1 }}>
                <DetailScreen
                setObject={this.HandleProductUpdate}
                Object={this.state.Product}
                BackUpObject={this.state.BackUpProduct}
                HandleSave={this.HandleSave}
                ViewMode={this.state.ViewMode}
                setViewMode={this.setViewMode}
                />
                <Button title={"Set Products to containers"} 
                 onPress={()=>{
                    this.props.navigation.navigate('PutProductsIntoContainerScreen',{
                        DocId: this.state.DocId,
                        Name: this.state.Product.Nombre,
                        QtyOfProduct: this.state.Product.CantidadStock,
                     })
                     }}/>
                <Button title={"Add Products"}/>
                     </View>
            </ScrollView>
        );
    }
}
/**/
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