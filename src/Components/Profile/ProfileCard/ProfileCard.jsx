import profCard from './ProfileCard.module.scss'


const ProfileCard = ({ title, image, price }) =>{
  
  return (
    <div className={profCard.card}>
          <div className={profCard.image}>
            <img src={ image } alt="Sneakers" />
          </div>
          <p>{ title }</p>
          <div className={profCard.info}>
            <div>
              <span>Цена:{ price }</span>
              <h3> руб.</h3>
            </div>
          </div>
    </div>
  )
}
export default ProfileCard;