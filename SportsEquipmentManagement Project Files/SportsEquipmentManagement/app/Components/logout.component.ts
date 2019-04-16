import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';



@Component({
    templateUrl: 'app/Components/logout.component.html'
})


export class LogoutComponent implements OnInit {
   
    ngOnInit(): void {
        sessionStorage.clear();
       
    }

  
} 