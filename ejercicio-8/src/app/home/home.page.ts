import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public show:boolean = false;
    public message:boolean = true;
    public color:string = 'light';
  constructor(public platform: Platform, public flashlight: Flashlight) {
    this.color = "light";
  console.log(this.platform.platforms());
    this.platform.ready().then(() => {
        if((this.platform.is('mobile') || this.platform.is('tablet')) && (this.flashlight.available())){
            this.show = true;
            this.message = false;
        }else{
            this.show = false;
            this.message = true;
        }
    });
    this.platform.pause.subscribe(() => {this.flashlight.switchOff(); this.color = "light";});
    this.platform.backButton.subscribe(
    		()	=>	{this.flashlight.switchOff(); this.color = "light";}
    );

    	if	(this.platform.is('mobile'))	{
    	    //	This	will	only	print	when	on	iOS
    	    console.log('I	am	an	iOS	device!');
    	}
  }

  turnOf(){
    console.log("Apagamos");
  }

  checkflash(){

        if(this.flashlight.isSwitchedOn()){
            this.flashlight.switchOff();
            this.color = "light";
        }else{
            this.flashlight.switchOn();
            this.color = "primary";
        }

  }

}
