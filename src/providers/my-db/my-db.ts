import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

/*
  Generated class for the MyDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyDbProvider {
	
	public Db: SQLiteObject;
	
  constructor(public sqlite: SQLite) {    
	
  }
  
  public Init(): Promise<any>{
	  return this.sqlite.create({
		  name: 'myDb.db', location: 'default'
		  })
		.then((db: SQLiteObject) => {
			this.Db = db;
			return db.executeSql(`CREATE TABLE IF NOT EXISTS LINKS (
				ID INTEGER PRIMARY KEY AUTOINCREMENT,				
				URL TEXT,
				DESCRIPTION TEXT
		)`, {});})
		.then(data => {
			console.log("TABLE CREATED: ", data);			
			return this.Seed();
		}, error => {return Promise.reject(error);}) 
  }
  
  public ExecuteQuery(sql: string){
	  this.Db.executeSql(sql, {})
		.then((data) => {
			return data;
		}, (error) => {
			throw error;
		});
  }
  
  public Seed(): Promise<any> {
	  return this.Db.executeSql("INSERT OR REPLACE INTO LINKS (ID, URL, DESCRIPTION) VALUES (1, 'www.google.pl', 'Wyszukiwarka')", {})
	  .then((data) => {
		  return this.Db.executeSql("INSERT OR REPLACE INTO LINKS (ID, URL, DESCRIPTION) VALUES (2, 'www.twojapogoda.pl', 'Portal pogodowy')", {});
		  	  
	  }, err => {Promise.reject(err);});
	  
	  //this.ExecuteQuery("INSERT OR REPLACE INTO LINKS (ID, URL, DESCRIPTION) VALUES (1, 'www.google.pl', ''Wyszukiwarka')");
	  //this.ExecuteQuery("INSERT OR REPLACE INTO LINKS (ID, URL, DESCRIPTION) VALUES (2, 'www.twojapogoda.pl', ''Portal pogodowy')");
  }
}
