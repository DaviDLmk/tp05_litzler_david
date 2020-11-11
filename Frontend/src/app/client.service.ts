import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { nextTick } from 'process';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from './client';



@Injectable()
export class ClientService {
  private clients: Client[] = [];
  clientSubject = new Subject<Client[]>();

  emitClients() {
    this.clientSubject.next(this.clients.slice());
  }

  addClient(Client: Client) {


    let body: URLSearchParams = new URLSearchParams();
    body.set('client', JSON.stringify(Client));
    let newClient = this.httpClient.post<{ user: { client: string } }>(
      environment.register,
      body.toString(),
      {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      }
    ).pipe<Client>(map(response => JSON.parse(response.user.client)))
    newClient.subscribe(client => {
      this.clients.push(client);
      this.emitClients();
    });
    return newClient;
  }

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }


  getToken(login: string, mdp: string) {
    let body: URLSearchParams = new URLSearchParams();
    body.set('login', login);
    body.set('password', mdp);

    let response = this.httpClient.post<Object>(environment.login, body.toString(),
      {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        observe: "response"
      })
    response.subscribe(dataReturned => {
      console.log(dataReturned);
      console.log(dataReturned.headers.get("authorization"));
    });
    return response
  }

}