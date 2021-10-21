import React,{Component,Fragment,useEffect,useState} from "react";
import { View,Text, StyleSheet, AsyncStorage} from "react-native";
import { Button,Divider } from 'react-native-elements';
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'


const PutProductsIntoContainerScreen =(props)=>
{
    const [Containers,setContainers]=useState([]);
    const [ProductName,setProductName]=useState([]);
    const [ProductId,setProductId]=useState([]);
    const [ProductQtys,setProductQtys]=useState();
    const [QtysInContainers,setQtysInContainers]=useState({
        gCu171sea4VjxbX2W1A8:
        {
            M:0,
            L:0
        }
   });
    const [QtysInContainersBackUp,setQtysInContainersBackUp]=useState({
        gCu171sea4VjxbX2W1A8:
        {
            M:0,
            L:0
        }
   });
   const [successfulLoad,setsuccessfulLoad]=useState(false);
   const [QtysIn0Template,setQtysIn0Template]=useState();
   const [StateOfCounters,setStateOfCounters]=useState();
   const [AllowEditionForEachCounter,setAllowEditionForEachCounter]=useState({});
    const setInitialStateOfCounters=(ContainedProducts,ProductQtys)=>  //ContainedProducts{DocId:{TypeQty:ContainedQty}} ProductQtys{TypeQty:TotalQty}
    {
        let Counters={};
        let AllowEditionForEachCounterAux={};
        Object.entries(ProductQtys).forEach((Qty)=>
        {
            let CounterAux  =0;
            let AllowAddInCounter=true;
            Object.entries(ContainedProducts).forEach((ContainedQty)=>
            {
                CounterAux+=ContainedQty[1][Qty[0]];
            })
            if(CounterAux==Qty[1])
            {
                AllowAddInCounter=false;
            }
            Counters={...Counters,[Qty[0]]:CounterAux};
            AllowEditionForEachCounterAux={...AllowEditionForEachCounterAux,[Qty[0]]:AllowAddInCounter}
        })
        setStateOfCounters(Counters);
        setAllowEditionForEachCounter(AllowEditionForEachCounterAux);
    }
    const getInfo=async(DocId)=>
    {
        await firebase.db.collection('Contenedores').onSnapshot((querySnapshot)=>
        {
            const ContainersAux=[];
          querySnapshot.docs.forEach((doc)=>
          {
              let Data=
              {
                  DocId:doc.id, 
                  Name:doc.data().Nombre,
                  Type:doc.data().Tipo,
                  Description:doc.data().Descripcion,
              }
              ContainersAux.push(Data);
          });
          setContainers(ContainersAux);
        });
        await firebase.db.collection('Productos/'+DocId+'/ContenidoEn').doc(DocId).get().then(Doc=>
        {
                let auxData=Doc.data();
                if(auxData==undefined)
                {
                    auxData={};
                }
                setQtysInContainers(auxData);
                setQtysInContainersBackUp(auxData);
                setInitialStateOfCounters(auxData,{M:15,L:80});
            
        }
        ).then(()=>
        {
            setsuccessfulLoad(true);
        })
    }
    
    useEffect(()=>
    {
        /*setProductName(props.route.params.Name);
        setProductId(props.route.params.DocId);
        setProductQtys(props.route.params.Cantidades);*/
        setProductName('Stitch');
        setProductId('b0LLQ9maF8WEWVk2uJEn');
        setProductQtys({M:15,L:80});
        getInfo('b0LLQ9maF8WEWVk2uJEn');
        let templateQtys={}
        Object.entries({M:15,L:80}).forEach((Qty)=>
        {
            templateQtys={...templateQtys,[Qty[0]]:0}
        })
        setQtysIn0Template(templateQtys);

       /*QtysInContainers
       
       {
            gCu171sea4VjxbX2W1A8:
            {
                M:0,
                L:0
            }
       }*/
       
        //getInfo(props.route.params.DocId).then(()=>{setsuccessfulLoad(true);})
    },[])
    const HandleCounters=(Mod,value)=> //Mod=[docid,TypeQty]  
    {
        let auxData=QtysInContainers[Mod[0]];
        auxData={...auxData,[Mod[1]]:auxData[Mod[1]]+value};
        const c=StateOfCounters;
        setStateOfCounters({...c,[Mod[1]]:c[Mod[1]]+value});
        setQtysInContainers({...QtysInContainers,[Mod[0]]:auxData})
        if(c[Mod[1]]+value==ProductQtys[Mod[1]])
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
        if(QtysInContainersBackUp[Container.DocId]==null && successfulLoad)
        {
            setQtysInContainersBackUp({...QtysInContainersBackUp,[Container.DocId]:QtysIn0Template});
            setQtysInContainers({...QtysInContainersBackUp,[Container.DocId]:QtysIn0Template});
        }
        if(QtysInContainersBackUp[Container.DocId]!=null && successfulLoad)
        {
            return(
                <Fragment key={Container.DocId}>
                <Text>{Container.Name}</Text>
                {Object.entries(QtysInContainersBackUp[Container.DocId]).map((Qty)=> //[TypeOfQty,Qty]
                {
                    return(
                    <CustomCounter 
                        key={Qty[0]}
                        numOfCounter={Qty[1]} 
                        textStyle={styles.CounterTextStyle} 
                        buttonStyle={styles.CounterButtonsStyle}
                        disabledPlus={!AllowEditionForEachCounter[Qty[0]]}
                        containerStyle={styles.ContainerCounter}
                        label={"Cantidad: "+Qty[0]}
                        labelStyle={styles.CounterTextStyle} 
                        funcToDoWhenModifyVal={HandleCounters}
                        NameOfStateToChange={[Container.DocId,Qty[0]]}
                            >
                    </CustomCounter>
                    );
                })}
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
            if(QtysInContainersBackUp[DocQty[0]]!=DocQty[1])
            {
                ModifiedQtys={...ModifiedQtys,[DocQty[0]]:DocQty[1]};
                EmptyModifiedQtys=false;
            }
        })
        if(EmptyModifiedQtys==false)
        {
            firebase.db.collection('Productos/'+ProductId+'/ContenidoEn').doc(ProductId).set(ModifiedQtys,{merge:true});
            
            Object.entries(ModifiedQtys).forEach((Qty)=>  //QTY[{ContainerID,Qtys}]
            {
                firebase.db.collection('ProductosContenidos').doc(Qty[0]).update
                (
                    {
                        [ProductId]:
                        {
                            Nombre:ProductName,
                            Cantidades:Qty[1]
                        }
                    }
                )
            }
            )
        }
    }
    return(
        <View style={{flex:1, alignContent:'center', justifyContent:'center'}}>
            <Text>
                {ProductName}
            </Text>

            {
                    Containers.map((Container)=>HandleCreationOfCounters(Container))
            }
            <Button title="Guardar" onPress={HandleSave}>
            
            </Button>
            <Button title='Atras'></Button>
        </View>
    );
};

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
  /*
const PutProductsIntoContainerScreen =(props)=>
{
    const HandleSave=()=>
    {
        
        let ModifiedQtys={};
        Object.entries(QtysInContainers).forEach((DocQty)=>
        {
            if(QtysInContainersBackUp[DocQty[0]]!=DocQty[1])
            {
                ModifiedQtys={...ModifiedQtys,[DocQty[0]]:DocQty[1]};
            }
        })
        if(ModifiedQtys!={})
        {
            firebase.db.collection('Productos/'+DocId+'/ContenidoEn').doc(DocOfQtyId).update(ModifiedQtys);
            Object.entries(ModifiedQtys).forEach((Qty)=>  //QTY[{ContainerID,Qty}]
            {
                if(Qty[1]!=0)
                {
                    firebase.db.collection('ProductosContenidos').doc(Qty[0]).update
                    (
                        {
                            [DocId]:
                            {
                                Nombre:Name,
                                Talla:Talla,
                                Cantidad:Qty[1]
                            }
                        }
                    )
                }
                else
                {
                    firebase.db.collection('ProductosContenidos').doc(Qty[0]).update
                    (
                        {
                            [DocId]:firebase.firebase.firestore.FieldValue.delete()
                        }
                    );
                }
            })
            setQtysInContainersBackUp(QtysInContainers);
        }
    }
};
  */
  
export default PutProductsIntoContainerScreen;