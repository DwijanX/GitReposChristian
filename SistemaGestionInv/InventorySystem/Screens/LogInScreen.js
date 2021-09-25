import { DefaultTheme } from '@react-navigation/native';
import React,{Component} from 'react';
import { View,StyleSheet,Button,TextInput} from 'react-native';
import firebase from '../DataBase/FireBase'
/*<View style={styles.InputFieldsContainer}>
                    <Image source={require('../Images/65156164_356513391722655_1935122241339523072_n.png')} style={styles.ImageContaiener}>

                    </Image>
                </View>*/
firebase.auth.onAuthStateChanged(user=> 
    {
        alert(user);
    });
class LogInScreen extends Component
{
    constructor(props)
  {
      super(props);
      this.state={
        Email:"",
        Password:""
      };
      this.HandleTextChange=this.HandleTextChange.bind(this);
      this.HandleLogIn=this.HandleLogIn.bind(this);
  }
  
  HandleTextChange (name,value)
  {
    this.setState({...this.state,[name]:value})
  }
  HandleLogIn ()
  {
    const mail=this.state[Email];
    const Pass=this.state[Password];

    firebase.db.collection('test').add(
        {
            aux: "hola"
        }
    )
    //firebase.auth.signInWithEmailAndPassword(mail,Pass);
  }
  
   render()
    {
        return(
            <View style={styles.GralView}>
                
                
                <View style={styles.InputFieldsContainer}>
                    <TextInput placeholder="E-mail" onChangeText={(value)=>this.HandleTextChange('Email',value)}></TextInput>
                </View>
                <View style={styles.InputFieldsContainer}>
                    <TextInput placeholder="Password" onChangeText={(value)=>this.HandleTextChange('Password',value)}></TextInput>
                </View>
                <View style={styles.InputFieldsContainer} onPress={this.HandleLogIn} >
                    <Button title="Log In" onPress={()=>{console.log(this.state)}}></Button>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        justifyContent:'center',
        backgroundColor: '#ecf0f1'

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
  }
});

export default LogInScreen;