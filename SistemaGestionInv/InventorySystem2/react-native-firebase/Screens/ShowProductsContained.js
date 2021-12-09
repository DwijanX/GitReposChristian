import React,{Fragment, useEffect,useState} from "react";
import { View,Text, StyleSheet, ScrollView} from "react-native";
import { Button,Divider,ListItem,Overlay } from 'react-native-elements';
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'
import DropDownPicker from 'react-native-dropdown-picker';

const ShowProductsContained=(props)=>
{
    const [Name,setName]=useState("");
    const [visible,setVisible]=useState(false)
    const [ProductsContained,setProductsContained]=useState({});
    const [open, setOpen] = useState(false);
    const [valueDP, setValueDP] = useState(0);
    const [items, setItems] = useState([]);
    const [ContainerId,setContainerId]=useState();
    const [selectedProductId,setselectedProductId]=useState()
    const [counterOfProduct,setCounterOfProduct]=useState(0)
    const [MaxOfProductReached,setMaxOfProductReached]=useState(false)
    const [ResetCounter,setResetCounter]=useState(false)

    const toggleOverlay=()=>
    {
        setVisible(!visible);
        setCounterOfProduct(0);
        setMaxOfProductReached(false);
        setValueDP(0)
    }
    useEffect(()=>
    {
        props.navigation.setOptions({headerShown: true});
        firebase.db.collection('ProductosContenidos').doc(props.route.params.DocId).get().then((doc)=>
        {
            let data=doc.data();
            setName(data["Nombre"]);
            delete data.Nombre; 
            setProductsContained(data);
        })
        setContainerId(props.route.params.DocId)
    },[]);
    const HandleCreationOfSubTitle=(Product)=>
    {
        let message=""
        Object.entries(Product[1]["Cantidades"]).forEach(Cantidad => {
            message+=Cantidad[0]+": "+Cantidad[1]+" ";
        })
        return message;
    }
    const HandleChangeOfQty=(DocId)=>
    {
        setCounterOfProduct(0);
        if(counterOfProduct==ProductsContained[DocId])
        {
            setMaxOfProductReached(true)
        }
    }
    const HandleCounterModified=(QtyName,value)=>
    {
        if(counterOfProduct+value>=ProductsContained[selectedProductId]["Cantidades"][QtyName])
        {
            setMaxOfProductReached(true)
        }
        else
        {
            setMaxOfProductReached(false)

        }
        setCounterOfProduct(counterOfProduct+value)
    }
    const HandleSave=()=>
    {
        if(valueDP!=0 && counterOfProduct>0)
        {
            let aux=ProductsContained;
            let BackupProduct=Object.assign({}, ProductsContained[selectedProductId])
            if((aux[selectedProductId]["Cantidades"][valueDP]-counterOfProduct)==0)
            {
                delete aux[selectedProductId]["Cantidades"][valueDP]
                if(Object.keys(aux[selectedProductId]["Cantidades"]).length==0)  //caso de que no hay mas cantidades
                {
                   firebase.db.collection('ProductosContenidos').doc(ContainerId).set({
                        [selectedProductId]:firebase.FieldValue.delete()
                    },{merge:true})
                    delete aux[selectedProductId]
                }
                else   //Caso de que hay mas cantidades
                {
                    firebase.db.collection('ProductosContenidos').doc(ContainerId).set({
                        [selectedProductId]:{
                            ["Cantidades"]:{
                                [valueDP]:firebase.FieldValue.delete()
                            }
                        }
                    },{merge:true})
                }
                firebase.db.collection('Productos/'+selectedProductId+'/ContenidoEn').doc(selectedProductId).set({
                    [ContainerId]:{
                        [valueDP]:firebase.FieldValue.delete()
                    }
                    },{merge:true})
            }
            else
            {
                aux[selectedProductId]["Cantidades"][valueDP]-=counterOfProduct;
                firebase.db.collection('ProductosContenidos').doc(ContainerId).set(aux,{merge:true})
                
                firebase.db.collection('Productos/'+selectedProductId+'/ContenidoEn').doc(selectedProductId).set({
                    [ContainerId]:{
                        [valueDP]:firebase.FieldValue.increment(-counterOfProduct)
                    }
                    },{merge:true})
            }

            firebase.db.collection('Productos').doc(selectedProductId).set({
                ["Cantidades"]:{
                    [valueDP]:firebase.FieldValue.increment(-counterOfProduct)
                }
            },{merge:true})

            let today = new Date();
            let key=today.getHours()+"_" + today.getMinutes()+"_" + today.getSeconds()+"_"+today.getDate()+"_"+(today.getMonth()+1)+"_"+today.getFullYear()
            firebase.db.collection('ProductosContenidos').doc('CompromisedProducts').set({
                [key]:{
                    "Nombre":BackupProduct["Nombre"],
                    "Nombre del contenedor":Name,
                    "Cantidad":counterOfProduct,
                    "Nombre cantidad":valueDP,
                    "ProductId":selectedProductId,
                    "ContainerId":ContainerId,
                    "Agregacion": firebase.FieldValue.serverTimestamp(),
                    ["Precio de venta"]: BackupProduct["Precio de venta"]

                }
            },{merge:true});
            
        }
    }
    return(
    <ScrollView style={styles.GralView} >
         <Overlay isVisible={visible} overlayStyle={styles.OverStyle} onBackdropPress={toggleOverlay}>
                <DropDownPicker
                        open={open}
                        value={valueDP}
                        items={items}
                        setOpen={(openVal)=>
                            {
                                setCounterOfProduct(0)
                                setMaxOfProductReached(false)
                                setResetCounter(true)
                                setResetCounter(false)
                                setOpen(openVal)
                            }}
                        setValue={setValueDP}
                        setItems={setItems}
                        onChangeValue={HandleChangeOfQty}
                        />
                        
                { valueDP!=0  && ResetCounter==false &&
                <CustomCounter 
                numOfCounter={counterOfProduct} 
                textStyle={styles.TextStyle} 
                buttonStyle={styles.CounterButtonsStyle}
                disabledPlus={MaxOfProductReached}
                containerStyle={styles.ContainerCounter}
                label={"Cantidad: "}//ProductsContained[selectedProductId]["Nombre"]}
                labelStyle={styles.TextStyle} 
                funcToDoWhenModifyVal={HandleCounterModified}
                NameOfStateToChange={valueDP}
                />
                 }
                 { valueDP!=0  && 
                <View style={styles.ButtonsContainer}>
                    <Button title={'Comprometer'} buttonStyle={styles.ButtonStyle} onPress={()=>{
                        HandleSave();
                        toggleOverlay();
                        }}></Button>
                    <Button title={'Cancelar'} buttonStyle={styles.ButtonStyle} onPress={toggleOverlay}></Button>
                </View>
                }
            </Overlay>
        {
            Object.entries(ProductsContained).map((Product)=>  
                {
                    let SubTitle=HandleCreationOfSubTitle(Product)
                    return(
                            <ListItem
                                containerStyle={styles.GralView}
                                key={Product[0]} 
                                bottomDivider 
                                onPress={()=>
                                {
                                    let auxItems=[]
                                    Object.keys(ProductsContained[Product[0]]["Cantidades"]).forEach(
                                        (Cantidad)=>
                                        {
                                            auxItems.push({label:Cantidad,
                                            value:Cantidad})
                                        }
                                    )
                                    setselectedProductId(Product[0]);
                                    setItems(auxItems);
                                    toggleOverlay();
                                    //props.navigation.navigate('ProductDetailScreen',{DocId:Product[0]});
                                }}
                            >
                                <ListItem.Chevron/>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.TextStyle}>{Product[1].Nombre}</ListItem.Title>
                                    <ListItem.Subtitle style={styles.SubTitleStyle}>Cantidades:{SubTitle}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                    );
                })
        }

    </ScrollView>
    );
    
}
const styles = StyleSheet.create({
    GralView:
    {
        backgroundColor: 'white',

    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'black'
    },
    SubTitleStyle:
    {
        fontSize:15,
        fontFamily: 'Futura',
        color:'black'
    },
    OverStyle:{
        height:"40%",
        width:'75%',
        backgroundColor: 'white',
    },
    ButtonStyle:{
        width:'65%',
        marginVertical:2,
        alignItems:'center',
        alignContent:"center",
        justifyContent:'space-evenly',
        backgroundColor:"#7b838c"
    },
    
    ButtonsContainer:
    {
        marginTop:20,
        alignItems:"center",
        textAlign:"center"
    },
    CounterButtonsStyle:
    {
        height:45,
        width:45,
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:'#7b838c'
    },
    ContainerCounter:
    {
        paddingHorizontal:20
    }
  });
  
export default ShowProductsContained