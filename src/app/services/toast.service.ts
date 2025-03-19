import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  notyf : Notyf;

  constructor() { 
    this.notyf = new Notyf({
      position: {
        x: 'right',
        y: 'bottom',
      },
      types: [
        {
          type: 'warning',
          background: 'orange',
          icon: {
            className: 'material-icons',
            tagName: 'i'
          }
        },
        {
          type: 'error',
          background: 'indianred',
          dismissible: true
        },
        {
          type: 'success',
          background : 'green',
          duration: 4000,
          dismissible: true
        }
      ]
    });
  }

SucessMessage(inmessage: string): void;
SucessMessage(inmessage: string, duration: number): void;

// Single implementation
SucessMessage(inmessage: string, duration?: number): void {
  this.notyf.open({
    type: 'success',
    message: inmessage,
    duration: duration !== undefined ? duration : 4000,
    dismissible: true
  });
}

  ErrorMessage(inmessage : string){
    this.notyf.open({
      type : 'error',
      duration : 4000,
      message: inmessage,
      dismissible: true
    })
  }

  InfoMessage(inmessage : string){
    this.notyf.open({
      type : 'warning',
      message : inmessage,
      dismissible : true
    })
  }
}
