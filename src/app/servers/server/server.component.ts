import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) {

    }

  ngOnInit() {
    this.route.data
    .subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
    // // the + converts the 'id' field from a string to a number
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
  }

  onEdit() {
    // queryParamsHandling (default is to drop values)
    //  merge: takes old ones and merge them with new ones
    //  preserve: makes sures old ones are kept
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
