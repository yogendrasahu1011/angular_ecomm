import { Component, OnInit, ViewChild } from "@angular/core";
import { POService } from '../Service/po.service';
import { IPO } from '../Model/PO';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../Model/user';//

import { Routes, RouterModule } from '@angular/router';



@Component({
    templateUrl: 'app/Components/popdf.component.html'
})


export class popdfComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    pos: IPO[];
    po: IPO;
    msg: string;
    indLoading: boolean = false;
    poFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    poNumber: string;
    Buyer: string;
    Supplier: string;
    BuyerUserID: string;
    BuyerUserEmail: string;
    purchaseItemNameList: string;
   PurchaseItemquantityList: string;
   PurchaseItempriceList: string;
   currentUser: IUser;//BDS
  
    Totalamount: Number;

   // poID: Number;
    constructor(private fb: FormBuilder, private _poService: POService) { }

    ngOnInit(): void {
        var index = document.URL.indexOf("=");
        this.poNumber = document.URL.slice(index + 1);
       // this.poID = document.URL.slice(index + 1);
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
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));//BDS
        console.log(this.currentUser); 
        this.LoadPO();
    }

    LoadPO(): void {
       
        this._poService.get(Global.BASE_PO_ENDPOINT)
            .subscribe(pos => {

                this.pos = pos;
                for (var i = 0; i < this.pos.length; i++) {
                    if (this.pos[i]["PONumber"] == this.poNumber) {
                        this.poNumber = this.pos[i].PONumber;
                        this.Buyer = this.pos[i].Buyer;
                        this.Supplier = this.pos[i].Supplier;
                        this.BuyerUserID = this.pos[i].BuyerUserID;
                        this.BuyerUserEmail = this.pos[i].BuyerUserEmail;
                        
                        var tempcart = this.pos[i].PurchaseItemNameList;
                        var res = tempcart.split(",");
                        this.purchaseItemNameList = res.join("\n");

                        var tempcart1 = this.pos[i].PurchaseItemquantityList;
                        var res1 = tempcart1.split(",");
                        this.PurchaseItemquantityList = res1.join("\n");

                   
                        var tempcart2 = this.pos[i].PurchaseItempriceList;
                        var res2 = tempcart2.split(",");
                        this.PurchaseItempriceList = res2.join("\n");



                        this.Totalamount = this.pos[i].Totalamount;
                        
                    }
                }
                this.indLoading = false;
            },
            error => this.msg = <any>error);
    }

    
}