import React,{Component,Fragment,useEffect,useState} from 'react';
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
        <Fragment >
        
        <View style={styles.GralView} >
         <SearchBar 
            onChangeText={HandleSearch}
            value={SearchState}
            round={true}
            lightTheme={true}
            containerStyle={styles.GralView}>
         </SearchBar>
        </View>
        {
            props.FilteredArray.map((Elem)=>
                {
                    return(
                        <ListItem containerStyle={styles.GralView}
                            key={Elem[KeyAttribute]} 
                            bottomDivider 
                            onPress={()=>props.FuncToDoWhenClick(Elem[KeyAttribute])}
                        >
                            <ListItem.Chevron/>
                            <ListItem.Content>
                                <ListItem.Title style={styles.TextStyle}>{setTextAttributes(TittleAttributes,Elem)}</ListItem.Title>
                                <ListItem.Subtitle style={styles.SubTitleStyle} >{setTextAttributes(SubTittleAttributes,Elem)}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })
        }

      </Fragment>
    );
  };
  
  
  const styles = StyleSheet.create({
    GralView:
    {
        backgroundColor: '#7f8c8d',
        width:'100%'
    },
    TextStyle:
    {
        fontSize:18,
        fontFamily: 'Futura',
        color:'#ecf0f1'
    },
    SubTitleStyle:
    {
        fontSize:15,
        fontFamily: 'Futura',
        color:'#ecf0f1'
    }
  });
export default SearchList;