import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.page.html',
  styleUrls: ['./competition.page.scss'],
})
export class CompetitionPage implements OnInit {

  astaId : any;
  teams : any;
  torneo : any;
  tor = "";

  comp = [
    {
      s1: 0,
      s2: 0
    },
    {
      s1: 0,
      s2: 0
    },
    {
      s1: 0,
      s2: 0
    },
    {
      s1: 0,
      s2: 0
    },
    {
      s1: 0,
      s2: 0
    }
  ]

  constructor(private http: Http,public alertController: AlertController) { 
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    this.http.post('http://riccardohosts.ddns.net:8080/getTorn.php',options).pipe(map(res => res.json()))
      .subscribe(res => {
        this.torneo = res;
    });

    this.http.post('http://riccardohosts.ddns.net:8080/getAsta.php',options).pipe(map(res => res.json()))
      .subscribe(res => {
        this.astaId = res[0].Id;
        this.getSquadre();
    });

  }

  getSquadre(){
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    let data = {
      username: this.astaId
    }

    this.http.post('http://riccardohosts.ddns.net:8080/getSquIdUsrs.php',data,options).pipe(map(res => res.json()))
      .subscribe(res => {
        this.teams = res;
        console.log(this.teams);
    });
  }

  onChangeTor(c){
    this.tor = c;
  }

  onChangeS1(c){
    this.teams.forEach(element => {
      console.log(c + " " +element.Nome);
      if(element.Nome == c){this.comp[0].s1 = parseInt(element.Id);}
    });

  }
  onChangeS2(c){
    this.teams.forEach(element => {
      if(element.Nome == c){this.comp[0].s2 = parseInt(element.Id);}
    });
  }
  onChangeS3(c){
    this.teams.forEach(element => {
      if(element.Nome == c){this.comp[1].s1 = parseInt(element.Id);}
    });
  }
  onChangeS4(c){
    this.teams.forEach(element => {
      if(element.Nome == c){this.comp[1].s2 = parseInt(element.Id);}
    });
  }
  onChangeS5(c){
    this.teams.forEach(element => {
      if(element.Nome == c){this.comp[2].s1 = parseInt(element.Id);}
    });
  }
  onChangeS6(c){
    this.teams.forEach(element => {
      if(element.Nome == c){this.comp[2].s2 = parseInt(element.Id);}
    });
  }
  onChangeS7(c){
    this.teams.forEach(element => {
      if(element.Nome == c){this.comp[3].s1 = parseInt(element.Id);}
    });
  }
  onChangeS8(c){
    this.teams.forEach(element => {
      if(element.Nome == c){this.comp[3].s2 = parseInt(element.Id);}
    });
  }
  onChangeS9(c){
    this.teams.forEach(element => {
      if(element.Nome == c){this.comp[4].s1 = parseInt(element.Id);}
    });
  }
  onChangeS10(c){
    this.teams.forEach(element => {
      if(element.Nome == c){this.comp[4].s2 = parseInt(element.Id);}
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

    for(var i = 0; i < 5; i++){
      console.log(this.comp[i].s1 );
      console.log(this.comp[i].s2 );
      if(this.comp[i].s1 != 0 && this.comp[i].s2 != 0){
        let data = {
          s1 : this.comp[i].s1,
          s2 : this.comp[i].s2,
          torn : this.tor
        }
        console.log(this.comp);
        this.http.post('http://riccardohosts.ddns.net:8080/insertComp.php',data,options).pipe(map(res => res.json())).subscribe(res => {});
      }
    }
  }
  send(){
    this.presentAlert();
  }

  ngOnInit() {
  }

}
