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
      props.navigation.setOptions({headerShown: true});
      firebase.db.collection('Listas').doc('Productos').get().then((doc)=>
      {
        let Products=[];
        Object.entries(doc.data()).forEach((Product)=>
        {
          let DataAux={
            DocId:Product[0],
            Name:Product[1]['Nombre'],
            Type:Product[1]['Tipo']
          }
          Products.push(DataAux);
        })
        setProducts(Products);
        SetFilteredProducts(Products);

      })
    },[]);
    const HandleFuncToDoWhenClick=(DocIdpar)=>
    {
        props.navigation.navigate('ProductDetailScreen',{DocId: DocIdpar});
    }
    return (
        <View style={styles.GralView}>
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
  const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor: '#7f8c8d',
    }
  });
  
export default ViewProductsScreen;