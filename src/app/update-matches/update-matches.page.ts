import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-matches',
  templateUrl: './update-matches.page.html',
  styleUrls: ['./update-matches.page.scss'],
})
export class UpdateMatchesPage implements OnInit {

  players = [];
  astaId : any;
  idSqu : any;

  constructor(private http: Http,public alertController: AlertController, private router: Router) {
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    this.http.post('http://riccardohosts.ddns.net:8080/getAsta.php',options).pipe(map(res => res.json()))
      .subscribe(res => {
        this.astaId = res[0].Id;
        this.getPlayers();
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
            this.router.navigate(['competition']);
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
    this.players.forEach(element => {
      let data = {
        astaId: this.astaId,
        giocatore: element.giocatore,
        goal: element.Goal,
        assist: element.Assist
      };
      this.http.post('http://riccardohosts.ddns.net:8080/updateAstaGioc.php',data,options).pipe(map(res => res.json())).subscribe(res => {});
      this.http.post('http://riccardohosts.ddns.net:8080/updateGioc.php',data,options).pipe(map(res => res.json())).subscribe(res => {});
    });
    let data = {
      username : this.astaId
    }
    this.http.post('http://riccardohosts.ddns.net:8080/updateAstaData.php',data,options).pipe(map(res => res.json())).subscribe(res => {});

  }

  getPlayers(){
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    let data = {
      username: this.astaId
    };

    this.http.post('http://riccardohosts.ddns.net:8080/getSquIdUsrs.php',data,options).pipe(map(res => res.json()))
      .subscribe(res => {
        this.idSqu = res;
        this.buildGrid();
    });
  }

  buildGrid(){
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    let data = {
      username: this.astaId
    };

    this.http.post('http://riccardohosts.ddns.net:8080/getPlayersForUpdate.php',data,options).pipe(map(res => res.json()))
      .subscribe(res => {
        res.forEach(element => {
          element.Goal = parseInt(element.Goal);
          element.Assist = parseInt(element.Assist);
          this.players.push(element);
        }); 
    });
  }

  plusG(item){
    item.Goal += 1;
  }

  minG(item){
    item.Goal -= 1;
  }

  plusA(item){
    item.Assist += 1;
  }

  minA(item){
    item.Assist -= 1;
  }

  send(){
    this.presentAlert();
    console.log(this.players);
  }

  ngOnInit() {
  }

}
