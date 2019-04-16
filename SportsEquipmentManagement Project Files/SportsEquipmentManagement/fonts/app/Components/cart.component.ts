import { Component, OnInit, ViewChild } from "@angular/core";
//import { CartService } from '../Service/cart.service';
import { Global } from '../Shared/global';
import { DBOperation } from '../Shared/enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
////import { IUser } from '../Model/user';
import { Cart } from '../Model/cart';
import { POService } from '../Service/po.service';
import { Routes, RouterModule } from '@angular/router';



@Component({
    templateUrl: 'app/Components/cart.component.html'
})


export class CartComponent implements OnInit {
    products: Cart[];
    subtotal: number;
    cartTax: number;
    grandTotal: number;
    stringVar: string;
    msg: string;
    private router: Routes;
    constructor(private fb: FormBuilder, private _poService: POService) { }
    ngOnInit(): void {
        this.setLocalStorage();
        this.products = JSON.parse(localStorage.getItem("currentShoppingCart"));
        this.subtotal = 0;
        this.cartTax = 0;
        this.grandTotal = 0;
        this.updateGrandTotal();
    }
    setLocalStorage() {
        var cartData = [{ "id": 1, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }, { "id": 2, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }, { "id": 3, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }, { "id": 4, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }];
        localStorage.setItem("currentShoppingCart", JSON.stringify(cartData));
    }
    editCart(id: number) {
        (<HTMLInputElement>document.getElementById("productQuantity" + id)).disabled = false;
        (<HTMLInputElement>document.getElementById("updateBtn" + id)).style.display = "block";
        (<HTMLInputElement>document.getElementById("editBtn" + id)).style.display = "none";

    }
    updateCart(id: number) {
        var newQuantity = parseInt((<HTMLInputElement>document.getElementById("productQuantity" + id)).value);
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {  //look for match with name
                this.products[i].productQuantity = newQuantity;   //add two
                this.products[i].productSubTotal = this.products[i].productQuantity * this.products[i].productPrice;
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
            this.subtotal += this.products[i].productQuantity * this.products[i].productPrice;
        }
        this.cartTax = 0.04 * this.subtotal;
        this.grandTotal = this.cartTax + this.subtotal;
    }
    deleteCart(id: number) {
        var tmpCartString = "";
        tmpCartString = JSON.stringify(this.products);
        var tmpCart = [];
        tmpCart = JSON.parse(tmpCartString);
        for (var i = 0; i < tmpCart.length; i++) {
            console.log(tmpCart[i].id);
            console.log("id >> " + id);
            if (tmpCart[i].id === id) {  //look for match with name
                //tmpCart[i].splice(1);
                //tmpCart[i].remove();
                delete tmpCart[i];
                console.log("Here");
                break;  //exit loop since you found the person
            }
        }
        console.log(tmpCart);
        localStorage.setItem("currentShoppingCart", JSON.stringify(tmpCart));  //put the object back
        this.products = JSON.parse(localStorage.getItem("currentShoppingCart"));
    }
    checkout() {
        var ponumber = this.generatePONumber();
        var purchaseItemNameList = "";
        var purchaseItemQuantityList = "";
        var purchaseItemPriceList = "";

        for (var i = 0; i < this.products.length; i++) {
            if (i != this.products.length - 1) {
                purchaseItemNameList += this.products[i].ItemName + ",";
                purchaseItemQuantityList+=this.products[i].productQuantity + ",";
                purchaseItemPriceList+=this.products[i].productPrice + ",";
            } else {
                purchaseItemNameList+=this.products[i].ItemName;
                purchaseItemQuantityList+=this.products[i].productQuantity+"";
                purchaseItemPriceList+=this.products[i].productPrice+"";
            }
        }
        var dataStore = { PONumber: ponumber, Buyer: "SportsAcademic", Supplier: "Saralee", BuyerUserID: "SA123", BuyerUserEmail: "SportsAcademic123@gmail.com", PurchaseItemNameList: purchaseItemNameList, PurchaseItemquantityList: purchaseItemQuantityList, PurchaseItempriceList: purchaseItemPriceList, Totalamount: this.grandTotal };

        this._poService.post(Global.BASE_PO_ENDPOINT, dataStore).subscribe(
            data => {
                if (data == 1) //Success
                {
                    this.msg = "Data successfully added.";
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
    }

    generatePONumber() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return "PO"+ s4() + s4();
    }
}