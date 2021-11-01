import React,{useEffect,useState} from "react";
import { View,Text, StyleSheet} from "react-native";
import { Button,Divider,ListItem } from 'react-native-elements';
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'

const ShowProductsContained=(props)=>
{
    const [Name,setName]=useState("");
    const [ProductsContained,setProductsContained]=useState({});

    useEffect(()=>
    {
        firebase.db.collection('ProductosContenidos').doc(props.route.params.DocId).get().then((doc)=>
        {
            let data=doc.data();
            setName(data["Nombre"]);
            delete data.Nombre; 
            setProductsContained(data);
        })
    },[]);
    const HandleCreationOfSubTitle=(Product)=>
    {
        let message=""
        Object.entries(Product[1]["Cantidades"]).forEach(Cantidad => {
            message+=Cantidad[0]+": "+Cantidad[1]+" ";
        })
        return message;
    }
    return(
    <View  >
        {
            Object.entries(ProductsContained).map((Product)=>
                {
                    let SubTitle=HandleCreationOfSubTitle(Product)
                    return(
                        <ListItem
                            key={Product[0]} 
                            bottomDivider 
                            onPress={()=>
                            {
                                props.navigation.navigate('ProductDetailScreen',{DocId:Product[0]});
                            }}
                        >
                            <ListItem.Chevron/>
                            <ListItem.Content>
                                <ListItem.Title>{Product[1].Nombre}</ListItem.Title>
                                <ListItem.Subtitle>Cantidades:{SubTitle}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })
        }

    </View>
    );
    
}
export default ShowProductsContained