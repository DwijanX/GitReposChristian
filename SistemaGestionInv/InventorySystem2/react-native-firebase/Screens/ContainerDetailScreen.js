import React,{useState,useEffect,useRef  } from "react";
import { View,Text, StyleSheet,Share, ScrollView} from "react-native";
import { Button,Overlay } from 'react-native-elements';
import { Input } from "react-native-elements/dist/input/Input";
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'
import DetailScreen from "../CustomComponents/DetailScreen";
import QrOverlay from "../CustomComponents/QrOverlay";

const ProductDetailScreen=(props)=>
{
    const[BackUpContainer,setBackUpContainer]=useState({})
    const[Container,setContainer]=useState({})
    const[DocId,setDocId]=useState("")
    const[overlayVisible,setOverlayVisible]=useState(false)
    const[ViewMode,setViewMode]=useState(true)


    const getContainerInfo= async (DocId)=>
    {
        const dbRef=firebase.db.collection('Contenedores').doc(DocId)
        const doc= await dbRef.get();
        const ContainerData=doc.data();
        let ContainerDataAux={};
        Object.entries(ContainerData).forEach((Prop)=>{
            ContainerDataAux={...ContainerDataAux,[Prop[0]]:Prop[1]};
        });
        setContainer(ContainerDataAux)
        setBackUpContainer(ContainerDataAux)
    }
    useEffect(()=>
    {
        props.navigation.setOptions({headerShown: true});
        setDocId(props.route.params.DocId);
        getContainerInfo(props.route.params.DocId);
    },[])

    const HandleContainerUpdate=(ContainerAux)=>
    {
        setContainer(ContainerAux);
    }

    const HandleSave= async()=>
    {
        firebase.db.collection('Contenedores').doc(DocId).set(Container)
        if(BackUpContainer["Nombre"]!=Container["Nombre"] )
        {
            firebase.db.collection('ProductosContenidos').doc(DocId).set({"Nombre":Container["Nombre"]},{merge:true})
            firebase.db.collection('Listas').doc('Contenedores').set({[DocId]:{"Nombre":Container["Nombre"],"Tipo":Container["Tipo"]}},{merge:true})
        }
        let aux={}
        Object.entries(BackUpContainer).forEach((att)=>
        {
            aux={...aux,[att[0]]:Container[att[0]]}
        })
        setBackUpContainer(aux);
        setViewMode(true)
    }

    const toggleOverlay=()=>
    {
        setOverlayVisible(!overlayVisible);
    }
        return(
            <ScrollView style={styles.GralView}>
            <View style={styles.MainViewContainer}>
                <DetailScreen
                setObject={HandleContainerUpdate}
                Object={Container}
                BackUpObject={BackUpContainer}
                HandleSave={HandleSave}
                ViewMode={ViewMode}
                setViewMode={setViewMode}
                />
                <QrOverlay
                data={`{"DocId":"${DocId}"}`}
                ImageName={BackUpContainer["Nombre"]}
                visible={overlayVisible}
                toggleVisible={toggleOverlay}
                />
                <View style={styles.ButtonsContainer}>
                <Button title="Get Qr Code" buttonStyle={styles.ButtonStyle} onPress={toggleOverlay}/>

                <Button title="View Products Contained" buttonStyle={styles.ButtonStyle} onPress={()=>{props.navigation.navigate('ShowProductsContained',{DocId:DocId})}}/>
                </View>
            </View>
            </ScrollView>
        );
    
}
const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor: 'white',
    },
    MainViewContainer:
    {
        flex:1,
        alignContent:"center",
        justifyContent:"flex-start",
        backgroundColor: 'white',

    },
    ButtonStyle:{
        marginTop:10,
        width:'65%',
        marginVertical:2,
        alignItems:'center',
        alignContent:"center",
        justifyContent:'space-evenly',
        backgroundColor:"#7b838c"
    },
    ButtonsContainer:
    {
        alignItems:"center",
        textAlign:"center"
    },
  });
  
  
export default ProductDetailScreen;