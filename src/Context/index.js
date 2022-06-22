import { Cart } from "../store/cart";
import { Favorite } from "../store/favorite";
import { createContext } from "react";
import { Profile } from "../store/profile";

export const cart = new Cart()
export const favorite = new Favorite()
export const profile = new Profile()

export const AppContext = createContext({ cart, favorite, profile });
