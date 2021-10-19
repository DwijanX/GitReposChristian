
 import React,{useState} from 'react';
 import { StyleSheet,Text,View,Button, ImageBackgroundBase,Image } from 'react-native';
 //import firebase from './DataBase/FireBase'
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import LogInScreen from './Screens/LogInScreen'
 import HomeScreen from './Screens/HomeScreen'
 import ViewProductsScreen from './Screens/ViewProductsScreen'
 import ProductDetailScreen from './Screens/ProductDetailScreen';
 import AddContainerScreen from './Screens/AddContainerScreen';
 import PutProductsIntoContainerScreen from './Screens/PutProductsIntoContainerScreen';
 import ViewContainersScreen from './Screens/ViewContainersScreen';
 import ScannerScreen from './Screens/ScannerScreen';
 import ContainerDetailScreen from './Screens/ContainerDetailScreen'
 import ShowProductsContained from './Screens/ShowProductsContained';
 import AddProductsNumScreen from './Screens/AddProductsNumScreen';
 import AddNewProductScreen from './Screens/AddNewProductScreen';
 
 import * as Font from 'expo-font';
 import AppLoading from 'expo-app-loading';
 import { Header} from 'react-native-elements';
import { func } from 'prop-types';

 const fetchFont=()=>
 {
   return Font.loadAsync({
     'Futura':require('./assets/fonts/Futura.ttf'),
     'Anton-Regular':require('./assets/fonts/Anton-Regular.ttf')
   });
 }
 /*
 */
 //screenOptions={{headerShown:false}}
 //
 const Stack = createNativeStackNavigator();
 function LogoTitle()
 {
   return(
    <Image source={require('./assets/logo-fin.png')} style={styles.ImageContainer}>

    </Image>
   );
 }
 function MyStack()
 {
   return(
     <Stack.Navigator
     screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: '#c0c0c0',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>   

<Stack.Screen name="LogInScreen" component={LogInScreen}/>

    <Stack.Screen name="HomeScreen" component={HomeScreen}/>

    <Stack.Screen name="AddNewProductScreen" component={AddNewProductScreen}/>
    <Stack.Screen name="AddProductsNumScreen" component={AddProductsNumScreen}/>


    <Stack.Screen name="ViewProductsScreen" component={ViewProductsScreen}/>

       <Stack.Screen name="ContainerDetailScreen" component={ContainerDetailScreen}/>

      
      <Stack.Screen name="ViewContainersScreen" component={ViewContainersScreen}/>
       <Stack.Screen name="AddContainerScreen" component={AddContainerScreen}/>
       <Stack.Screen name="ScannerScreen" component={ScannerScreen}/>
       <Stack.Screen name="ShowProductsContained" component={ShowProductsContained}/>
       <Stack.Screen name="PutProductsIntoContainerScreen" component={PutProductsIntoContainerScreen}/>
       <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen}/>
     </Stack.Navigator>
   );
 }
export default function App()
 {
   const [fontLoaded,setfontLoaded]=useState(false);
   if(!fontLoaded)
   {
    return (<AppLoading startAsync={fetchFont}
      onError={()=>console.log('Error')}
      onFinish={()=>
      {
        setfontLoaded(true);
      }}
     />);
   }
   
     return(
         <NavigationContainer>
            <MyStack>
              
            </MyStack>
         </NavigationContainer>
     );
 }
 const styles = StyleSheet.create({
   aux:
   {
     flex:1,
     backgroundColor:'red'
   }
 });
 
 