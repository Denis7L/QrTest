import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QrInfoProvider } from '../../providers/qr-info/qr-info';
import { MyDbProvider } from '../../providers/my-db/my-db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public Status: string = "Brak statusu";

  constructor(public navCtrl: NavController, private db: MyDbProvider, private qrInfoProvider: QrInfoProvider) {
	  db.Init().then((data) => {
		  alert(JSON.stringify(data));		  
	  });
  }

}
