import shop from "./Shop.module.scss";
import ShopCard from "./ShopCard/ShopCard";
import { observer } from "mobx-react-lite";

const Shop = ({
  state,
  searchText,
  getSearchText,
  cleanSearchText,
  onClickFavorite,
  isLoading,
}) => {
  let onChangeSearchInput = (event) => {
    getSearchText(event.target.value);
  };
  
  const renderItems = () => {
    return (
      isLoading
        ? [...Array(12)]
        : state.filter((item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase())
          )
    ).map((obj) => (
      <ShopCard
        key={obj && obj.id}
        onClickFavorite={(par) => onClickFavorite(par)}
        loading={isLoading}
        {...obj}
      />
    ));
  };
  return (
    <div className={shop.Shop}>
      <div className={shop.head}>
        <h2>
          {searchText === "" ? "Все кроссовки" : `Поиск по: ${searchText}`}
        </h2>
        <div className={shop.search}>
          <img src="./image/icons/search.svg" alt="search" />
          <input
            placeholder="Поиск..."
            onChange={onChangeSearchInput}
            value={searchText}
          ></input>
          {searchText === "" ? undefined : (
            <img
              className={shop.remove}
              onClick={cleanSearchText}
              src="./image/icons/remove.svg"
              alt="remove"
            />
          )}
        </div>
      </div>
      <div className={shop.cards}>{renderItems()}</div>
    </div>
  );
};
export default observer(Shop);
