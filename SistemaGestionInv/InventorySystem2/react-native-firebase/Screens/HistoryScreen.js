import React,{useEffect,useState,Fragment} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from '../DataBase/Firebase';
import { ListItem ,SearchBar,Header,CheckBox} from 'react-native-elements';
import { View,StyleSheet,TextInput,Image, ScrollView, Text,} from 'react-native';
import { Button } from "react-native-elements/dist/buttons/Button";
import RadioButtonsGroup from '../CustomComponents/RadioButtonsGroup'

const theme={
    Button:{
        buttonStyle:{
            backgroundColor:'#e1a8c0',
            width:'50%',
        },
        containerStyle:
        {
            alignItems:'center',
            justifyContent:'center'
        },
        titleStyle:
        {
            fontFamily: 'Futura',
            color: '#ecf0f1',
        }
    },
}

const HistoryScreen =(props)=>
{
    const [openMonth, setopenMonth] = useState(false);
  const [MonthValue, setMonthValue] = useState(0);
  const [monthItems, setmonthItems] = useState([]);
  const [openYear, setopenYear] = useState(false);
  const [yearValue, setYearValue] = useState(0);
  const [yearItems, setYearItems] = useState([]);
  //const [HistoryInfo,setHistoryInfo]=useState({})
  const [HistoryInfo,setHistoryInfo]=useState({})
  const [newValueDDP,setNewValueDDP]=useState(false)
  const [Operations,setOperations]=useState({"Venta":true,"Adicion":false,"Creacion":false})
  const [OrderedKeysOfHistory,setOrderedKeysOfHistory]=useState([])
 
    useEffect(()=>
    {
      props.navigation.setOptions({headerShown: true});
        let Months=[{label:"Enero",value:"1"},{label:"Febrero",value:"2"},{label:"Marzo",value:"3"},
        {label:"Abril",value:"4"},{label:"Mayo",value:"5"},{label:"Junio",value:"6"},{label:"Julio",value:"7"},
        {label:"Agosto",value:"8"},{label:"Septiembre",value:"9"},{label:"Octubre",value:"10"},{label:"Noviembre",value:"11"},
        {label:"Diciembre",value:"12"}]
        setmonthItems(Months)
        let Years=[]
        for(let Year=new Date().getFullYear();Year>=2021;Year--)
        {
            Years.push({label:Year,value:Year});
        }
        setYearItems(Years);
        
    },[]);
    const RetrieveInfo=()=>
    {
        if(newValueDDP && yearValue!=0 && MonthValue!=0)
        {
            let aux=MonthValue.toString()+yearValue.toString()
            firebase.db.collection('Historial').doc(aux).get().then((doc)=>{
                if(doc.data()!=undefined)
                {
                    let OrderedArray=[]
                    const DateComparison=(a,b)=>
                    {
                        let aDate=a[1]
                        let bDate=b[1]
                        if ( aDate.seconds * 1000 + aDate.nanoseconds / 1000000  < bDate.seconds * 1000 + bDate.nanoseconds / 1000000 ){
                            return 1;
                        }
                        if (aDate.seconds * 1000 + aDate.nanoseconds / 1000000  > bDate.seconds * 1000 + bDate.nanoseconds / 1000000  ){
                            return -1;
                        }
                        return 0;
                    }
                    Object.entries(doc.data()).forEach((obj)=>
                    {
                        OrderedArray.push([obj[0],obj[1]["Fecha"]])
                    })
                    OrderedArray.sort(DateComparison)
                    setOrderedKeysOfHistory(OrderedArray)
                    setHistoryInfo(doc.data())
                }
                else
                {
                    alert("There's no data")
                }
            })
            setNewValueDDP(false);
        }

    }
    const HandleCreationOfApropiateListItem=(Key)=>
    {
        let Item=HistoryInfo[Key]
        if(Item!=undefined)
        {
            let time = Item["Fecha"]
            let date = new Date(
                time.seconds * 1000 + time.nanoseconds / 1000000,
            ).toDateString();
            let Operation=Item["Operacion"]
            if(Operation=="Venta" && Operations[Operation])
            {
                return(
                    <ListItem containerStyle={styles.ListCont}
                        key={Key}
                        bottomDivider 
                    >
                        <ListItem.Chevron/>
                        <ListItem.Content>
                            <ListItem.Title style={styles.TextStyle}>{Item["Nombre"]} </ListItem.Title>
                            <ListItem.Subtitle style={styles.SubTitleStyle} >{Item["Operacion"]}</ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.SubTitleStyle} >{Item["Nombre cantidad"]}:{Item["Cantidad"]} </ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.SubTitleStyle} >Ganancia: {Item["Ganancia"]}</ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.SubTitleStyle} >Fecha: {date}</ListItem.Subtitle>

                        </ListItem.Content>
                    </ListItem>
                );
            }
            else if(Operation=="Agregacion" && Operations["Adicion"])
            {
                
                return(
                    <ListItem containerStyle={styles.ListCont}
                        key={Key}
                        bottomDivider 
                    >
                        <ListItem.Chevron/>
                        <ListItem.Content>
                            <ListItem.Title style={styles.TextStyle}>{Item["Nombre"]} </ListItem.Title>
                            <ListItem.Subtitle style={styles.SubTitleStyle} >{Item["Operacion"]}</ListItem.Subtitle>
                            
                            {
                            Object.entries(Item["Cantidades"]).map((Cantidad)=>
                            {
                                return(
                                <ListItem.Subtitle key={Cantidad[0]} style={styles.SubTitleStyle} >{Cantidad[0]}:{Cantidad[1]} </ListItem.Subtitle>
                                )
                            })}
                            <ListItem.Subtitle style={styles.SubTitleStyle} >Fecha: {date}</ListItem.Subtitle>

                        </ListItem.Content>
                    </ListItem>
                );
            }
            else if(Operation=="Creacion" && Operations[Operation])
            {
                return(
                    <ListItem containerStyle={styles.ListCont}
                        key={Key}
                        bottomDivider 
                    >
                        <ListItem.Chevron/>
                        <ListItem.Content>
                            <ListItem.Title style={styles.TextStyle}>{Item["Nombre"]} </ListItem.Title>
                            <ListItem.Subtitle style={styles.SubTitleStyle} >{Item["Operacion"]}</ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.SubTitleStyle} >Cantidades:</ListItem.Subtitle>
                            {
                                Item["Cantidades"]!=undefined &&
                            Object.entries(Item["Cantidades"]).map((Cantidad)=>
                            {
                                return(
                                <ListItem.Subtitle key={Cantidad[0]} style={styles.SubTitleStyle} >{Cantidad[0]}: {Cantidad[1]} </ListItem.Subtitle>
                                )
                            })}
                            <ListItem.Subtitle style={styles.SubTitleStyle} >Fecha: {date}</ListItem.Subtitle>

                        </ListItem.Content>
                    </ListItem>
                );
            }
        }
    }
    const setOperationToRadioButtons=(value)=>
    {
        setOperations({...Operations,[value]:true})
    }
    return(
        <View style={styles.GralView}>
            <View style={styles.DropDownPickerCont}>
            <DropDownPicker 
                key={"MonthPicker"}
                open={openMonth}
                value={MonthValue}
                items={monthItems}
                setOpen={setopenMonth}
                setValue={setMonthValue}
                setItems={setmonthItems}
                onChangeValue={()=>setNewValueDDP(true)}
                containerStyle={styles.ddpcontainerStyle}
                placeholder="Mes"
                />
            <DropDownPicker 
                key={"YearPicker"}
                open={openYear}
                value={yearValue}
                items={yearItems}
                setOpen={setopenYear}
                setValue={setYearValue}
                setItems={setYearItems}
                onChangeValue={()=>setNewValueDDP(true)}
                containerStyle={styles.ddpcontainerStyle}
                placeholder="Año"

                />
            </View>
            <RadioButtonsGroup 
                RadioButtonBoolsObjects={Operations}
                FuncToUpdateWithKey={setOperationToRadioButtons}
                labelText={"Tipo"}
                selectedKey={"Venta"}
                BgrColor="white"
                TextColor="black"
                />
            <Button title="Get Info" buttonStyle={styles.ButtonStyle} onPress={RetrieveInfo}></Button>
            <ScrollView style={{width:"100%"}}>
            { 
            Operations &&
            OrderedKeysOfHistory.map((Duple)=>HandleCreationOfApropiateListItem(Duple[0]))  //Duple[0]=key
            }
            </ScrollView>

        </View>
    );
    
}
const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor: 'white',
        alignItems:'center'

    },
    ListCont:
    {
        backgroundColor: 'white',
        width:'100%'
    },
    DropDownPickerCont:
    {
        flexDirection:'row'
    },
    ddpcontainerStyle:
    {
        width: "47%",
        paddingHorizontal:3
    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'black'
    },
    SubTitleStyle:
    {
        fontSize:15,
        fontFamily: 'Futura',
        color:'black'
    },
    ButtonStyle:{
        backgroundColor:"#7b838c",
        width:'65%',
        marginVertical:2,
        alignItems:'center',
        alignContent:"center",
        justifyContent:'space-evenly',
    },
});

export default HistoryScreen;