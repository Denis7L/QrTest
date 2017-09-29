import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MyDbProvider } from '../../providers/my-db/my-db';
import 'rxjs/add/operator/map';

/*
  Generated class for the QrInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrInfoProvider {

  constructor(public http: Http, private dbProvider: MyDbProvider) {    
  }

  public GetQrInfo(text: string): Promise<string>{	  
	  return this.dbProvider.Db.executeSql("SELECT * FROM LINKS WHERE URL = '" + text + "'", {})
	  .then(data => {
			return new Promise((resolve, reject) => {
				if (data.rows.length == 0) {
					reject(text + " - brak informacji");
				} else{
					resolve(text + " - " + data.rows.item(0).DESCRIPTION);
				}
			});
	  }, err => {return Promise.reject(err);});
  }
}
