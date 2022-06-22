import { makeAutoObservable } from "mobx"

export class Profile {

    items = []

    constructor() {
        makeAutoObservable(this)
    }
    purchaseItem(objects) {
        this.items = objects
    }
}

