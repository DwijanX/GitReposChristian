import React,{Component} from "react";
import { View,Text, StyleSheet} from "react-native";
import { Button,Divider } from 'react-native-elements';
import { Input } from "react-native-elements/dist/input/Input";
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'
import { render } from "react-dom";
class ProductDetailScreen extends Component
{
    constructor(props)
  {
      super(props);
      this.state={
        ViewMode:true,
        EditionModeTittle:'Enable edition mode',
        BackUpProduct:{},
        Product:{},
        DocId:{},
      }
      this.HandleChangeAtt=this.HandleChangeAtt.bind(this);
      this.HandleCreationOfAppropiateComps=this.HandleCreationOfAppropiateComps.bind(this);
      this.HandleViewMode=this.HandleViewMode.bind(this);
      this.getProductInfo=this.getProductInfo.bind(this);
      this.HandleSave=this.HandleSave.bind(this);
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
        //this.getProductInfo('b0LLQ9maF8WEWVk2uJEn');
        //this.setState({DocId:'b0LLQ9maF8WEWVk2uJEn'});

    }
    HandleChangeAtt= (ProductAtt,newValue)=>
    {
        const {Product:Pr}=this.state;
        this.setState({Product:{...Pr,[ProductAtt]:newValue}});
    }
    HandleCreationOfAppropiateComps= (ProductAtt)=>
    {
        if(typeof ProductAtt[1]=='number')
        {
            return(
                <CustomCounter key={ProductAtt[0]} 
                numOfCounter={this.state.Product[ProductAtt[0]]} 
                textStyle={styles.CounterTextStyle} 
                buttonStyle={styles.CounterButtonsStyle}
                disabledPlus={this.state.ViewMode}
                disabledSubs={this.state.ViewMode}
                containerStyle={styles.ContainerCounter}
                label={ProductAtt[0]}
                labelStyle={styles.SubTitleCont} 
                funcToDoWhenModifyVal={this.HandleChangeAtt}
                NameOfStateToChange={ProductAtt[0]}
                ></CustomCounter>
                );
        }
        else
        {
        
            return(<Input key={ProductAtt[0]} 
            label={ProductAtt[0]} 
            disabled={this.state.ViewMode} 
            onChangeText={(value)=>this.HandleChangeAtt(ProductAtt[0],value)}>
                {ProductAtt[1]}
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
    HandleSave= async()=>
    {
        const ProductInfo=this.state.Product;
        firebase.db.collection('Productos').doc(this.state.DocId).set(ProductInfo).then(()=>
        {
            this.getProductInfo(this.state.DocId);
            this.setState({ViewMode:true});
            this.setState({EditionModeTittle:'Enable edition mode'});
        })

    }
    render(){
        return(
            <View style={styles.MainViewContainer}>
                <View style={styles.SubViewTitle}>
                    <Text style={styles.TittleTextCont}>
                        {this.state.BackUpProduct.Nombre}
                    </Text>
                    <Text style={styles.SubTitleCont}>
                         {this.state.BackUpProduct.Tipo}

                    </Text>
                </View>
                <Divider orientation="horizontal" />
                <View key={this.state.EditionModeTittle}>
                
                {Object.entries(this.state.BackUpProduct).map((ProductAtt)=>this.HandleCreationOfAppropiateComps(ProductAtt))}
                </View>
                <Divider orientation="horizontal" />
                <Button title={this.state.EditionModeTittle}  onPress={this.HandleViewMode}/>
                <Button title={"Save"}  onPress={this.HandleSave}/>
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