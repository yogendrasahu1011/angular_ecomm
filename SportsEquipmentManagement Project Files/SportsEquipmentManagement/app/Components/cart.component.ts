import { Component, OnInit, ViewChild } from "@angular/core";
//import { CartService } from '../Service/cart.service';
import { Global } from '../Shared/global';
import { DBOperation } from '../Shared/enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../Model/product';
import { POService } from '../Service/po.service';
import { Routes, RouterModule } from '@angular/router';
import { IUser } from '../Model/user';//BDS

@Component({
    templateUrl: 'app/Components/cart.component.html'
})


export class CartComponent implements OnInit {
    products: IProduct[];
    subtotal: number;
    cartTax: number;
    grandTotal: number;
    stringVar: string;
    msg: string;
    private router: Routes;
    currentUser: IUser;

    constructor(private fb: FormBuilder, private _poService: POService) { }

    ngOnInit(): void {
        //this.setLocalStorage();
       // this.getLocalStorage();
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));//BDS
        //this.products = JSON.parse(localStorage.getItem("currentShoppingCart"));
        this.products = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id));
        console.log(this.products);
        this.subtotal = 0;
        this.cartTax = 0;
        this.grandTotal = 0;
        this.updateGrandTotal();
    }

    setLocalStorage() {
        var cartData = [{ "id": 1, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }, { "id": 2, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }, { "id": 3, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }, { "id": 4, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }];
        localStorage.setItem("currentShoppingCart", JSON.stringify(cartData));
    }

    //BDS
    getLocalStorage() {
        //currentSelectedProduct1
        //{"Id":10,"MaterialID":"aefdas","Description":"asfcsa","Price":22,"Inventory":213,"ImagePath":"../../images/images.png","SupplierCompany":"MRF"}
        for (var i= 1; i <= 5 ; i++){
            this.products[i] = JSON.parse(localStorage.getItem("currentSelectedProduct"+i));;             
                }
    }
        //BDS

    editCart(id: number) {
        (<HTMLInputElement>document.getElementById("productQuantity" + id)).disabled = false;
        (<HTMLInputElement>document.getElementById("updateBtn" + id)).style.display = "block";
        (<HTMLInputElement>document.getElementById("editBtn" + id)).style.display = "none";

    }
    updateCart(id: number) {
        var newQuantity = parseInt((<HTMLInputElement>document.getElementById("productQuantity" + id)).value);
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].Id === id) {  //look for match with name
                this.products[i].quantity = newQuantity;   //add two
                this.products[i].productSubTotal = this.products[i].quantity * this.products[i].Price;
                break;  //exit loop since you found the person
            }
        }
        localStorage.setItem("currentShoppingCart", JSON.stringify(this.products));  //put the object back
        (<HTMLInputElement>document.getElementById("productQuantity" + id)).disabled = true;
        (<HTMLInputElement>document.getElementById("updateBtn" + id)).style.display = "none";
        (<HTMLInputElement>document.getElementById("editBtn" + id)).style.display = "block";
        this.updateGrandTotal();
    }
    updateGrandTotal() {
        this.subtotal = 0;
        this.grandTotal = 0;
        for (var i = 0; i < this.products.length; i++) {
            this.subtotal += this.products[i].quantity * this.products[i].Price;
        }
        this.cartTax = 0.04 * this.subtotal;
        this.grandTotal = this.cartTax + this.subtotal;
    }
    deleteCart(id: number) {
        if (confirm('Are you sure you want to delete this item from cart?')) {
            var tmpCartString = "";
            tmpCartString = JSON.stringify(this.products);
            var tmpCart = [];
            tmpCart = JSON.parse(tmpCartString);
            for (var i = 0; i < tmpCart.length; i++) {
                console.log(tmpCart[i].Id);
                console.log("id >> " + id);
                if (tmpCart[i].Id === id) {  //look for match with name
                    delete tmpCart[i];
                    console.log("Here");
                    break;  //exit loop since you found the person
                }
            }

            tmpCart = tmpCart.filter(function (x: any) { return x !== null });
            console.log(tmpCart);
            localStorage.setItem("currentShoppingCart" + this.currentUser.Id, JSON.stringify(tmpCart));  //put the object back
            this.products = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id));
            this.updateGrandTotal();
        } else {
            //do nothing
        }
    }
    checkout() {
        var ponumber = this.generatePONumber();
        var purchaseItemNameList = "";
        var purchaseItemQuantityList = "";
        var purchaseItemPriceList = "";

        for (var i = 0; i < this.products.length; i++) {
            if (i != this.products.length - 1) {
                purchaseItemNameList += this.products[i].MaterialID + ",";
                purchaseItemQuantityList += this.products[i].quantity + ",";
                purchaseItemPriceList += this.products[i].Price + ",";
            } else {
                purchaseItemNameList += this.products[i].MaterialID;
                purchaseItemQuantityList += this.products[i].quantity+"";
                purchaseItemPriceList += this.products[i].Price+"";
            }
        }
        var dataStore = { PONumber: ponumber, Buyer: this.currentUser.FirstName + " " + this.currentUser.LastName, Supplier: this.currentUser.Company, BuyerUserID: this.currentUser.Id, BuyerUserEmail: this.currentUser.Email, PurchaseItemNameList: purchaseItemNameList, PurchaseItemquantityList: purchaseItemQuantityList, PurchaseItempriceList: purchaseItemPriceList, Totalamount: this.grandTotal };

        this._poService.post(Global.BASE_PO_ENDPOINT, dataStore).subscribe(
            data => {
                if (data == 1) //Success
                {
                    this.msg = "Data successfully added.";
                    localStorage.removeItem("currentShoppingCart" + this.currentUser.Id);
                    window.location.href = "/po?po=" + ponumber;
                    //this.LoadPO();
                }
                else {
                    this.msg = "There is some issue in saving records, please contact to system administrator!"
                }

                //this.modal.dismiss();
            },
            error => {
                this.msg = error;
            }
        );
        //localStorage.removeItem("myCart");
    }

    generatePONumber() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return "INVTX-"+ s4() + s4();
    }
}