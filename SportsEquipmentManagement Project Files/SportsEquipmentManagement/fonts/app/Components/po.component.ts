import { Component, OnInit, ViewChild } from '@angular/core';
import { POService } from '../Service/po.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IPO } from '../Model/PO';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({

    templateUrl: 'app/Components/po.component.html'

})

export class POComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    pos: IPO[];
    po: IPO;
    msg: string;
    indLoading: boolean = false;
    poFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    poNumber: String;

    constructor(private fb: FormBuilder, private _poService: POService) { }

    ngOnInit(): void {
        var index = document.URL.indexOf("=");
        this.poNumber = document.URL.slice(index + 1);
        this.poFrm = this.fb.group({
            Id: [''],
            PONumber: ['', Validators.required],
            Buyer: ['', Validators.required],
            Supplier: ['', Validators.required],
            BuyerUserID: ['', Validators.required],
            BuyerUserEmail: ['', Validators.required],
            PurchaseItemNameList: ['', Validators.required],
            PurchaseItemquantityList: ['', Validators.required],
            PurchaseItempriceList: ['', Validators.required],
            Totalamount: ['', Validators.required]
        });
        this.LoadPO();
    }

    LoadPO(): void {
        this.indLoading = true;
        this._poService.get(Global.BASE_PO_ENDPOINT)
            .subscribe(pos => { this.pos = pos; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    addPO() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New PO";
        this.modalBtnTitle = "Add";
        this.poFrm.reset();
        this.modal.open();
    }

    editPO(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit PO";
        this.modalBtnTitle = "Update";
        this.po = this.pos.filter(x => x.Id == id)[0];
        this.poFrm.setValue(this.po);
        this.modal.open();
    }

    deletePO(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.po = this.pos.filter(x => x.Id == id)[0];
        this.poFrm.setValue(this.po);
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._poService.post(Global.BASE_PO_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadPO();
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
                this._poService.put(Global.BASE_PO_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadPO();
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
                this._poService.delete(Global.BASE_PO_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadPO();
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
        isEnable ? this.poFrm.enable() : this.poFrm.disable();
    }
}

