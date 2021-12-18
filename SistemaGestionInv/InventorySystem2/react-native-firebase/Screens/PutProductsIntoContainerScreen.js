import React,{Component,Fragment,useEffect,useState} from "react";
import { View,Text, StyleSheet, AsyncStorage, ScrollView} from "react-native";
import { Button,Divider } from 'react-native-elements';
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'
import { Table, Row, Rows } from 'react-native-table-component';

/*

                }
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
                })} */

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
   const [SaveButtonPressed,setSaveButtonPressed]=useState(false)
   const [ProductQtysOrderedArray,setProductQtysOrderedArray]=useState([])
   const [ShowQtysOfEachContObj,setShowQtysOfEachContObj]=useState({})

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
            let aux;
            Object.entries(ContainedProducts).forEach((ContainedQty)=>
            {
                aux=ContainedQty[1][Qty[0]]
                if(!isNaN(aux))
                {
                    CounterAux+=aux;
                }
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
        let ContainersAux=[];
        firebase.db.collection('Listas').doc('Contenedores').get().then((doc)=>
        {
            if(doc.data()!=undefined)
            {
                let ShowContainersQtys=ShowQtysOfEachContObj
            Object.entries(doc.data()).forEach((Container)=>
            {
                let Data={
                    DocId:Container[0], 
                    Name:Container[1].Nombre,
                    Type:Container[1].Tipo,
                }
              ContainersAux.push(Data);
              ShowContainersQtys={...ShowContainersQtys,[Container[0]]:false}
            })
            }
            
        const compareContainersName=( a, b )=> {
            if ( a["Name"] < b["Name"] ){
            return -1;
            }
            if ( a["Name"] > b["Name"] ){
            return 1;
            }
            return 0;
        }
        ContainersAux.sort(compareContainersName)
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
        let ProductQtysOrderedArrayPointer=ProductQtysOrderedArray
        Object.entries(props.route.params.Cantidades).forEach((Qty)=>
        {
            templateQtys={...templateQtys,[Qty[0]]:0}
            ProductQtysOrderedArrayPointer.push(Qty[0])
        })
        ProductQtysOrderedArrayPointer.sort()
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
    const MergeAndUnmergeQtysOfAContainer=(ContainerId)=>
    {
        setShowQtysOfEachContObj({...ShowQtysOfEachContObj,[ContainerId]:!ShowQtysOfEachContObj[ContainerId]})
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
                    <View style={{marginVertical:10}}>
                        <View style={{flexDirection:"row"}}>
                            <View style={{width:"70%"}}>
                                <Text style={styles.TitleStyle}>{Container.Name}</Text>
                            </View>
                            <View style={{width:"30%"}}>
                                <Button title={"Mostrar Productos"} buttonStyle={styles.ContainersButtonStyle} onPress={()=>MergeAndUnmergeQtysOfAContainer(Container.DocId)}></Button>
                            </View>
                        </View>
                        {
                            ShowQtysOfEachContObj[Container.DocId] &&
                            ProductQtysOrderedArray.map((TypeOfQty)=>
                            {
                                return(
                                    <CustomCounter 
                                        key={TypeOfQty}
                                        numOfCounter={QtysInContainers[Container.DocId][TypeOfQty]} 
                                        textStyle={styles.TextStyle} 
                                        buttonStyle={styles.CounterButtonsStyle}
                                        disabledPlus={!AllowEditionForEachCounter[TypeOfQty]}
                                        containerStyle={styles.ContainerCounter}
                                        label={"Cantidad: "+TypeOfQty}
                                        labelStyle={styles.TextStyle} 
                                        funcToDoWhenModifyVal={HandleCounters}
                                        NameOfStateToChange={[Container.DocId,TypeOfQty]}
                                            >
                                    </CustomCounter>
                                    );     
                            })
                        }
                        <Divider orientation="horizontal" />
                    </View>
                </Fragment>
                );
        }
        
    }
    const HandleCreationOfTable=()=>
    {
        let compare=( a, b )=> {
            if ( a[0] < b[0] ){
              return -1;
            }
            if ( a[0] > b[0] ){
              return 1;
            }
            return 0;
          }
        let BodyTable=[]
        let HeadTable=['Nombre', 'Cantidad']
        Object.entries(ProductQtys).forEach((Qty)=>
        {
            BodyTable.push([Qty[0],Qty[1]])
        })
        BodyTable.sort(compare)
        return(
                <View style={styles.NotInputContainers} >
                    <Text style={styles.TextStyleBold}>Cantidades</Text>
                    <Table borderStyle={{borderWidth: 2, borderColor: 'black'}}>
                        <Row data={HeadTable}/>
                        <Rows data={BodyTable} />
                    </Table>
                </View> 
        );
    }
    const HandleSave=()=>
    {
        setSaveButtonPressed(true)
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
                let QtysFullZERO=true
                var BreakException = {};
                try
                {
                    Object.entries(Qty[1]).forEach((SubQty)=>
                    {
                        if(SubQty[1]!=0)
                        {
                            QtysFullZERO=false
                            throw BreakException;
                        }
                    })
                }
                catch (e) {
                    if (e !== BreakException) throw e;
                }
                if(QtysFullZERO==false)
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
                else
                {
                    firebase.db.collection('ProductosContenidos').doc(Qty[0]).update
                    ({
                        [ProductId] : firebase.FieldValue.delete()
                    })
                }
            }
            )
            
            firebase.db.collection('Productos/'+ProductId+'/ContenidoEn').doc(ProductId).set(ModifiedQtys,{merge:true}).then(()=>
            {
                let QtysInContainersBackUpPointer=QtysInContainersBackUp
                QtysInContainersBackUpPointer=Object.assign({}, QtysInContainers)
                setSaveButtonPressed(false)
                alert("Se registro correctamente") 
            })
        }
    }
    return(
        <View style={styles.GralView}>
            <ScrollView >
                <Text style={styles.TitleStyle}>
                    {ProductName}
                </Text>
                <Text style={styles.TextStyle}>
                    Cantidades maximas disponibles
                </Text>
                {HandleCreationOfTable()}

                <Divider orientation="horizontal" />
                <View style={styles.SubView}>
                {
                    Containers.length>0 &&
                        Containers.map((Container)=>HandleCreationOfCounters(Container))
                }
                </View>
                
            </ScrollView>
            <View style={styles.ButtonsContainer}>
            {
                Containers.length>0 &&            
                <Button title="Guardar" disabled={SaveButtonPressed} buttonStyle={styles.ButtonStyle} onPress={HandleSave}/>
            }
            </View>
        </View>
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
        backgroundColor:'#7b838c',
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
    },
    
    ButtonsContainer:
    {
        alignItems:"center",
        textAlign:"center"
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
    ContainersButtonStyle:
    {
        backgroundColor:"#7b838c"
    },
    TextStyleBold:
    {
        fontSize:18,
        fontWeight:'bold',
        fontFamily: 'Futura',
        color:'black'
    },
    NotInputContainers:
    {
        marginHorizontal:7
    },
  });
export default PutProductsIntoContainerScreen;