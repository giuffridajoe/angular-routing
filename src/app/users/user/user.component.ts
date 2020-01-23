import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  ngOnDestroy(): void {
    // angular does this for you, but adding your own destroy is a good idea
    this.paramsSubscription.unsubscribe();
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      // "id" is here because we are adding it to the route in app.module.ts
      // this approach can be usedd if you know for sure these params will be in the route
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    // params as a property of the route acts as an observable. it is a way to subscribe to an event that might happen in the future to then execute code when it happens, without having to wait for it now
    this.paramsSubscription = this.route.params.subscribe(
      // lambda
      (params: Params) => {
        this.user.id = params['id'];
        this.user.id = params['name'];
      }
    );
  }

}
