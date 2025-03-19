import { Component } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { ToastService } from '../../services/toast.service';
import { faChainSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {


  users : any[] = [];

  constructor(private userapi : UserApiService, private message : ToastService){

  }

  ngOnInit() : void{
    this.userapi.getAllUsers().subscribe({
      next : (res) => {
        this.users = res;
        console.log(res);
      },
      error : (err) => {
        this.message.ErrorMessage(err.error);
      }
    })
  }
}
