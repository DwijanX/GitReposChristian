import React,{Component} from 'react';
import {View,StyleSheet,Button} from 'react-native'
import firebase from '../DataBase/Firebase';


class HomeScreen extends Component
{
    constructor(props)
  {
      super(props);
      this.HandleGoBackToLogIn=this.HandleGoBackToLogIn.bind(this);
  }
  HandleGoBackToLogIn()
  {
    firebase.auth.signOut().then(()=>
    {
        this.props.navigation.navigate('LogInScreen');
    }
    );
  }
   render()
    {
        return(
            <View style={styles.GralView}>
                
                <Button style={styles.ButtonContainer} title="Log out" onPress={this.HandleGoBackToLogIn}>

                </Button>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        justifyContent:'center',
        backgroundColor: 'blue'

    },
  InputFieldsContainer:
  {
      
      justifyContent:'center',
      width:'100%',
      paddingHorizontal:50,
      
  },
  ImageContaiener:
  {
     width:'50%',
     height:'50%' 
  },
  ButtonContainer:
  {
        paddingVertical:50,
        backgroundColor:'red'
  }
});

export  default HomeScreen;