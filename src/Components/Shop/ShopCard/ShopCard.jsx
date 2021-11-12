import { useContext, useState } from "react";
import card from "./ShopCard.module.scss";
import ContentLoader from "react-content-loader"
import { AppContext } from "../../../App";

const ShopCard = ({image, title, price, id, UID, onClickPlus, onClickFavorite, loading=false }) => {
   
  
  const [favorite, setFavorite] = useState(true)

  let onPlus = () => {
    onClickPlus({image, title, price, id, UID, isItemAdded});
    isItemAdded(UID);
  }
  let onFavorite = () => {
    onClickFavorite({image, title, price, id, UID});
    setFavorite(!favorite);
  }
  const { isItemAdded } = useContext(AppContext);
  const { isItemFavorite } = useContext(AppContext);
  return (     
        <div className={card.card}>
          {
            loading ? 
            <ContentLoader 
             speed={2}
             width={133}
             height={210}
             viewBox="0 0 133 210"
             backgroundColor="#f3f3f3"
             foregroundColor="#ecebeb"
             >
            <rect x="0" y="119" rx="5" ry="5" width="133" height="15" /> 
            <rect x="0" y="140" rx="3" ry="3" width="90" height="15" /> 
            <rect x="0" y="172" rx="3" ry="3" width="77" height="25" /> 
            <rect x="0" y="0" rx="3" ry="3" width="133" height="112" /> 
            <rect x="101" y="165" rx="3" ry="3" width="32" height="32" />
            </ContentLoader> : 
            <>
              <img className={card.icon} onClick={onFavorite} src={isItemFavorite(UID) ? "./image/icons/like-active.svg" : "./image/icons/like.png" } alt="like" />
              <div className={card.image}>
                  <img src={ image } alt="Sneakers" />
              </div>
              <p>{ title }</p>
              <div className={card.info}>
              <div>
                <span>Цена:</span>
                <h3>{ price } руб.</h3>
              </div>
              <img onClick={onPlus} src={isItemAdded(UID) ? "./image/icons/add-active.svg" : "./image/icons/add.svg"} alt="Add" />
              </div>
            </>
          }
          
        </div>
      
  );
};
export default ShopCard;