import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { element } from 'protractor';

@Component({
  selector: 'app-insert-bidders',
  templateUrl: './insert-bidders.page.html',
  styleUrls: ['./insert-bidders.page.scss'],
})
export class InsertBiddersPage implements OnInit {

  astaId:any;
  rooms = [];
  teams : any;

  constructor(private router: Router,private http: Http,public alertController: AlertController, public data : DataService) {
    
    this.teams = data.teams;

    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    this.http.post('http://riccardohosts.ddns.net:8080/getAsta.php',options).pipe(map(res => res.json()))
    .subscribe(res => {
      this.astaId = res[0].Id;
      this.buildRooms();
    });
  }

  buildRooms(){
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    let data = {
      astaId : this.astaId
    }

    this.http.post('http://riccardohosts.ddns.net:8080/getMaxRoom.php',data,options).pipe(map(res => res.json()))
    .subscribe(res => {
      if(isNaN(parseInt(res[0].Max))){
        var i = 0;
      }
      else{
        var i = parseInt(res[0].Max) + 1;
      }

      for(var j = i ; j < 5; j++){
        let data = {
          room : j,
          s1: 0,
          s2: 0
        }
        this.rooms.push(data);
      }
    });
  }

  onChangeS1(c,r){
    console.log(this.rooms);
    this.rooms.forEach(element => {
      if(r == element.room){
        this.teams.forEach(element2 => {
          if(element2.Nome == c){
            element.s1 = parseInt(element2.Id);
          }
        });
      }
    });
  }

  onChangeS2(c,r){
    console.log(this.rooms);
    this.rooms.forEach(element => {
      if(r == element.room){
        this.teams.forEach(element2 => {
          if(element2.Nome == c){
            element.s2 = parseInt(element2.Id);
          }
        });
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Invio',
      subHeader: 'Vuoi veramente inviare i dati?',
      buttons: [
        {
          text:'Sì',
          handler: () => {
            this.updateDB();
          }
        },
        {
          text:'No'
        }
      ]
    });

    await alert.present();
  }

  updateDB(){
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });


    this.rooms.forEach(element => {
      if(element.s1 != 0 && element.s2 != 0){
        let data = {
          room : element.room,
          squadraId : element.s1
        }
        this.http.post('http://riccardohosts.ddns.net:8080/insertSquadraDefinitaDaAsta.php',data,options).pipe(map(res => res.json()))
        .subscribe(res => {});
  
        let d = {
          squadraId : element.s1
        }
  
        this.http.post('http://riccardohosts.ddns.net:8080/getSquadraAstaId.php',d,options).pipe(map(res => res.json()))
        .subscribe(res => {
          this.insertAstaSquadraAsta(res[0].Id);
        });
        let data2 = {
          room : element.room,
          squadraId : element.s2
        }
        this.http.post('http://riccardohosts.ddns.net:8080/insertSquadraDefinitaDaAsta.php',data2,options).pipe(map(res => res.json()))
        .subscribe(res => {});
        let d2 = {
          squadraId : element.s2
        }
  
        this.http.post('http://riccardohosts.ddns.net:8080/getSquadraAstaId.php',d2,options).pipe(map(res => res.json()))
        .subscribe(res => {this.insertAstaSquadraAsta(res[0].Id);});
      }
    });

      

    
  }

  insertAstaSquadraAsta(id){
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    let data = {
      astaId : this.astaId,
      squadraAstaId : id
    }
    this.http.post('http://riccardohosts.ddns.net:8080/insertAstaSquadraAsta.php',data,options).pipe(map(res => res.json()))
    .subscribe(res => {});
  }

  send(){
    this.presentAlert();
  }

  ngOnInit() {
  }

}
