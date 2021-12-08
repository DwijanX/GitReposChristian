import React,{Fragment, useEffect,useState} from "react";
import { View,Text, StyleSheet, ScrollView} from "react-native";
import { Button,Divider,ListItem,Overlay } from 'react-native-elements';
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'
import DropDownPicker from 'react-native-dropdown-picker';


const ABCScreen=(props)=>
{
    const [ATypeProducts,setATypeProducts]=useState([])
    const [BTypeProducts,setBTypeProducts]=useState([])
    const [CTypeProducts,setCTypeProducts]=useState([])
    const [SelectedProduct,setSelectedProduct]=useState("")
    const [ROP,setROP]=useState()
    const [visible,setVisible]=useState(false)
    const toggleOverlay = () => {
        setVisible(!visible);
      };
    const CalculateROP=(Product)=>
    {
        let DemandMonth=Product["Demanda mensual"];
        let LeadTimeMonth=Product["Tiempo de reabastecimiento"]/30;
        setROP(Math.ceil(DemandMonth*LeadTimeMonth));
    }
    const getProductsData=()=>
    {
        let Products=firebase.db.collection("Productos").get().then( (Snapshot)=>
        {
            let ans=[];
            Snapshot.forEach((Doc)=>
            {
                let data=Doc.data();
                let aux={
                    ["Id"]:Doc.id,
                    ["Nombre"]:data["Nombre"],
                    ["Demanda mensual"]:data["Demanda mensual"],
                    ["Criticidad"]:data["Criticidad"],
                    ["Costo"]:data["Costo"],
                    ["Ganancia"]:data["Precio de venta"]-data["Costo"],
                    ["Tiempo de reabastecimiento"]:data["Tiempo de reabastecimiento [dias]"]
                }
                ans.push(aux)
            })
            return ans;

        })
        return Products;

    }
    const HandleClassificationOfDemand=(Demand)=>
    {
        let ans;
        if(Demand>=6)
        {
            const Alta=1;
            ans=Alta;
        }
        else if(Demand>=3 && Demand<=5)
        {
            const Moderada=0.78;
            ans=Moderada;
        }
        else
        {
            const Baja=0.33;
            ans=Baja;
        }
        return ans;
    }
    const HandleClassificationOfLeadTime=(LeadTime)=>
    {
        let ans;
        if(LeadTime>=7)
        {
            ans=0.33;
        }
        else if(LeadTime>=4 && LeadTime<=6)
        {
            ans=0.78;
        }
        else
        {
            ans=1;
        }
        return ans;
    }
    const HandleClassificationOfCriticality=(Criticality)=>
    {
        let ans;
        if(Criticality=="alta")
        {
            ans=1;
        }
        else if(Criticality=="moderada")
        {
            ans=0.78;
        }
        else
        {
            ans=0.33;
        }
        return ans;
    }
    const HandleClassificationOfProfit=(Profit,Cost)=>
    {
        let aux=Profit/Cost;
        if(aux>1)
        {
            aux=1;
        }
        return 1;
    }
    const ClassifyProducts=async()=>
    {
        let ProductsData=await getProductsData();
        let AProducts=[];
        let BProducts=[];
        let CProducts=[];
        await ProductsData.forEach((Product)=>
        {
            let classification=0.4*HandleClassificationOfDemand(Product["Demanda mensual"])+0.3*HandleClassificationOfCriticality(Product["Criticidad"])+
            0.15*HandleClassificationOfLeadTime(Product["Tiempo de reabastecimiento"])+0.15*HandleClassificationOfProfit(Product["Ganancia"],Product["Costo"]);
            if (classification*100>=85) 
            {
                AProducts.push(Product);
            } 
            else if (classification*100>=50) 
            {
                BProducts.push(Product);
            } 
            else 
            {
                CProducts.push(Product);
            }
        })
        setATypeProducts(AProducts);
        setBTypeProducts(BProducts);
        setCTypeProducts(CProducts);

    }

    useEffect(()=>
    {
        props.navigation.setOptions({headerShown: true});
        ClassifyProducts();
    },[]);
    const getListOfArrayOfProducts=(Array)=>
    {
        return(Array.map((Product)=>  
            {
                return(
                        <ListItem 
                            containerStyle={styles.GralView}
                            key={Product["Id"]} 
                            bottomDivider 
                            onPress={()=>
                            {
                                CalculateROP(Product);
                                setSelectedProduct(Product["Nombre"]);
                                toggleOverlay();
                            }}
                        >
                            <ListItem.Chevron/>
                            <ListItem.Content>
                                <ListItem.Title style={styles.TextStyle}>{Product["Nombre"]}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                );
            }));
    
    }
    return(
    <ScrollView style={styles.GralView} >
        <Overlay  isVisible={visible} overlayStyle={styles.OverStyle} onBackdropPress={toggleOverlay}> 
                    <Text>{SelectedProduct}</Text>
                    <Text>Punto de Reorden:{ROP}</Text>
        </Overlay>
        <Text style={styles.TextStyle}>Productos Tipo A</Text>
            {getListOfArrayOfProducts(ATypeProducts)}
        <Divider></Divider>
        <Text style={styles.TextStyle}>Productos Tipo B</Text>
            {getListOfArrayOfProducts(BTypeProducts)}
        <Divider></Divider>
        <Text style={styles.TextStyle}>Productos Tipo C</Text>
            {getListOfArrayOfProducts(CTypeProducts)}
        <Divider></Divider>
    </ScrollView>
    );
    
}
const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor: 'white',
    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'black'
    },
  });
  
export default ABCScreen


