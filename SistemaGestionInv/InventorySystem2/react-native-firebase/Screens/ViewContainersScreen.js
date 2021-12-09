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
        let ContainersAux=[];
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
            ContainersAux=ContainersAux.sort(compare);
            setContainers(ContainersAux);
            setFilteredContainers(ContainersAux);
            
        })
    }
    const compare=( a, b )=> {
        if ( a["Name"] < b["Name"] ){
          return -1;
        }
        if ( a["Name"] > b["Name"] ){
          return 1;
        }
        return 0;
      }
    useEffect(()=>
    {
        props.navigation.setOptions({headerShown: true});
        GetContainersData();


    },[]);
    const HandleFuncToDoWhenClick=(DocIdpar)=>
    {
        props.navigation.navigate('ContainerDetailScreen',{DocId: DocIdpar});
    }
    return (
        <ScrollView style={styles.GralView}>
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
        
        </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor: 'white',
    },
  });
  
export default ViewContainersScreen;