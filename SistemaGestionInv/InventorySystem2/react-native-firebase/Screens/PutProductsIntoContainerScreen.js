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
          setsuccessfulLoad(true);
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
                //setInitialStateOfGralCounter(auxData,props.route.params.QtyOfProduct);
            
        }
        );
    }
    useEffect(()=>
    {
        /*setProductName(props.route.params.Name);
        setProductId(props.route.params.DocId);
        setProductQtys(props.route.params.Cantidades);*/
        setProductName('Stitch');
        setProductId('gCu171sea4VjxbX2W1A8');
        setProductQtys({M:15,L:80});
        getInfo('gCu171sea4VjxbX2W1A8');
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
        auxData={...auxData,[Mod[1]]:value};
        setQtysInContainers({...QtysInContainers,[Mod[0]]:auxData})
    }
    const HandleCreationOfCounters=(Container)=>  //{Description,DocId, Name,Type}
    {
        
        if(QtysInContainersBackUp[Container.DocId]==null && successfulLoad)
        {
            setQtysInContainersBackUp({...QtysInContainersBackUp,[Container.DocId]:QtysIn0Template});
            setQtysInContainers({...QtysInContainersBackUp,[Container.DocId]:QtysIn0Template});
        }
        if(QtysInContainersBackUp[Container.DocId]!=null)
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
                        disabledPlus={false}
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

    }
    return(
        <View style={{flex:1, alignContent:'center', justifyContent:'center'}}>
            <Text>
                {ProductName}
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
  /*
  
const PutProductsIntoContainerScreen =(props)=>
{
    const [DocId,setDocId]=useState("");
    const [DocOfQtyId,setDocOfQtyId]=useState("");
    const [Name,setName]=useState("");
    const [Talla,setTalla]=useState("");
    const [Cantidades,setCantidades]=useState();
    const [CantidadesCounter,setCantidadesCounter]=useState(0);
    const [MaxOfProductsContainedReached,setMaxOfProductsContainedReached]=useState(false);
    const [Containers,setContainers]=useState([]);
   // const [QtysInContainers,setQtysInContainers]=useState({});
    //const [QtysInContainersBackUp,setQtysInContainersBackUp]=useState({});
    const [successfulLoad,setsuccessfulLoad]=useState(false);


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