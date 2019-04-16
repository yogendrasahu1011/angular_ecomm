import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../Service/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ICompany } from '../Model/company';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({
   templateUrl: 'app/Components/company.component.html'
})


export class CompanyComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    companies: ICompany[];
    company: ICompany;
    msg: string;
    indLoading: boolean = false;
    companyFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    searchTitle: string = "";

    constructor(private fb: FormBuilder, private _companyService: CompanyService) { }

    ngOnInit(): void {
        this.companyFrm = this.fb.group({
            CompanyId: [''],
            Name: ['', Validators.required],
            Email: ['', Validators.required],
            Phone: ['', Validators.required],
            Owner: [''],
            Street: [''],
            City: [''],
            State: ['', Validators.required],
            Country: ['', Validators.required],
            DUNS: ['', Validators.required],
            Type: ['', Validators.required]
        });
        this.LoadCompanies();
    }

    LoadCompanies(): void {
        this.indLoading = true;
        this._companyService.get(Global.BASE_COMPANY_ENDPOINT)
            .subscribe(companies => { this.companies = companies; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    addCompany() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Company";
        this.modalBtnTitle = "Add";
        this.companyFrm.reset();
        this.modal.open();
    }

    editCompany(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Company";
        this.modalBtnTitle = "Update";
        this.company = this.companies.filter(x => x.CompanyId == id)[0];
        this.companyFrm.setValue(this.company);
        this.modal.open();
    }

    deleteCompany(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.company = this.companies.filter(x => x.CompanyId == id)[0];
        this.companyFrm.setValue(this.company);
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._companyService.post(Global.BASE_COMPANY_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadCompanies();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._companyService.put(Global.BASE_COMPANY_ENDPOINT, formData._value.CompanyId, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadCompanies();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._companyService.delete(Global.BASE_COMPANY_ENDPOINT, formData._value.CompanyId).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadCompanies();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
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
        isEnable ? this.companyFrm.enable() : this.companyFrm.disable();
    }


    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;
    }
}


