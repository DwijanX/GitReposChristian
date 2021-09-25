/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, { Component,PureComponent } from 'react';
import Viewer from './Components/view';
import CustomButton from './Components/CustomButton';
import actionButtons from './Components/actionButtons';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ActionButtons from './Components/actionButtons';

  //Ciclo de montaje
  //primero se ejecuta metodo constructor
  //luego metodo componentWillMount pero se dejara de usar... sirve para setear valores como variables globales o variables dentro el contructor
  //render se ejecuta cada vez que hay un cambio en algun componente, se ejecuta justo despues de component willMount
  //COmponentDidMount se ejecuta despues de que la pantalla se renderizo sirve para hacer peticiones asincronas. se ejecuta despues de que todos sus hijos se rendericen
  //Ciclo de actualizacion
//Components willreceiveprops sirve para manejar los props y pasarlo de prop a estado local del componente
//shouldcomponentUpdate recibe dos parametros nextprops y nextstate   debe retornar true or false si true si hubo update 
//componentwillupdate Sirve para lo mismo que el willmount, podemos cambiar variables 
//componentdidupdate se ejecuta despues de que se actualizo el componente, se usan configuraciones de librerias etc recibe prevProps, prevstates
// Ciclo de desmontaje
//ComponentWillUnmount resetear estados globales de la apliacion que se esten usando en el componente. 
//metodos deprecados para eliminarse
//component willmount componentwill receiveprops y componentwillupdate porque ocasionaban leaks de memoria

//equivale usar purecomponent a la funcion shouldcomponent update
class App extends Component
{
  constructor(props)
  {
      super(props);
      this.state={
        counter:0,
      };
      this.handleUp=this.handleUp.bind(this);
      this.handleDown=this.handleDown.bind(this);
      this.handleReset=this.handleReset.bind(this);
      this.handlePlus10=this.handlePlus10.bind(this);
  }
  //shouldComponentUpdate(nextprops,nextstate)
  //{
    //const{counter}=this.state;
   // if(nextstate.counter==counter) return false;
    //return true;
  //}
  handleUp(){
    const {counter:ct}=this.state;
    this.setState({counter: ct+1})
  }
  handleDown(){
    const {counter:ct}=this.state;
    this.setState({counter: ct-1})
  }
  handleReset()
  {
    this.setState({counter:0})
  }
  handlePlus10()
  {
    const {counter:c}=this.state;
    this.setState({counter:c+10})
  }
  render(){
    const {counter}=this.state;
    return(
        <View style={styles.container}>

            <View style={styles.HaroldContainer}>
              <Text style={styles.HaroldText}>
                  Cuantas veces al dia Harold se la come?
              </Text>
            </View>


            <View style={styles.subContainer}>
              <CustomButton label='-' action={this.handleDown}/>
              <View style={styles.CounterContainer}>
                 <Text style={styles.counterText}>{counter}</Text>
              </View>
              <CustomButton label='+' action={this.handleUp}/>
            </View>
            <View style={styles.subContainerReset}>
              <ActionButtons actionreset={this.handleReset} actionplus={this.handlePlus10}></ActionButtons>

            </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container:
  {
    flex:1,
    backgroundColor: '#9b59b6',
    justifyContent:'center'
  },
  subContainer:
  {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  subContainerReset:
  {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:30
  },
  CounterContainer:
  {
    flex:1,
    justifyContent:'center',
    alignItems:'center'

  },
  counterText:
  {
    fontSize:40,
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
  HaroldText:
  {
    fontSize:20,
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
  HaroldContainer:
  {
    height: 50,
    width: '100%',
    justifyContent:'center',
    alignItems:'center'
  }
});

export default App;
