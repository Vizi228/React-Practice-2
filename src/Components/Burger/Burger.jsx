import burger from "./Burger.module.scss";
import BurgerCard from "./BurgerCard/BurgerCard";
import { useCallback, useContext } from "react";
import { AppContext } from "../../Context";
import { observer } from "mobx-react-lite";


const Burger = ({ onClickExit, infoBurger}) => {
  
  const { cart, profile, totalPrice } = useContext(AppContext)

  const removeInCart = useCallback((obj) => {
    cart.removeToCart(obj)
  }, [cart])

  const purchaseItem = () => {
    profile.purchaseItem(cart.carts);
    cart.cleanCart();
  }

  return (
    <div className={`${burger.Burger} ${infoBurger ? undefined : burger.visibility}`}>
      <div className={`${burger.menu} ${infoBurger ? undefined : burger.scroll}`}>
        <div className={burger.title}>
          <h2>Корзина</h2>
          <img onClick={onClickExit} src="../../image/icons/add.svg" alt="" />
        </div>
        {cart.carts.length > 0 ? (
          <>
            <div className={burger.cards}>
              {cart.carts.map((obj) => (
                <BurgerCard
                  key={obj.id}
                  title={obj.title}
                  price={obj.price}
                  image={obj.image}
                  obj={obj}
                  removeItem={removeInCart}
                />
              ))}
            </div>
            <div className={burger.price}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <h3>{totalPrice} руб.</h3>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <h3>{totalPrice / 20} руб.</h3>
                </li>
              </ul>
              <button
                className="greenButton"
                onClick={purchaseItem}
              >
                <span>Оформить заказ</span>
                <img src="./image/icons/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={burger.blockState}>
              <img src="./image/emptyCart.jpg" alt="dsad" />
              <h2>Корзина пустая</h2>
              <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
              <button onClick={onClickExit} className="greenButton">
                <span>Вернуться назад</span>
                <img src="./image/icons/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default observer(Burger);
