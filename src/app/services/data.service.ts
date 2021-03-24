import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  users: any;

  subject = webSocket({
    url:
      'wss://wunder-provider.herokuapp.com/socket.io/?EIO=3&transport=websocket',
    deserializer: ({ data }) => {
      if (data.startsWith('42')) {
        return JSON.parse(data.substring(2))[1];
      } else {
        return null;
      }
    },
  });

  getAll() {
    this.users = [];
    this.subject.subscribe((msg) => {
      // Called whenever there is a message from the server.
      if (msg != null && msg.results != null) {
        msg.results.forEach((r) => {
          this.users.push(r);
        });
      }
    });
    return this.users;
  }
}
