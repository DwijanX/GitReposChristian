import React,{Component} from 'react';
import {View,StyleSheet,Button} from 'react-native'
import { Header,ButtonGroup } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
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
   render()
    {
        
        return(
            <View style={styles.GralView}>
                <Button title="View Products" onPress={()=>{this.props.navigation.navigate('ViewProductsScreen');}}/>
                <Button title="View Containers" onPress={()=>{this.props.navigation.navigate('ViewContainersScreen');}}/>
                <Button title="Add Container" onPress={()=>{this.props.navigation.navigate('AddContainerScreen');}}/>
                <Button title="Scanner" onPress={()=>{this.props.navigation.navigate('ScannerScreen');}}/>
                <Button title="Log Out"  onPress={this.HandleLogOut}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    GralView:
    {
        flex:1,
        backgroundColor:"#7f8c8d",
        flexDirection:'column'
    },
});

export  default HomeScreen;