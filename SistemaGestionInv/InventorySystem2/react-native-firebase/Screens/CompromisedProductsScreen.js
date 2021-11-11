import React,{Fragment, useEffect,useState} from "react";
import { View,Text, StyleSheet} from "react-native";
import { Button,Divider,ListItem,Overlay } from 'react-native-elements';
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'
import DropDownPicker from 'react-native-dropdown-picker';


const CompromisedProductsScreen=(props)=>
{
    const [CompromisedProducts,setCompromisedProducts]=useState({})
    const [SelectedProducts,setSelectedProducts]=useState([]);
    const [ProductChecks,setProductChecks]=useState({});
    const getCompromisedProducts=()=>
    {
        firebase.db.collection("ProductosContenidos").doc("CompromisedProducts").get().then((doc)=>
        {
            setCompromisedProducts(doc.data())
            setProductChecksObj(doc.data());
        })
    }
    const setProductChecksObj=(compromisedProducts)=>
    {
        let auxChecks={}
        Object.keys(compromisedProducts).forEach((ProductKey)=>
        {
            auxChecks={...auxChecks,[ProductKey]:false}
        })
        setProductChecks(auxChecks);
    }
    useEffect(()=>
    {
        props.navigation.setOptions({headerShown: true});
        getCompromisedProducts()
    },[]);

    const HandleClickOnListItem=(IdItem)=>
    {
        let aux=SelectedProducts;
        if(aux.includes(IdItem))
        {
            aux.pop(IdItem);
            setProductChecks({ProductChecks,[IdItem]:false})
        }
        else
        {
            aux.push(IdItem);
            setProductChecks({ProductChecks,[IdItem]:true})
        }
    }
    const HandleRevert=()=>
    {
        if(SelectedProducts.length!=0)
        {
        SelectedProducts.forEach((Id) => {
            let ProductData=CompromisedProducts[Id];
            firebase.db.collection('ProductosContenidos').doc(ProductData["ContainerId"]).set({ //revert to container
                [ProductData["ProductId"]]:{
                    ["Nombre"]:ProductData["Nombre"],
                    ["Precio de venta"]: ProductData["Precio de venta"],
                    ["Cantidades"]:{
                        [ProductData["Nombre cantidad"]]:firebase.FieldValue.increment(ProductData["Cantidad"])
                    }
                }
            },{merge:true})
            firebase.db.collection('Productos').doc(ProductData["ProductId"]).set({
                ["Cantidades"]:{
                    [ProductData["Nombre cantidad"]]:firebase.FieldValue.increment(ProductData["Cantidad"])
                }
            },{merge:true})
            firebase.db.collection('Productos/'+ProductData["ProductId"]+"/ContenidoEn").doc(ProductData["ProductId"]).set({
                [ProductData["ContainerId"]]:{
                    [ProductData["Nombre cantidad"]]:firebase.FieldValue.increment(ProductData["Cantidad"])
                }
            },{merge:true})
            delete CompromisedProducts[Id]

        });
        setCompromisedProducts(CompromisedProducts);
        firebase.db.collection("ProductosContenidos").doc("CompromisedProducts").set(CompromisedProducts)
        setSelectedProducts([])
         }
    }
    const HandleConfirmation=()=>
    {
        if(SelectedProducts.length!=0)
        {
            let aux={}
            SelectedProducts.forEach((Id) => {
                aux={...aux,[Id]:{
                    'Operacion':'Venta',
                    "Fecha de venta":CompromisedProducts[Id]["Agregacion"],
                    "Cantidad":CompromisedProducts[Id]["Cantidad"],
                    "Nombre":CompromisedProducts[Id]["Nombre"],
                    "Nombre cantidad":CompromisedProducts[Id]["Nombre cantidad"],
                    "Precio de venta":CompromisedProducts[Id]["Precio de venta"],
                    "Ganancia":CompromisedProducts[Id]["Precio de venta"]*CompromisedProducts[Id]["Cantidad"]
                }}
                delete CompromisedProducts[Id]
            });
            setCompromisedProducts(CompromisedProducts);
            firebase.db.collection("ProductosContenidos").doc("CompromisedProducts").set(CompromisedProducts)
            var today = new Date();
            firebase.db.collection('Historial').doc(`${today.getMonth()+1}${today.getUTCFullYear()}`).set(aux,{merge:true})
            setSelectedProducts([])
         }
    }
    return(
    <View  >
         {
            Object.entries(CompromisedProducts).map((Product)=>  //[Date,{Cantidad,Nombre,NombreContenedor,ContainerId,ProductId}]
                {
                    return(
                        <ListItem
                            key={Product[0]} 
                            bottomDivider 
                            onPress={()=>HandleClickOnListItem(Product[0])}
                        >
                            <ListItem.CheckBox checked={ProductChecks[Product[0]]}/>
                            <ListItem.Chevron/>
                            <ListItem.Content>
                                <ListItem.Title>{Product[1]["Nombre"]}</ListItem.Title>
                                <ListItem.Subtitle>Contenedor: {Product[1]["Nombre del contenedor"]}</ListItem.Subtitle>
                                <ListItem.Subtitle>{Product[1]["Nombre cantidad"]}: {Product[1]["Cantidad"]}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })
        }
        <Button  title="Revertir" onPress={HandleRevert}/>
        <Button  title="Confirmar Venta" onPress={HandleConfirmation}/>
        
    </View>
    );
    
}
const styles = StyleSheet.create({
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
  
export default CompromisedProductsScreen