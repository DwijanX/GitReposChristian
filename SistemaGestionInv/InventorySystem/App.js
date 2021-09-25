/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import { StyleSheet,Text,View,Button } from 'react-native';
import firebase from './DataBase/FireBase'
//import {NavigationContainer} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';
//import LogInScreen from './Screens/LogInScreen'
/*
const Stack = createStackNavigator();
function MyStack()
{
  return(
    <Stack.Navigator
    screenOptions={{headerShown:false}}>
      <Stack.Screen name="Test Equinity" component={LogInScreen}/>
    </Stack.Navigator>
  );
}*/
class App extends Component
{
  render()
  {
    return(
        <View style={{flex:1}}>
          <Button title="Hola" onPress={()=> {firebase.db.collection('test').add(
        {
            aux: "hola"
        }
    );}}></Button>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  
});

export default App;
