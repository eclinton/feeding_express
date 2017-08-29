import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MessageService {

  constructor(private database: AngularFireDatabase) {
  }

  addMessage(message: string) {
      this.database.list(`/message/`).push({ name: message});
  }

}
