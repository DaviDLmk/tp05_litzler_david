import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  authForm: FormGroup;
  response : Observable<any>;
  constructor(private formBuilder: FormBuilder, private clientService: ClientService) { }

  ngOnInit() {
  
    this.authForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitForm(){
    const formValue = this.authForm.value;
    this.response = this.clientService.getToken(formValue["login"], formValue["password"] );
    
  }

}