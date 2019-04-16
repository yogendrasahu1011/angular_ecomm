import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IProduct } from '../Model/product';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/Components/product.component.html'
})


export class ProductComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    products: IProduct[];
    product: IProduct;
    msg: string;
    indLoading: boolean = false;
    productFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    searchTitle: string = "";

    constructor(private fb: FormBuilder, private _productService: ProductService) { }

    ngOnInit(): void {
        this.productFrm = this.fb.group({
            Id: [''],
            MaterialID: ['', Validators.required],
            Description: ['', Validators.required],
            Price: ['', Validators.required],
            Inventory: [''],
            SupplierCompany: [''],
            ImagePath:['']
        });
        this.LoadProducts();
    }

    LoadProducts(): void {
        this.indLoading = true;
        this._productService.get(Global.BASE_PRODUCT_ENDPOINT)
            .subscribe(products => { this.products = products; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    addProduct() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Product";
        this.modalBtnTitle = "Add";
        this.productFrm.reset();
        this.modal.open();
    }

    editProduct(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Product";
        this.modalBtnTitle = "Update";
        this.product = this.products.filter(x => x.Id == id)[0];
        this.productFrm.setValue(this.product);
        this.modal.open();
    }

    deleteProduct(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.product = this.products.filter(x => x.Id == id)[0];
        this.productFrm.setValue(this.product);
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._productService.post(Global.BASE_PRODUCT_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadProducts();
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
                this._productService.put(Global.BASE_PRODUCT_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadProducts();
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
                this._productService.delete(Global.BASE_PRODUCT_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadProducts();
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
        isEnable ? this.productFrm.enable() : this.productFrm.disable();
    }


    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;
    }
}




