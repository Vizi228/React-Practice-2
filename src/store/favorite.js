import { makeAutoObservable } from "mobx"

export class Favorite {

    items = []

    constructor() {
        makeAutoObservable(this)
    }
    onClickFavorite(obj) {
        const findFavorite = this.items.find((el) => el.UID === obj.UID);
        if (findFavorite) {
            this.items = this.items.filter(item => item.UID !== findFavorite.UID)
        } else {
            this.items.push(obj);
        }
    };
}

