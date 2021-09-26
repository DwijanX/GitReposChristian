import React,{Component,useEffect,useState} from 'react';
import { View,StyleSheet,Button,TextInput, ScrollView,Text} from 'react-native';
import firebase from '../DataBase/Firebase';
import { ListItem ,SearchBar,Header,CheckBox} from 'react-native-elements';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import SearchList from  '../CustomComponents/SearchList'

//class ViewProductsScreen extends Component

const ViewProductsScreen = (props) => {
    const [Products, setProducts] = useState([]);
    const [FilteredProducts,SetFilteredProducts]=useState([]);

    useEffect(()=>
    {
        firebase.db.collection('Productos').onSnapshot((querySnapshot)=>
      {
          const Products=[];
        querySnapshot.docs.forEach((doc)=>
        {
            let DocData=doc.data();
            let Data=
            {
                DocId:doc.id, Name:DocData.Nombre,Type:DocData.Tipo
            }
            Products.push(Data);
        });
        setProducts(Products);
        SetFilteredProducts(Products);
      });

    },[]);
    const HandleFuncToDoWhenClick=(DocIdpar)=>
    {
        props.navigation.navigate('ProductDetailScreen',{DocId: DocIdpar});
    }
    return (
        <View>
        <SearchList
        Array={Products}
        FilteredArray={FilteredProducts}
        setFilteredArray={SetFilteredProducts}
        FilterAttribute={"Name"}
        TittleAttributes={["Name"]}
        SubTittleAttributes={["Type"]}
        KeyAttribute={'DocId'}
        FuncToDoWhenClick={HandleFuncToDoWhenClick}
        />
        </View>
    );
  };
export default ViewProductsScreen;