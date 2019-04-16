import { Component } from "@angular/core";
import { IUser } from '../Model/user';

@Component({
    selector: "header-app",
    templateUrl: 'app/Components/header.component.html'
})

export class HeaderComponent {
    currentUser: IUser;//BDS 

    ngOnInit(): void {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));//BDS
        console.log(this.currentUser);
    }
}

