import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.page.html',
  styleUrls: ['./add-players.page.scss'],
})
export class AddPlayersPage implements OnInit {

  astaId: any;
  players = [];

  constructor(private router: Router,private http: Http,public alertController: AlertController) {
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    this.http.post('http://riccardohosts.ddns.net:8080/getAsta.php',options).pipe(map(res => res.json()))
    .subscribe(res => {
      this.astaId = res[0].Id;
      this.loadPlayers();
    });
  }

  loadPlayers(){
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    this.http.post('http://riccardohosts.ddns.net:8080/getPlayers.php',options).pipe(map(res => res.json()))
    .subscribe(res => {
      res.forEach(element => {
        let data = {
          Id : element.Id,
          Nickname : element.Nickname,
          isChecked : false
        }
        this.players.push(data);
      });
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

  send(){this.presentAlert();}

  updateDB(){
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    this.players.forEach(element => {
      if(element.isChecked){
        let data = {
          astaId : this.astaId,
          giocatore : element.Id
        }
        console.log(data);
        this.http.post('http://riccardohosts.ddns.net:8080/insertAstaGiocatore.php',data,options).pipe(map(res => res.json()))
        .subscribe(res => {});
      }
      
    });
    this.router.navigate(['add-bidders']);

  }

  ngOnInit() {
  }

}
