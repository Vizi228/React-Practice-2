import { AppContext } from '../../App';
import { useContext } from 'react';


export const useBurgerCard = () => {
    const { burgerCard, setBurgerCard } = useContext(AppContext);
    const totalPrice = burgerCard.reduce((sum, obj) => obj.price + sum, 0);
    return { burgerCard, setBurgerCard, totalPrice }
}