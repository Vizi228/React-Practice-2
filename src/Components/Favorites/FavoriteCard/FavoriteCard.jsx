import { useState } from 'react'
import favCard from './FavoriteCard.module.scss'


const FavoriteCard = ({image, title, price, id, removeInFavorite, favorited, UID}) =>{

  const [isFavorite, setIsFavorite] = useState(favorited);

  let onRemoveFavorite = () => {
    removeInFavorite({image, UID, title, price, id})
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={favCard.card}>
        <img className={favCard.icon} onClick={onRemoveFavorite} src={isFavorite ? "../../image/icons/like-active.svg" : "../../image/icons/like.png" } alt="like" />
          <div className={favCard.image}>
            <img src={ image } alt="Sneakers" />
          </div>
          <p>{ title }</p>
          <div className={favCard.info}>
            <div>
              <span>Цена:</span>
              <h3>{ price } руб.</h3>
            </div>
          </div>
    </div>
  )
}
export default FavoriteCard;