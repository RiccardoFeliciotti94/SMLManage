import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.page.html',
  styleUrls: ['./create-bid.page.scss'],
})
export class CreateBidPage implements OnInit {

  constructor(private router: Router,private http: Http,public alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Invio',
      subHeader: 'Vuoi veramente creare un\'asta?',
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

  insertAsta(){
    this.presentAlert();
  }

  updateDB(){
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });
    this.router.navigate(['add-players']);
    this.http.post('http://riccardohosts.ddns.net:8080/insertAsta.php',options).pipe(map(res => res.json()))
    .subscribe(res => {this.router.navigate(['add-players']);});
  }

  goBidders(){this.router.navigate(['add-bidders']);}

  ngOnInit() {
  }

}
