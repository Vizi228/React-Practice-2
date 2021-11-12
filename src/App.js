import React, { createContext, useEffect, useState } from "react";
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

export const AppContext = createContext({});

function App() {
  const [state, setState] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [infoBurger, setInfoBurger] = useState(false);
  const [burgerCard, setBurgerCard] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileState, setProfileState] = useState([]);
  useEffect(() => {
    async function fetchData() {
      
      try {
      setIsLoading(true);
      const itemData = await axios.get("https://61252c323c91fb0017e729af.mockapi.io/Items");
      const cartItemData = await axios.get("https://61252c323c91fb0017e729af.mockapi.io/CartItems");
      const favoriteData = await axios.get("https://61252c323c91fb0017e729af.mockapi.io/Favorite");
      const profileData = await axios.get("https://61252c323c91fb0017e729af.mockapi.io/Profile");
      setIsLoading(false);
       
      setBurgerCard(cartItemData.data);
      setFavorite(favoriteData.data);
      setProfileState(profileData.data.map((obj) => obj.burgerCard).flat())
      setState(itemData.data);
      
      
      } catch (error) {
        alert('error!')
      }
      
    }
    
    fetchData();
  }, []);

  let onClickFavorite = async (obj) => {
    const findFavorite = favorite.find((el) => el.UID === obj.UID);
    try {
      if (findFavorite) {
        setFavorite((prev) => prev.filter((item) => item.UID !== obj.id));
        axios.delete(
          `https://61252c323c91fb0017e729af.mockapi.io/Favorite/${findFavorite.id}`
        );
        
      } else {
        let { data } = await axios.post(
          "https://61252c323c91fb0017e729af.mockapi.io/Favorite",
          obj
        );
        setFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Ошибка при добавлении товара в закладки");
    }
  };

  let getSearchText = (text) => {
    setSearchText(text);
  };
  let cleanSearchText = () => {
    setSearchText("");
  };
  let getBurger = () => {
    setInfoBurger(!infoBurger);
  };
  let addToCart = async (obj) => {
    const findItem = burgerCard.find((el) => el.UID === obj.UID)
    try {
      if (findItem) {
        setBurgerCard((prev) => prev.filter((item) => item.UID !== obj.id));
        axios.delete(
          `https://61252c323c91fb0017e729af.mockapi.io/CartItems/${findItem.id}`
        );
        
      } else {
        let { data } = await axios.post(
          "https://61252c323c91fb0017e729af.mockapi.io/CartItems",
          obj
        );
        setBurgerCard((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в корзнину");
    }
  };
  let removeInCart = async (obj) => {
    try {
      axios.delete(
        `https://61252c323c91fb0017e729af.mockapi.io/CartItems/${obj.id}`
      );
      setBurgerCard((prev) => prev.filter((item) => item.id !== obj.id));
    } catch (error) {
      alert('Ошибка при удалении из корзины')
    }
    
  };
  let removeInFavorite = async (obj) => {
    try {
      if (favorite.find((el) => el.UID === obj.UID)) {
        axios.delete(
          `https://61252c323c91fb0017e729af.mockapi.io/Favorite/${obj.id}`
        );
        setFavorite((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        let { data } = await axios.post(
          "https://61252c323c91fb0017e729af.mockapi.io/Favorite",
          obj
        );
        setFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Ошибка при удалении из фаворитов')
    }
  };
  let isItemAdded = (UID) => {
   return burgerCard.some((item) => item.UID === UID)
  }
  let isItemFavorite = (UID) => {
    return favorite.some((item) => item.UID === UID)
   }
  let purchaseItem = async () => {
    await axios.post(`https://61252c323c91fb0017e729af.mockapi.io/Profile/`, {burgerCard});
    setProfileState(burgerCard);
    burgerCard.forEach((item) => {
      axios.delete(`https://61252c323c91fb0017e729af.mockapi.io/CartItems/` + item.id)
    });
   
    setBurgerCard([]);
   
    
  }

  return (
    <AppContext.Provider value={ {state, burgerCard, favorite, isItemAdded, isItemFavorite} }>
        <div className="container">
       
          <Burger
            onClickExit={() => getBurger()}
            state={burgerCard}
            setState={setBurgerCard}
            removeInCart={removeInCart}
            infoBurger={ infoBurger }
            purchaseItem = {purchaseItem}
          />

        <Header onClickCart={() => getBurger()} />
            <Routes>
                <Route path="/" element={<Shop
                  onClickAdd={(obj) => addToCart(obj)}
                  isLoading={isLoading}
                  onClickFavorite={(obj) => onClickFavorite(obj)}
                  burgerCard={burgerCard}
                  state={state}
                  searchText={searchText}
                  cleanSearchText={cleanSearchText}
                  getSearchText={(info) => getSearchText(info)}
                />}/> 
                <Route path="/Favorites" element={<Favorites removeInFavorite={removeInFavorite}  />}/> 
                <Route path="/Profile" element={<Profile state={profileState}/>}/>      
            </Routes>
        
      </div>
   
    </AppContext.Provider>
  );
}

export default App;
