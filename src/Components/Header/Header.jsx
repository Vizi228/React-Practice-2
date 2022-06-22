import { Link } from 'react-router-dom';
import header from './Header.module.scss'
import { observer } from "mobx-react-lite";
import { useContext } from 'react';
import { AppContext } from '../../Context';

const Header = (props) =>{
  
  const { totalPrice } = useContext(AppContext);
  
  return (
    <div className={header.Header}>
          <Link to="/">
            <div className={header.logo}>
              <div className={header.image}>
                <img src="./image/logo.jpg" alt="Logo" />
              </div>
              <div className={header.text}>
                <h2>REACT SNEAKERS</h2>
                <p>Магазин лучших кроссовок</p>
              </div>
            </div>
            </Link> 
            <div className={header.navigation}>
                <div onClick={props.onClickCart} className={header.cart}>
                  <img  src="./image/icons/cart.svg" alt="Cart" />
                  <span>{ totalPrice } руб.</span>
               </div>
               <Link to="/Favorites">
                <div className={header.favorite}>
                  <img src="./image/icons/favorite.svg" alt="Favorite" />
                </div>
               </Link>
               <Link to="/Profile">
                  <div className={header.profile}>
                    <img src="./image/icons/profile.svg" alt="Profile" />
                  </div>
               </Link>       
            </div>
          </div>
  )
}
export default observer(Header);