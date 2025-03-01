import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from './backend.service';
import { CartService } from './cart.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }


  getImageType(base64: string): string {
    if (base64.startsWith('/9j/')) return 'image/jpeg';
    if (base64.startsWith('iVBORw0KGg')) return 'image/png';
    if (base64.startsWith('R0lGODdh')) return 'image/gif';
    if (base64.startsWith('UklGR')) return 'image/webp';
    return 'image/png'; // Default fallback
  }


  public convertBase64ToBlobUrl(base64: string, mimeType: string): string {

    try {
      const byteCharacters = atob(base64); // Decode Base64
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      return URL.createObjectURL(blob); 
    } catch (error) {
      throw new HttpErrorResponse({error : "Error in Converting Image to Blob"});
    }
    
  }
}
