import React,{Component} from 'react';
import {View,StyleSheet} from 'react-native'
import { Button,Divider,ListItem,Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


import firebase from '../DataBase/Firebase';


class HomeScreen extends Component
{
    constructor(props)
  {
      super(props);
      this.state={
          ShowHeader:true,
      }
      this.HandleLogOut=this.HandleLogOut.bind(this);
      this.CreateButton=this.CreateButton.bind(this);
  }
  componentDidMount()
  {
    this.props.navigation.setOptions({headerShown: true});

  }
  HandleLogOut()
  {
      firebase.auth.signOut();               
    this.props.navigation.setOptions({headerShown: false});
      this.props.navigation.navigate('LogInScreen');
  }
  CreateButton(Title,IconName,NameOfScreentoNavigate)
  {
    const IconProps = { size:20,color:'white'};
      return(
        <Button title={Title} icon={<Icon name={IconName} {...IconProps}/>} buttonStyle={styles.button} containerStyle={styles.buttonContainerStyle} onPress={()=>{this.props.navigation.navigate(NameOfScreentoNavigate);}}/>
      );
  }
   render()
    {
    const IconProps = { size:20,color:'white'};
        
        return(
            <View style={styles.GralView}>
                <View style={styles.ButtonView}>
                    {this.CreateButton("Agregar productos nuevos","plus","AddNewProductScreen")}
                    {this.CreateButton("Agregar productos existentes","plus","AddProductsNumScreen")}
                    {this.CreateButton("Ver productos","list","ViewProductsScreen")}
                    {this.CreateButton("Ver contenedores","list","ViewContainersScreen")}
                </View>
                <View style={styles.ButtonView}>
                    {this.CreateButton("Agregar Contenedores","plus","AddContainerScreen")}
                    {this.CreateButton("Productos Comprometidos","shopping-basket","CompromisedProductsScreen")}
                    {this.CreateButton("Scanner","qrcode","ScannerScreen")}
                    {this.CreateButton("ABCScreen","adn","ABCScreen")}
                    <Button title="Log Out" icon={<Icon name='arrow-right' {...IconProps}/>} buttonStyle={styles.button}containerStyle={styles.buttonContainerStyle} onPress={this.HandleLogOut}/>
                </View>
                    

                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor:"#7f8c8d",
        flexDirection:'row',
    },
    ButtonView:
    {
        flex:1/2,
        alignItems:"center",
        paddingVertical:20,
        paddingHorizontal:10
    },
    button: {
        height:80,
        width:"90%",
        justifyContent: "space-evenly",
      },
    buttonContainerStyle:
    {
        paddingVertical:10,

    }
});

export  default HomeScreen;