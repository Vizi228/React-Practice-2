import burger from "./BurgerCard.module.scss";

const BurgerCard = ({title, price, image, obj, removeItem}) => {
  return (
    <div className={burger.card}>
      <div className={burger.image}>
        <img src={image} alt="Sneakers" />
      </div>
      <div className={burger.info}>
        <p>{title}</p>
        <h3>{price} руб.</h3>
      </div>
      <div className={burger.icon}>
        <img onClick={() => removeItem(obj)} src="./image/icons/remove.svg" alt="Sneakers" />
      </div>
    </div>
  );
};
export default BurgerCard;
