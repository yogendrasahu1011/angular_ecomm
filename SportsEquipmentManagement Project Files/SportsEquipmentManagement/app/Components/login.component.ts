import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from '../Service/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IUser } from '../Model/user';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { ActivatedRoute,Router} from '@angular/router';//nav
@Component({
    templateUrl: 'app/Components/login.component.html'
})

export class LoginComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    registers: IUser[];
    register: IUser;
    msg: string;
    indLoading: boolean = false;
    registerFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    clickMessage = '';
        

    constructor(private fb: FormBuilder, private to_login_router: Router, private _registerService: RegisterService) { }
    //private to_login_router:Router
    //import { ActivatedRoute,Router} from '@angular/router';//nav
    // this.to_login_router.navigate(['/user']);

    ngOnInit(): void {
        this.registerFrm = this.fb.group({
            FirstName: [''],
            LastName: [''],
            Contact: [''],
            Email: [''],
            Username: [''],
            SecurityQuestion: [''],
            SecurityAnswer: [''],
            Password: ['', Validators.required],
            ConfirmPassword: ['', Validators.required],
            Company: [''],
            Role: [''],
            DOB: ['']
        });
        this.LoadRegisters();
    }

    //call from login html L:63
    login(username: string, password: string) {//call with two parameters
        var usernameIsNotFound = false;
        var passwordIsNotMatch = false;
        for (var i = 0; i < this.registers.length; i++) {//Oninit method already loaded all users from DB
            if (this.registers[i].Username == username) {
                usernameIsNotFound = true;
                if (password == this.registers[i].Password) {
                    passwordIsNotMatch = true;

                    //setting currentuser to session storage on succesful login
                    var currentUser = this.registers[i];
                    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                    console.log(sessionStorage['currentUser']);

                    this.clickMessage = 'login successfully!';//here routing needed to Main Page
                    //routing
                    this.to_login_router.navigate(['/user']);
                    this.msg = this.registers[i].Role;
                    return;
                }

            }
        }
        if (usernameIsNotFound == true && passwordIsNotMatch == false) {
            this.clickMessage = 'Incorrect password';

        }
        else if (usernameIsNotFound == false) {
            this.clickMessage = 'Incorrect username';
        }
    }
     //END   call from login html L:63



    addRegister() {
        this.dbops = DBOperation.register;
        this.SetControlsState(true);
        this.modalTitle = "REGISTER HERE";
        this.modalBtnTitle = "Register";
        this.registerFrm.reset();
        this.modal.open();
    }




    LoadRegisters(): void {
        this.indLoading = true;
        this._registerService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(registers => { this.registers = registers; this.indLoading = false; },
            error => this.msg = <any>error);
    }



    
    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.register:
                this._registerService.post(Global.BASE_USER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "REGISTRATION SUCCESSFUL";
                            this.LoadRegisters();
                        }
                        else {
                            this.msg = "There is some issue in Registration, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
      
        }
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.registerFrm.enable() : this.registerFrm.disable();
    }
}
