import React,{useEffect,useState} from 'react';
import { Button } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View,StyleSheet,Text } from 'react-native';

const ScannerScreen=(props)=>
{
    const [hasPermission,setHasPermission]=useState(null);
    const [scanned,setScanned]=useState(false);

    const askForCameraPermission=()=>
    {
        (async()=>
        {
            const {status}=await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status=='granted');
        })()
    }
    useEffect(()=>
    {
        props.navigation.setOptions({headerShown: true});
        askForCameraPermission();
    },[]);

    if(hasPermission==null)
    {
        return(
            <View style={styles.container}>
                <Text>Requesting Camera permission</Text>
            </View>
        )
    }

    if(hasPermission==false)
    {
        return(
            <View style={styles.container}>
                <Text>No access to camera</Text>
                <Button title="Allow Camera" onPress={()=>{askForCameraPermission()}}></Button>
            </View>
        )
    }
    const handleBarCodeScanned=({type,data})=>
        {
            let auxData={};
            setScanned(true);
            try
            {
                auxData=JSON.parse(data);
            } catch(e) {
                alert("Invalid Qr Code"); 
            }
            if(auxData.DocId!=undefined)
            {
                props.navigation.navigate('ShowProductsContained',{DocId: auxData.DocId});
            }
            else
            {
                alert("Invalid Qr Code"); 
            }
        }
    return(
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:handleBarCodeScanned}
                style={{height:400,width:400}}
                />
            </View>
            {scanned && <Button title="scan again" buttonStyle={styles.ButtonStyle} onPress={()=>{setScanned(false)}}/>}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    },
    ButtonStyle:{
        marginTop:5,
        width:'65%',
        marginVertical:2,
        alignItems:'center',
        alignContent:"center",
        justifyContent:'space-evenly',
    },
  });
  
export default ScannerScreen;