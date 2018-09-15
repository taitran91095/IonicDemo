import { Component } from '@angular/core';
import { FingerprintAIO ,FingerprintOptions} from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(private fingerAuth: FingerprintAIO) {

  }
  fingerprintOptions : FingerprintOptions;
  
  showFingerprintAuthDlg(){
    console.log("enter");
    this.fingerprintOptions = {
        clientId: 'fingerprint-Demo',
        clientSecret: 'password', //Only necessary for Android
        disableBackup:true  //Only for Android(optional)
    }
    const temp = this.fingerAuth.isAvailable();
    this.fingerAuth.isAvailable().then(result =>{
    if(result === "finger")
    {
        this.fingerAuth.show(this.fingerprintOptions)
        .then((result: any) => console.log(result))
        .catch((error: any) => console.log(error));
    }else{
      console.log(JSON.stringify(result))
    }
    },error=>{
      console.log("No Auth")
    });
  }
}
