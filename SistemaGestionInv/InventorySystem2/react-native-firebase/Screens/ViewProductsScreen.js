import React,{Component,useEffect,useState} from 'react';
import { View,StyleSheet,Button,TextInput, ScrollView,Text} from 'react-native';
import firebase from '../DataBase/Firebase';
import { ListItem ,SearchBar,Header,CheckBox} from 'react-native-elements';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

//class ViewProductsScreen extends Component

const ViewProductsScreen = (props) => {
    const [Products, setProducts] = useState([]);
    const [SearchState,SetSearchState]=useState("");
    const [FilteredArray,setFilteredArray]=useState([]);

    useEffect(()=>
    {
        firebase.db.collection('Productos').onSnapshot((querySnapshot)=>
      {
          const Products=[];
        querySnapshot.docs.forEach((doc)=>
        {
            let Data=
            {
                DocId:doc.id, Name:doc.data().Nombre,Type:doc.data().Tipo
            }
            Products.push(Data);
        });
        setProducts(Products);
        setFilteredArray(Products);
      });

    },[]);
    const HandleSearch=(value)=>
    {
        SetSearchState(value);
        setFilteredArray(Products.filter(i=> i.Name.includes(value),));
    }
    return (
        <ScrollView  >
        
         <SearchBar
            onChangeText={HandleSearch}
            value={SearchState}
            style={{width:'80%'}}
            round={true}
            lightTheme={true}
            containerStyle={{backgroundColor:'white'}}>
            
            </SearchBar>
        {
            FilteredArray.map((Product)=>
                {
                    return(
                        <ListItem
                            key={Product.DocId} 
                            bottomDivider 
                            onPress={()=>
                            {
                                props.navigation.navigate('ProductDetailScreen',{DocId: Product.DocId});
                            }}
                        >
                            <ListItem.Chevron/>
                            <ListItem.Content>
                                <ListItem.Title>{Product.Name}</ListItem.Title>
                                <ListItem.Subtitle>{Product.Type}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })
        }
      </ScrollView>
    );
  };
export default ViewProductsScreen;