import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IRegister } from '../Model/register';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/Components/forgotpassword.component.html'
})
export class forgotpasswordComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    registers: IRegister[];
    register: IRegister;
    msg: string;
    indLoading: boolean = false;
    registerFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    clickMessage = '';
    users: IRegister[];
    user: IRegister;
    password: string;




    constructor(private fb: FormBuilder, private _registerService: UserService) { }

    ngOnInit(): void {
        this.LoadRegisters();
        this.password = "ssdds";
    }

    LoadRegisters(): void {
        this.indLoading = true;
        this._registerService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(registers => { this.users = registers; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    forgotpassword() {

        var password = "";
        var username = (<HTMLInputElement>document.getElementById('Usernametxt')).value;
        var securityQuestion = (<HTMLInputElement>document.getElementById('SecurityQ')).value;
        var securityAnswer = (<HTMLInputElement>document.getElementById('SecurityAnstxt')).value;
        password = (<HTMLInputElement>document.getElementById('Newpassword')).value;
        var confirmPassword = (<HTMLInputElement>document.getElementById('Confrmpassword')).value;
        console.log("username : " + username);
        var user;
        var usernameIsfound = false;
        var securityAnswerIsFound = false;
        
        for (var i = 0; i < this.users.length; i++)
        {
            if (this.users[i].Username == username) {
                user = this.users[i];
                usernameIsfound = true;
            }
            
        }
        
            if (usernameIsfound == true)
            {
                if ((securityQuestion == user.SecurityQuestion) && (securityAnswer == user.SecurityAnswer)) {
                    securityAnswerIsFound = true;
                    if (password == confirmPassword) {
                        user.Password = confirmPassword;
                        user.ConfirmPassword = confirmPassword;
                        this._registerService.put(Global.BASE_USER_ENDPOINT, user.Id, user).subscribe(
                            data => {
                                if (data == 1) //Success
                                {
                                    this.msg = "Data successfully updated.";
                                    window.location.href = "/login";
                                    return;
                                }
                                else {
                                    this.msg = "There is some issue in saving records, please contact to system administrator!";
                                    return;
                                }

                            }
                        );

                    }
                    else
                    {
                        this.msg = 'New password and confirm password Doesn\'t match CONTACT SYSTEM ADMIN!';
                    }
                  
                }
                else {
                    this.msg = 'Security Question - Security Answer doest match! CONTACT SYSTEM ADMIN! ';
                }

        }
            else {
                this.msg = 'username not found, Try again! OR CONTACT SYSTEM ADMIN!';
            }
        }
    }

