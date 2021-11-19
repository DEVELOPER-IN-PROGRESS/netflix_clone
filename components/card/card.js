import Image from 'next/image'
import { useState } from 'react';

import styles from './card.module.css'
const Card = (props) => {

const {  size='medium' , imgUrl='https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80'
} = props ; 

const classMap = {
    large: styles.lgItem ,
    medium: styles.mdItem ,
    small: styles.smItem ,
}

const [imgSrc , setImgSrc] = useState(imgUrl); 

const handleOnError = () => {
    console.log('Image Error');
    setImgSrc('/static/mobius.jpg')
}

    return (
       <div className={styles.container}>
           <div className={classMap[size]}>Card
            <Image 
               src={imgSrc}
               className={styles.cardImg} 
               alt="image" 
               onError={handleOnError}
               layout='fill' />
            </div>
       </div> 
        
    );
}

export default Card ;