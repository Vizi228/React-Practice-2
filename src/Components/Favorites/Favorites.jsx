import { useContext } from "react";
import { Link } from "react-router-dom";
import FavoriteCard from "./FavoriteCard/FavoriteCard";
import favorites from "./Favorites.module.scss";
import { AppContext } from "../../App";


const Favorites = ({ removeInFavorite }) => {
  const {favorite} = useContext(AppContext);
  return (
    <div className={favorites.Main}>
      {favorite.length > 0 ? (
        <div className={favorites.wrapper}>
          <div className={favorites.title}>
            <div className={favorites.image}>
              <Link to="/">
                <img src="../../image/icons/return.svg" alt="Return" />
              </Link>
            </div>
            <h2>Мои закладки</h2>
          </div>
          <div className={favorites.cards}>
            {favorite.map((obj) => (
              <FavoriteCard
                key={obj.id}
                title={obj.title}
                id={obj.id}
                UID={obj.UID}
                state={favorite}
                favorited={true}
                removeInFavorite={removeInFavorite}
                price={obj.price}
                image={obj.image}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={favorites.states}>
          <img
            className={favorites.img}
            src="../../image/SadSmile.jpg"
            alt="Smile"
          />
          <h3>Закладок нет :(</h3>
          <span>Вы ничего не добавляли в закладки</span>
          <Link to="/">
            <button className={favorites.greenButton}>
              <span>Вернуться назад</span>
              <img
                className={favorites.icon}
                src="./image/icons/arrow.svg"
                alt="arrow"
              />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Favorites;
