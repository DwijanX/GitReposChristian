import React,{Component} from 'react';
import { View,StyleSheet,TextInput,Image, ScrollView, Text} from 'react-native';
import firebase from '../DataBase/Firebase';
import { ThemeProvider,Input,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const theme={
    Button:{
        buttonStyle:{
            backgroundColor:'#e1a8c0',
            width:'50%',
        },
        containerStyle:
        {
            alignItems:'center',
            justifyContent:'center'
        },
        titleStyle:
        {
            fontFamily: 'Futura',
            color: '#ecf0f1',
        }
    },
    Input:
    {
        inputContainerStyle:
        {
            color:'#ecf0f1'
        },
        inputStyle:
        {
            height:40,
            fontSize:20,
            fontFamily: 'Futura',
            color:'#ecf0f1'
        },
        placeholder:
        {
            color:'#ecf0f1'
        }
    },
    
}

class LogInScreen extends Component
{
    constructor(props)
  {
      super(props);
      this.state={
        Email:" ",
        Password:""
      };
      this.HandleTextChange=this.HandleTextChange.bind(this);
      this.HandleLogIn=this.HandleLogIn.bind(this);
      this.HandleNextScreenIfValid=this.HandleNextScreenIfValid.bind(this);
  }
  componentDidMount()
  {
    this.props.navigation.setOptions({headerShown: false});
  }
  HandleTextChange (name,value)
  {
    this.setState({...this.state,[name]:value})
  }
  HandleLogIn ()
  {
    const {Email,Password}=this.state;
    if(Email!="" && Password!="")
    {
        firebase.auth.signInWithEmailAndPassword(Email,Password).then(this.HandleNextScreenIfValid).catch((e)=>{
            alert(e);
        });
    }
  }
  HandleNextScreenIfValid()
  {
    firebase.auth.onAuthStateChanged((user)=> 
        {
            if(user!=undefined)
            {
                this.props.navigation.navigate('HomeScreen');
            }
        });
  }
  
   render()
    {
        const IconProps = { size:20,color:'#8d9297'};
        return(
            <View style={styles.GralView}>

                <View style={styles.ImageViewContainer}>
                    <Image source={require('../assets/logo-fin.png')} style={styles.ImageContainer}>

                    </Image>
                </View>
                
                <View style={styles.InputFieldsContainer}>
                    <ThemeProvider theme={theme}>
                        <Input 
                        placeholder="E-mail" 
                        onChangeText={(value)=>this.HandleTextChange('Email',value)} 
                        leftIcon={<Icon name='user-circle' {...IconProps}/>}>
                        </Input>
                        <Input 
                        placeholder="Password" 
                        onChangeText={(value)=>this.HandleTextChange('Password',value)}
                        leftIcon={<Icon name='lock' {...IconProps} />}>
                            
                        </Input>
                        <Button  title="Log In" onPress={()=>this.HandleLogIn()}>

                        </Button>   
                    </ThemeProvider>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor: '#c0c0c0',
        alignItems:'center'

    },
  InputFieldsContainer:
  {
      top:'5%',
      paddingVertical:'5%',
      width:'80%',
  },
  ButtonContainer:
  {
    backgroundColor:'#c0c0c0',
    fontFamily: 'Futura'
  },
  ImageViewContainer:
  {
      top:'10%',
      height:300,
      width:'100%',
      alignItems:'center',
      justifyContent:'center'
  },
  ImageContainer:
  {
      flex:1,
    borderColor:'black',
     width:'70%',
     height:'65%',
  },
});

export default LogInScreen;