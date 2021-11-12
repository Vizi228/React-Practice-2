import { Link } from 'react-router-dom';
import profile from './Profile.module.scss'
import ProfileCard from './ProfileCard/ProfileCard';


const Profile = (props) => {
  
  return (
    <div className={profile.Main}>
         <div className={profile.title}>
          <div className={profile.image}><Link to="/"><img src="../../image/icons/return.svg" alt="Return" /></Link></div>        
          <h2>Мои покупки</h2>
        </div>
        <div className={profile.cards}>
          {props.state.length > 0 ? 
            props.state.map((obj) => <ProfileCard image ={ obj.image } title = {obj.title} price = {obj.price} />) 
            : 
            <div className={profile.emptyProfile}>
              У вас нету заказов!</div>}
            
        </div>
    </div>
  )
}
export default Profile;