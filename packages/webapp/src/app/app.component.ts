import { Component, OnInit } from '@angular/core';
import { ChatRelayMessage, User } from '@websocket/types';
import { AppService } from './app.service';

@Component({
  selector: 'websocket-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'I am Angular';

  messages: ChatRelayMessage[] = [];
  currentUser: User;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.messages = [
      {
        event: 'chatRelay',
        author: { name: 'Jane', id: 1 },
        contents: 'Hi this is Jane',
      },
      {
        event: 'chatRelay',
        author: { name: 'Henry', id: 1 },
        contents: 'Hello I am Henry',
      },
    ];

    this.appService.user$.subscribe((user) => (this.currentUser = user));
  }

  connect(userNameInput: HTMLInputElement): void {
    const name = userNameInput.value;
    this.appService.connect(name);
    console.log(`connecting as ${userNameInput.value} success`);
  }
}
