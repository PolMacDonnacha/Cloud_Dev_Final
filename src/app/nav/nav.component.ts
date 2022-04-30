import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  signedIn : Boolean = false;
  constructor(private auth: AuthService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.signedIn = this.auth.isLoggedIn();
        //console.log(`Logged in: ${this.signedIn}`)
      }
    })

  }

  public signOut(): void {
    this.auth.signOut();
    this.signedIn = this.auth.signedIn;
    }
    
    

}
