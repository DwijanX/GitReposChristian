import React,{Component,useEffect,useState} from 'react';
import { View,StyleSheet,Button,TextInput, ScrollView,Text} from 'react-native';
import firebase from '../DataBase/Firebase';
import { ListItem ,SearchBar,Header,CheckBox} from 'react-native-elements';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import SearchList from  '../CustomComponents/SearchList'

//class ViewProductsScreen extends Component

const ViewContainersScreen = (props) => {
    const [Containers, setContainers] = useState([]);
    const [FilteredContainers, setFilteredContainers] = useState([]);

    const GetContainersData=async()=>
    {
        const ContainersAux=[];
        firebase.db.collection('Listas').doc('Contenedores').get().then((doc)=>
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
            setContainers(ContainersAux);
            setFilteredContainers(ContainersAux);
        })
    }
    useEffect(()=>
    {
        GetContainersData();


    },[]);
    const HandleFuncToDoWhenClick=(DocIdpar)=>
    {
        props.navigation.navigate('ContainerDetailScreen',{DocId: DocIdpar});
    }
    return (
        <View>
        <SearchList
        Array={Containers}
        FilteredArray={FilteredContainers}
        setFilteredArray={setFilteredContainers}
        FilterAttribute={"Name"}
        TittleAttributes={["Name"]}
        SubTittleAttributes={["Type"]}
        KeyAttribute={'DocId'}
        FuncToDoWhenClick={HandleFuncToDoWhenClick}
        
        />
        </View>
    );
  };
export default ViewContainersScreen;