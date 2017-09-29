import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { QrInfoProvider } from '../../providers/qr-info/qr-info';

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {

	public Status: string = "Brak statusu";
	public ButtonText: string = "Skanuj";

  constructor(public navCtrl: NavController, private qrScanner: QRScanner, private qrInfoProvider: QrInfoProvider) {
  }

  public scanQR(){
	  this.qrScanner.prepare()
	  .then((status: QRScannerStatus) => {
		  if (status.authorized){
			 this.scanQRInternal();
		  } else if (status.denied){
			  this.Status = "Brak prawa do kamery";
		  }
		  else{
			  this.Status = "Nie uzyskano prawa do korzystania z kamery";
		  }
	  })
  }
  
  private scanQRInternal(){
	  this.Status = "Trwa skanowanie";
	  
	let scanSub = this.qrScanner.scan().subscribe((text: string) => {
		this.qrInfoProvider.GetQrInfo(text).then((data) => {
			alert("Zeskanowany kod: " + data);
		}, err => {
			alert(JSON.stringify(err));
		});
		
		this.qrScanner.hide();
		window.document.querySelector('ion-app').classList.remove('transparent-body');
		scanSub.unsubscribe();
	});
	
	this.qrScanner.show().then(data => {
		//this.Status = data;
	}, err => {
		this.Status = err;
	});
	
	window.document.querySelector('ion-app').classList.add('transparent-body');
  }  
}

