import {  Component } from '@angular/core';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorsComponent {

  sponsorCoopace(){
    window.open("https://www.coopace.com.uy/home");
  }
  sponsorSuraBit(){
    window.open("https://surabit.com/");
  }
  sponsorTrade(){
    window.open("https://www.coopace.com.uy/home");
  }
}
