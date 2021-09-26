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
        await firebase.db.collection('Contenedores').onSnapshot((querySnapshot)=>
        {
            const Containers=[];
          querySnapshot.docs.forEach((doc)=>
          {
              DocData=doc.data();
              let Data=
              {
                  DocId:doc.id, Name:DocData.Nombre,Type:DocData.Tipo
              }
              Containers.push(Data);
          });
          setContainers(Containers);
          setFilteredContainers(Containers);
        }); 
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