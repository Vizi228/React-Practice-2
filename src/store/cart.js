import { makeAutoObservable } from "mobx"

export class Cart {

    carts = []

    constructor() {
        makeAutoObservable(this)
    }

    addToCart(obj) {
        const findItem = this.carts.find((el) => el.UID === obj.UID)
        if (findItem) {
            this.carts = this.carts.filter(item => item.id !== findItem.id)
        } else {
            this.carts.push(obj)
        }
    };
    removeToCart(obj) {
        this.carts = this.carts.filter(item => item.id !== obj.id)
    };
    cleanCart() {
        this.carts = [];
    }
}

