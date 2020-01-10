import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      // "id" is here because we are adding it to the route in app.module.ts
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    // params as a property of the route acts as an observable. it is a way to subscribe to an event that might happen in the future to then execute code when it happens, without having to wait for it now
    this.route.params.subscribe(
      // lambda
      (params: Params) => {
        this.user.id = params['id'];
        this.user.id = params['name'];
      }
    );
  }

}
