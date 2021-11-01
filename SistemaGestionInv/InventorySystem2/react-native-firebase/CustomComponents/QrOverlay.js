import React,{ Fragment,useRef,useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library'
import { Button,Overlay } from 'react-native-elements';

import QRCode from 'react-native-qrcode-svg';


const QrOverlay=(props)=>
{
    const [hasPermission, setHasPermission] = useState(MediaLibrary.getPermissionsAsync());
    let myQRCode = useRef();
    
  const askForMediaPermission=()=>
  {
      MediaLibrary.requestPermissionsAsync().then((ans)=>
          {
              setHasPermission(ans.granted)
          }
      )
  }
    const downloadQrCode = async() => 
    {
        myQRCode.toDataURL(async (dataURL) => {
           
            if(!hasPermission)
            {
                await askForMediaPermission();
            }
            if(hasPermission)
            {
                    let FileName= props.ImageName+".png"
                    FileName=FileName.replace(/\s/g, '');
                    const data = `data:image/png;base64,${dataURL}`
                    const base64Code = data.split("data:image/png;base64,")[1];
    
                    const filename = FileSystem.documentDirectory+FileName;
                    await FileSystem.writeAsStringAsync(filename, base64Code, {
                    encoding: FileSystem.EncodingType.Base64,
                    });
    
                    const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
                    alert("descarga exitosa")
            }
            
            
          });
         

    };
    return(
        <Fragment>
        <Overlay  isVisible={props.visible}  onBackdropPress={props.toggleVisible}> 
            <QRCode
                logo={require('../assets/logo-fin.png')}
                logoSize={40}
                getRef={(ref) => (myQRCode = ref)}
                value={props.data}
                size={250}
                color="black"
                backgroundColor="white"
                logoSize={30}
                logoMargin={6}
                logoBorderRadius={15}
                logoBackgroundColor="#95a5a6"
                logoSize={60}
                />
            <Button title="Descargar codigo QR"  onPress={downloadQrCode}/>

        </Overlay>
    </Fragment>
    );
}

  
export default QrOverlay;