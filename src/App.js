import React, { useContext, useState } from "react";
import axios from "axios";
import "./App.scss";
import Burger from "./Components/Burger/Burger";
import Header from "./Components/Header/Header";
import Shop from "./Components/Shop/Shop";
import {
  Routes,
  Route
} from "react-router-dom";
import Favorites from "./Components/Favorites/Favorites";
import Profile from "./Components/Profile/Profile";
import { data } from "./consts/data";
import { AppContext } from "./Context";
import { observer } from "mobx-react-lite";

function App() {
  const [searchText, setSearchText] = useState("");
  const [infoBurger, setInfoBurger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { cart, favorite, profile } = useContext(AppContext);

  const totalPrice = cart.carts.reduce((prev, item) => item.price + prev, 0)


  let getSearchText = (text) => {
    setSearchText(text);
  };
  let cleanSearchText = () => {
    setSearchText("");
  };
  let getBurger = () => {
    setInfoBurger(!infoBurger);
  };
  let isItemAdded = (UID) => {
    return cart.carts.some((item) => item.UID === UID)
  }
  let isItemFavorite = (UID) => {
    return favorite.items.some((item) => item.UID === UID)
  }

  return (
    <AppContext.Provider value={{ state: data, cart, profile, favorite, isItemAdded, totalPrice, isItemFavorite }}>
      <div className="container">

        <Burger
          onClickExit={() => getBurger()}
          infoBurger={infoBurger}
        />

        <Header onClickCart={() => getBurger()} />
        <Routes>
          <Route path="/" element={<Shop
            isLoading={isLoading}
            state={data}
            searchText={searchText}
            cleanSearchText={cleanSearchText}
            getSearchText={(info) => getSearchText(info)}
          />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>

      </div>

    </AppContext.Provider>
  );
}

export default observer(App);
