import React,{useEffect,useState} from 'react';
import { Button } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View,StyleSheet,Text } from 'react-native';


const ScannerScreen=()=>
{
    const [hasPermission,setHasPermission]=useState(null);
    const [scanned,setScanned]=useState(false);
    const [text,setText]=useState('Not yet scanned');


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
            setScanned(true);
            setText(data);
            console.log('Type'+type+"\nData: "+data);
        }

    return(
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:handleBarCodeScanned}
                style={{height:400,width:400}}
                />
            </View>
            <Text style={styles.maintext}>
                {text}
            </Text>
            {scanned && <Button title="scan again" onPress={()=>{setScanned(false)}}/>}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    }
  });
  
export default ScannerScreen;