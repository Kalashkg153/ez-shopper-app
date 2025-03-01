export class User {

    username : string;
    token : string;
    role : string;

    constructor(role: any, username: any, token: any){
        this.role = role;
        this.token = token;
        this.username = username;
    }
}