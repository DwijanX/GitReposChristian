import React,{Component} from "react";
import { View,Text, StyleSheet} from "react-native";
import { Button,Divider } from 'react-native-elements';
import firebase from '../DataBase/Firebase'
import CustomCounter  from '../CustomComponents/CustomCounterWButtons'


class PutProductsIntoContainerScreen extends Component
{
    constructor(props)
  {
      super(props);
      this.state={
        DocId:'b0LLQ9maF8WEWVk2uJEn',
        DocOfQtyId:"",
        Name:"Stitch1",
        Talla:'M',
        QtyOfProduct:13,
        GralCounter:0,
        MaxOfProductsContainedReached:false,
        Containers:[],
        QtysInContainers:{},
        QtysInContainersBackUp:{},
        successfulLoad:false
      }
      this.getContainersInfo=this.getContainersInfo.bind(this);
      this.getQtysInfo=this.getQtysInfo.bind(this);
      this.HandleCreationOfCounters=this.HandleCreationOfCounters.bind(this);
      this.HandleCounters=this.HandleCounters.bind(this);
      this.HandleInitialStateOfGralCounter=this.HandleInitialStateOfGralCounter.bind(this);
      this.HandleSave=this.HandleSave.bind(this);
  }
    getQtysInfo=async(DocId)=>
    {
        await firebase.db.collection('Productos/'+DocId+'/ContenidoEn').get().then((querySnapshot)=>
        {
            querySnapshot.forEach((Doc)=>
            {
                this.setState({DocOfQtyId:Doc.id})
                let aux=Doc.data();
                this.setState({QtysInContainers:aux});
                this.setState({QtysInContainersBackUp:aux}); //On firebase theres only one doc 
            })
        }
        );
    }
    getContainersInfo= async ()=>
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
          this.setState({Containers:ContainersAux})
        });
    }
    HandleInitialStateOfGralCounter()
    {
        let aux=0;
        Object.entries(this.state.QtysInContainersBackUp).forEach((ContainerQty)=>
        {
            aux+=ContainerQty[1]
        })
        this.setState({GralCounter:aux});
        if(aux>=this.state.QtyOfProduct)
        {
            this.setState({MaxOfProductsContainedReached:true});
        }
    }
    componentDidMount()
    {
        /*this.setState({Name:this.props.route.params.Name});
        this.setState({QtyOfProduct:this.props.route.params.QtyOfProduct});
        this.setState({DocId:this.props.route.params.DocId});*/

        this.getContainersInfo();
        this.getQtysInfo('b0LLQ9maF8WEWVk2uJEn').then(()=>this.HandleInitialStateOfGralCounter()).then(()=>
        {
            this.setState({successfulLoad:true});
        })

        //this.setState({DocId:this.props.route.params.DocId});
        //this.getProductInfo(this.props.route.params.DocId);
        //this.getProductInfo('b0LLQ9maF8WEWVk2uJEn');
        //this.setState({DocId:'b0LLQ9maF8WEWVk2uJEn'});

    }
    HandleCounters(DocId,CounterValue)
    {
        const {QtysInContainers:Q}=this.state;
        this.setState({QtysInContainers:{...Q, [DocId]:CounterValue}})
        const {GralCounter}=this.state;
        let ans=0;

        if(CounterValue>Q[DocId])
        {
            ans=GralCounter+1;
        }
        else
        {
            ans=GralCounter-1;
        }
        this.setState({GralCounter:ans});
        if(ans>=this.state.QtyOfProduct)
        {
            this.setState({MaxOfProductsContainedReached:true});
        }
        else
        {
            this.setState({MaxOfProductsContainedReached:false});
        }
    }
    HandleCreationOfCounters(Container)
    {
        if(this.state.QtysInContainersBackUp[Container.DocId]!=undefined)
        {
            return(
                <CustomCounter key={Container.DocId}
                    numOfCounter={this.state.QtysInContainersBackUp[Container.DocId]} 
                    textStyle={styles.CounterTextStyle} 
                    buttonStyle={styles.CounterButtonsStyle}
                    disabledPlus={this.state.MaxOfProductsContainedReached}
                    containerStyle={styles.ContainerCounter}
                    label={Container.Name+" \n"+Container.Description}
                    labelStyle={styles.CounterTextStyle} 
                    funcToDoWhenModifyVal={this.HandleCounters}
                    NameOfStateToChange={Container.DocId}
                >
                </CustomCounter>);
        }
        else if(this.state.successfulLoad)
        {
            const {QtysInContainersBackUp:QBU}=this.state;
            this.setState({QtysInContainersBackUp:{...QBU,[Container.DocId]:0}});
        }
    
    }
    HandleSave()
    {
        let ModifiedQtys={};
        const {QtysInContainersBackUp}=this.state;
        Object.entries(this.state.QtysInContainers).forEach((DocQty)=>
        {
            if(QtysInContainersBackUp[DocQty[0]]!=DocQty[1])
            {
                ModifiedQtys={...ModifiedQtys,[DocQty[0]]:DocQty[1]};
            }
        })
        if(ModifiedQtys!={})
        {
            firebase.db.collection('Productos/'+this.state.DocId+'/ContenidoEn').doc(this.state.DocOfQtyId).update(ModifiedQtys);
            Object.entries(ModifiedQtys).forEach((Qty)=>  //QTY[{ContainerID,Qty}]
            {
                if(Qty[1]!=0)
                {
                    firebase.db.collection('ProductosContenidos').doc(Qty[0]).update
                    (
                        {
                            [this.state.DocId]:
                            {
                                Nombre:this.state.Name,
                                Talla:this.state.Talla,
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
                            [this.state.DocId]:firebase.firebase.firestore.FieldValue.delete()
                        }
                    );
                }
            })
            this.setState({QtysInContainersBackUp:this.state.QtysInContainers});
        }
    }
    render(){
        return(
            <View style={{flex:1,/* alignContent:'center', justifyContent:'center'*/}}>
                <Text>
                    {this.state.Name}
                    Cantidad disponible: {this.state.QtyOfProduct}
                </Text>

                {
                     this.state.Containers.map((Container)=>this.HandleCreationOfCounters(Container))
                }
                <Button title="Save" onPress={this.HandleSave}>

                </Button>
            </View>
        );
    }
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
  
  
export default PutProductsIntoContainerScreen;