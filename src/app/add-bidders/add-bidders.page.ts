import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, Data } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-bidders',
  templateUrl: './add-bidders.page.html',
  styleUrls: ['./add-bidders.page.scss'],
})
export class AddBiddersPage implements OnInit {

  bidders = [];

  constructor(private router: Router,private http: Http,public alertController: AlertController, public data: DataService) {
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let options = new RequestOptions({ headers: headers });

    this.http.post('http://riccardohosts.ddns.net:8080/getSq.php',options).pipe(map(res => res.json()))
    .subscribe(res => {
      res.forEach(element => {
        let data = {
          Id : element.ID,
          Nome : element.Nome,
          isChecked : false
        }
        this.bidders.push(data);
      });

    });
  }


  send(){
    var d = [];
    this.bidders.forEach(element => {
      if(element.isChecked){
        d.push(element);
      }
    });
    this.data.teams = d;
    this.router.navigate(['insert-bidders']);
  }

  ngOnInit() {
  }

}
