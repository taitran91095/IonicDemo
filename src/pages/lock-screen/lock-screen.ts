import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import PatternLock from 'patternlock';
import { FingerprintAIO ,FingerprintOptions} from '@ionic-native/fingerprint-aio';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LockScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-lock-screen',
  templateUrl: 'lock-screen.html',
})
export class LockScreenPage {

  constructor(private storage:Storage ,public platform : Platform,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private fingerAuth: FingerprintAIO) {

  }
  
  ionViewDidLoad() {
    var storage = this.storage;
    console.log('ionViewDidLoad LockScreenPage');
    var viewCtrl = this.viewCtrl; 
     var lock = new PatternLock("#lockScreen",{
      enableSetPattern : true,
      onDraw:function(pattern){
        let drawPattern = lock.getPattern();
        if(drawPattern / 1000 > 1){
          storage.set('modal', 'false');
          viewCtrl.dismiss();
        }else{
          lock.error();
          setTimeout(function(){
            lock.setPattern('');
          },200);
        }
      }
    }); 
  }

  fingerprintOptions : FingerprintOptions;

  showFingerprintAuthDlg(){
    var viewCtrl = this.viewCtrl; 
    var storage = this.storage;
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
        .then((result: any) => {console.log(result);storage.set('modal', 'false');viewCtrl.dismiss()})
        .catch((error: any) => console.log(error));
    }else{
      console.log(JSON.stringify(result))
    }
    },error=>{
      console.log("No Auth")
    });
  }
  ionViewDidEnter() {
    // this.showFingerprintAuthDlg();
  }

  
   ngOnInit(): void {
    
  } 
}
