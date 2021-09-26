import React,{Component,useEffect,useState} from "react";
import { View,Text, StyleSheet, AsyncStorage} from "react-native";
import { Button,Divider } from 'react-native-elements';
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'


const PutProductsIntoContainerScreen =(props)=>
{
    const [DocId,setDocId]=useState("");
    const [DocOfQtyId,setDocOfQtyId]=useState("");
    const [Name,setName]=useState("");
    const [Talla,setTalla]=useState("");
    const [QtyOfProduct,setQtyOfProduct]=useState(0);
    const [GralCounter,setGralCounter]=useState(0);
    const [MaxOfProductsContainedReached,setMaxOfProductsContainedReached]=useState(false);
    const [Containers,setContainers]=useState([]);
    const [QtysInContainers,setQtysInContainers]=useState({});
    const [QtysInContainersBackUp,setQtysInContainersBackUp]=useState({});
    const [successfulLoad,setsuccessfulLoad]=useState(false);


    const getInfo=async(DocId)=>
    {
        await firebase.db.collection('Productos/'+DocId+'/ContenidoEn').get().then(async (querySnapshot)=>
        {
            await querySnapshot.forEach((Doc)=>
            {
                setDocOfQtyId(Doc.id);
                let auxData=Doc.data();
                setQtysInContainers(auxData);
                setQtysInContainersBackUp(auxData);
                setInitialStateOfGralCounter(auxData,props.route.params.QtyOfProduct);
            })
        }
        );
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
    }
    const setInitialStateOfGralCounter=(QtysInContainers,QtyOfProduct)=>
    {
        let auxCounter=0;
        Object.entries(QtysInContainers).forEach((ContainerQty)=>
        {
            auxCounter+=ContainerQty[1]
        })
        setGralCounter(auxCounter);
        if(auxCounter>=QtyOfProduct)
        {
            setMaxOfProductsContainedReached(true);
        }
        else
        {
            setMaxOfProductsContainedReached(false);
        }
    }
    useEffect(()=>
    {
        
        setName(props.route.params.Name);
        setQtyOfProduct(props.route.params.QtyOfProduct);
        setDocId(props.route.params.DocId);
        getInfo(props.route.params.DocId).then(()=>{setsuccessfulLoad(true);})
    },[])
    const HandleCounters=(DocId,CounterValue)=>
    {
        setQtysInContainers({...QtysInContainers, [DocId]:CounterValue})
        let ans=0;
        if(CounterValue>QtysInContainers[DocId])
        {
            ans=GralCounter+1;
        }
        else
        {
            ans=GralCounter-1;
        }
        setGralCounter(ans);
        if(ans>=QtyOfProduct)
        {
            setMaxOfProductsContainedReached(true);
        }
        else
        {
            setMaxOfProductsContainedReached(false);
        }
    }
    const HandleCreationOfCounters=(Container)=>
    {
            if(QtysInContainersBackUp[Container.DocId]!=undefined)
            {
                return(
                    <CustomCounter key={Container.DocId}
                        numOfCounter={QtysInContainersBackUp[Container.DocId]} 
                        textStyle={styles.CounterTextStyle} 
                        buttonStyle={styles.CounterButtonsStyle}
                        disabledPlus={MaxOfProductsContainedReached}
                        containerStyle={styles.ContainerCounter}
                        label={Container.Name+" \n"+Container.Description}
                        labelStyle={styles.CounterTextStyle} 
                        funcToDoWhenModifyVal={HandleCounters}
                        NameOfStateToChange={Container.DocId}
                    >
                    </CustomCounter>);
            }
            else if(successfulLoad)
            {
                setQtysInContainersBackUp({...QtysInContainersBackUp,[Container.DocId]:0});
                setQtysInContainers({...QtysInContainers,[Container.DocId]:0});
            }
    }
    
    
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
    return(
        <View style={{flex:1, alignContent:'center', justifyContent:'center'}}>
            <Text>
                {Name}
                Cantidad disponible: {QtyOfProduct}
            </Text>

            {
                    Containers.map((Container)=>HandleCreationOfCounters(Container))
            }
            <Button title="Save" onPress={HandleSave}>

            </Button>
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
  
  
export default PutProductsIntoContainerScreen;