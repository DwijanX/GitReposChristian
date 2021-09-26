import React,{Component,useEffect,useState} from 'react';
import { View,StyleSheet,Button,TextInput, ScrollView,Text} from 'react-native';
import firebase from '../DataBase/Firebase';
import { ListItem ,SearchBar,Header,CheckBox} from 'react-native-elements';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

//class ViewProductsScreen extends Component

const SearchList = (props) => {
    const [FilterAttribute,setFilterAttribute]=useState();
    const [TittleAttributes,setTittleAttributes]=useState("");
    const [SubTittleAttributes,setSubTittleAttributes]=useState("");
    const [KeyAttribute,setKeyAttribute]=useState();
    const [SearchState,SetSearchState]=useState("");

    useEffect(()=>
    {
        setFilterAttribute(props.FilterAttribute);
        setKeyAttribute(props.KeyAttribute);
        setSubTittleAttributes(props.SubTittleAttributes);
        setTittleAttributes(props.TittleAttributes);
    },[]);
    const HandleSearch=(value)=>
    {
        SetSearchState(value);
        props.setFilteredArray(props.Array.filter(i=> i[FilterAttribute].includes(value),));
    }
    const setTextAttributes=(AttributesArray,elem)=>
    {
        let aux="";
        AttributesArray.forEach(Att => {
            aux+=elem[Att]+"  "
        })
        return(<Text key={elem}>{aux}</Text>)
    }
    return (
        <ScrollView >
        
        <View style={{width:'100%'}}>
         <SearchBar
            onChangeText={HandleSearch}
            value={SearchState}
            round={true}
            lightTheme={true}
            containerStyle={{backgroundColor:'white'}}>
            
            </SearchBar>
        </View>
        {
            props.FilteredArray.map((Elem)=>
                {
                    return(
                        <ListItem
                            key={Elem[KeyAttribute]} 
                            bottomDivider 
                            onPress={()=>props.FuncToDoWhenClick(Elem[KeyAttribute])}
                        >
                            <ListItem.Chevron/>
                            <ListItem.Content>
                                <ListItem.Title>{setTextAttributes(TittleAttributes,Elem)}</ListItem.Title>
                                <ListItem.Subtitle>{setTextAttributes(SubTittleAttributes,Elem)}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })
        }

      </ScrollView>
    );
  };
export default SearchList;