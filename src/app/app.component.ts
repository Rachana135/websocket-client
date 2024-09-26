
import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket/socket.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './user.model';
import { Message } from './message.model';
import { concatMap, map } from 'rxjs/operators';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {

  users$ !: Observable<User[]>;
  userName: string='';
  name: string='';
  isOnline: boolean = false;

  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.users$ = this.socket
      .getClientId()
      .pipe(
        concatMap((clientId) =>
          this.socket
            .getUsersOnline()
            .pipe(map((users) => (users = users.filter((u) => u.id !== clientId)))
        )));  
  }

  join() {
    if (!this.name) {
      return;
    }

    this.socket.emitUser({
      id: null,
      name: this.name,
    });
    this.userName = this.name;
    this.name = '';
    this.isOnline = true;
  }

  exit() {
    this.socket.emitExit();
    this.isOnline = false;
  }

}