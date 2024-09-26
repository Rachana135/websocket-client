import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from '../message.model';
import { User } from '../user.model';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} }
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  emitUser(user: User): void {
    this.socket.emit('add-user', user);
  }

  emitExit(): void {
    this.socket.emit('exit');
  }

  getClientId(): Observable<string> {
    console.log(this.socket)
    return this.socket.fromEvent('user-id');
  }
  
  getUsersOnline(): Observable<User[]> {
    return this.socket.fromEvent<User[]>('users-online');
  }

}