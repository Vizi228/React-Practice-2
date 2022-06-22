import { Link } from 'react-router-dom';
import profile from './Profile.module.scss'
import ProfileCard from './ProfileCard/ProfileCard';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppContext } from '../../Context';

const Profile = () => {
  
  const { profile } = useContext(AppContext)

  return (
    <div className={profile.Main}>
         <div className={profile.title}>
          <div className={profile.image}><Link to="/"><img src="../../image/icons/return.svg" alt="Return" /></Link></div>        
          <h2>Мои покупки</h2>
        </div>
        <div className={profile.cards}>
          
          {profile.items.length > 0 ? 
            profile.items.map((obj) => <ProfileCard key={obj.id} image ={ obj.image } title = {obj.title} price = {obj.price} />) 
            : 
            <div className={profile.emptyProfile}>
              У вас нету заказов!</div>}
            
        </div>
    </div>
  )
}
export default observer(Profile);