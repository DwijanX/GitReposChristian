import React,{Component,Fragment,useEffect,useState} from "react";
import { View,Text, StyleSheet, AsyncStorage, ScrollView} from "react-native";
import { Button,Divider } from 'react-native-elements';
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'


const PutProductsIntoContainerScreen =(props)=>
{
    const [Containers,setContainers]=useState([]);
    const [ProductName,setProductName]=useState([]);
    const [ProductId,setProductId]=useState([]);
    const [ProductQtys,setProductQtys]=useState({});
    const [QtysInContainers,setQtysInContainers]=useState({});
    const [QtysInContainersBackUp,setQtysInContainersBackUp]=useState({});
   const [successfulLoad,setsuccessfulLoad]=useState(false);
   const [QtysIn0Template,setQtysIn0Template]=useState();
   const [StateOfCounters,setStateOfCounters]=useState();
   const [AllowEditionForEachCounter,setAllowEditionForEachCounter]=useState({});
   const [PrecioVenta,setPrecioVenta]=useState({});

    const setInitialStateOfCounters=(ContainedProducts,ProductQtys)=>  //ContainedProducts{DocId:{TypeQty:ContainedQty}} ProductQtys{TypeQty:TotalQty}
    {
        let Counters={};
        let AllowEditionForEachCounterAux={};
        if(ProductQtys!=undefined)
        {
        Object.entries(ProductQtys).forEach((Qty)=>
        {
            let CounterAux  =0;
            let AllowAddInCounter=true;
            Object.entries(ContainedProducts).forEach((ContainedQty)=>
            {
                CounterAux+=ContainedQty[1][Qty[0]];
            })
            if(CounterAux==Qty[1] || (isNaN(CounterAux) && Qty[1]==0))
            {
                AllowAddInCounter=false;
            }
            if(isNaN(CounterAux))
            {
                CounterAux=0;
            }
            Counters={...Counters,[Qty[0]]:CounterAux};
            AllowEditionForEachCounterAux={...AllowEditionForEachCounterAux,[Qty[0]]:AllowAddInCounter}
        })
        }
        setStateOfCounters(Counters);
        setAllowEditionForEachCounter(AllowEditionForEachCounterAux);
    }
    const getInfo=async(DocId)=>
    {
        const ContainersAux=[];
        firebase.db.collection('Listas').doc('Contenedores').get().then((doc)=>
        {
            if(doc.data()!=undefined)
            {
            Object.entries(doc.data()).forEach((Container)=>
            {
                let Data={
                    DocId:Container[0], 
                    Name:Container[1].Nombre,
                    Type:Container[1].Tipo,
                }
              ContainersAux.push(Data);
            })
            }
            
          setContainers(ContainersAux);
        })
        await firebase.db.collection('Productos/'+DocId+'/ContenidoEn').doc(DocId).get().then(Doc=>
        {
                let auxData=Doc.data();
                if(auxData==undefined)
                {
                    auxData={};
                }
                setQtysInContainers(auxData);
                setQtysInContainersBackUp(auxData);
                setInitialStateOfCounters(auxData,props.route.params.Cantidades);
        }
        ).then(()=>
        {
            setsuccessfulLoad(true);
        })
    }
    
    useEffect(()=>
    {
        props.navigation.setOptions({headerShown: true});
        setProductName(props.route.params.Name);
        setProductId(props.route.params.DocId);
        setProductQtys(props.route.params.Cantidades);
        setPrecioVenta(props.route.params.PrecioVenta);
        getInfo(props.route.params.DocId);
        let templateQtys={}
        Object.entries(props.route.params.Cantidades).forEach((Qty)=>
        {
            templateQtys={...templateQtys,[Qty[0]]:0}
        })
        setQtysIn0Template(templateQtys);

    },[])
    const HandleCounters=(Mod,value)=> //Mod=[docid,TypeQty]  
    {
        let auxData=QtysInContainers[Mod[0]];
        auxData={...auxData,[Mod[1]]:auxData[Mod[1]]+value};
        const c=StateOfCounters;
        setStateOfCounters({...c,[Mod[1]]:c[Mod[1]]+value});
        setQtysInContainers({...QtysInContainers,[Mod[0]]:auxData})
        if(c[Mod[1]]+value>=ProductQtys[Mod[1]])
        {
            setAllowEditionForEachCounter({...AllowEditionForEachCounter,[Mod[1]]:false})
        }
        else if(c[Mod[1]]+value<ProductQtys[Mod[1]])
        {
            setAllowEditionForEachCounter({...AllowEditionForEachCounter,[Mod[1]]:true})
        }
    }
    const HandleCreationOfCounters=(Container)=>  //{Description,DocId, Name,Type}
    {
        if(successfulLoad && (QtysInContainersBackUp[Container.DocId]==undefined || Object.keys(QtysInContainersBackUp[Container.DocId]).length!=Object.keys(QtysIn0Template).length))
        {
            let aux=Object.assign({}, QtysIn0Template)
            for(let key in QtysInContainersBackUp[Container.DocId])
            {
                aux[key]=QtysInContainersBackUp[Container.DocId][key];
            }
            setQtysInContainersBackUp({...QtysInContainersBackUp,[Container.DocId]:aux});
            setQtysInContainers({...QtysInContainersBackUp,[Container.DocId]:aux});
        }
        if(QtysInContainersBackUp[Container.DocId]!=null && successfulLoad)
        {
            return(
                <Fragment key={Container.DocId}>
                <Text style={styles.TitleStyle}>{Container.Name}</Text>
                {Object.entries(QtysInContainersBackUp[Container.DocId]).map((Qty)=> //[TypeOfQty,Qty]
                {
                    return(
                    <CustomCounter 
                        key={Qty[0]}
                        numOfCounter={Qty[1]} 
                        textStyle={styles.TextStyle} 
                        buttonStyle={styles.CounterButtonsStyle}
                        disabledPlus={!AllowEditionForEachCounter[Qty[0]]}
                        containerStyle={styles.ContainerCounter}
                        label={"Cantidad: "+Qty[0]}
                        labelStyle={styles.TextStyle} 
                        funcToDoWhenModifyVal={HandleCounters}
                        NameOfStateToChange={[Container.DocId,Qty[0]]}
                            >
                    </CustomCounter>
                    );
                })}
                <Divider orientation="horizontal" />
                </Fragment>
                );
        }
        
    }
    const HandleSave=()=>
    {
        let EmptyModifiedQtys=true;
        let ModifiedQtys={};
        Object.entries(QtysInContainers).forEach((DocQty)=>
        {
            let aux={}
            Object.entries(DocQty[1]).forEach((ProductQty)=>
            {
                if(ProductQty[1]!=QtysInContainersBackUp[DocQty[0]][ProductQty[0]])
                {
                    aux={...aux,[ProductQty[0]]:ProductQty[1]}
                }
            })
            if(Object.keys(aux).length!=0)
            {
                ModifiedQtys={...ModifiedQtys,[DocQty[0]]:aux}; 
                EmptyModifiedQtys=false;
            }
        })
        if(EmptyModifiedQtys==false)
        {
            Object.entries(ModifiedQtys).forEach((Qty)=>  //QTY[{ContainerID,Qtys}]
            {
                firebase.db.collection('ProductosContenidos').doc(Qty[0]).set
                (
                    {
                        [ProductId]:
                        {
                            Nombre:ProductName,
                            "Precio de venta":PrecioVenta,
                            Cantidades:Qty[1]
                        }
                    },{merge:true}
                )
            }
            )
            firebase.db.collection('Productos/'+ProductId+'/ContenidoEn').doc(ProductId).set(ModifiedQtys,{merge:true}).then(()=>
            {
                let QtysInContainersBackUpPointer=QtysInContainersBackUp
                QtysInContainersBackUpPointer=Object.assign({}, QtysInContainers)
                alert("Se registro correctamente") 
            })
        }
    }
    return(
        <ScrollView style={styles.GralView}>
            <Text style={styles.TitleStyle}>
                {ProductName}
            </Text>
            <Text style={styles.TextStyle}>
                Cantidades maximas disponibles
            </Text>
            {Object.entries(ProductQtys).map((Qty)=>
                {
                    return (<Text key={Qty[0]} style={styles.TextStyle}>
                        {Qty[0]} : {Qty[1]}
                        </Text>)
                })}
            <Divider orientation="horizontal" />
            <View style={styles.SubView}>
            {
                Containers.length>0 &&
                    Containers.map((Container)=>HandleCreationOfCounters(Container))
            }
            </View>
            {
                Containers.length>0 &&            
                <Button title="Guardar" onPress={HandleSave}/>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor: 'white',
    },
    SubView:
    {
        backgroundColor: 'white',
        paddingVertical:5
    },
    CounterButtonsStyle:
    {
        height:50,
        width:40,
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:'#2189db',
    },
    TitleStyle:
    {
        fontSize:20,
        fontFamily: 'Futura',
        color:'black',
        fontWeight:'bold'
    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'black'
    },
    ContainerCounter:
    {
        paddingHorizontal:20
    }
  });
export default PutProductsIntoContainerScreen;