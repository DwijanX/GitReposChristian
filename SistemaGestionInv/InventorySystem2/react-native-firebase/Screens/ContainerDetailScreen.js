import React,{useState,useEffect,useRef  } from "react";
import { View,Text, StyleSheet,Share} from "react-native";
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
        if(BackUpContainer["Nombre"]!=Container["Nombre"])
        {
            firebase.db.collection('ProductosContenidos').doc(DocId).set({"Nombre":Container["Nombre"]},{merge:true})
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
                <Button title="Get Qr Code" onPress={toggleOverlay}/>

                <Button title="View Products Contained" onPress={()=>{props.navigation.navigate('ShowProductsContained',{DocId:DocId})}}/>
            </View>
        );
    
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