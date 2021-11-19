import Image from 'next/image'
import { useState } from 'react';

import cls from 'classnames';
import {motion} from "framer-motion";

import styles from './card.module.css'
const Card = (props) => {

const {  size='medium' , imgUrl='https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80' ,
id ,
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
    const scale = id === 0 ? { scaleY: 1.1} : { scale: 1.1} ; 

    return (
       <div className={styles.container}
         >
           <motion.div 
              whileHover={{ ...scale }} 
              className={cls(styles.imgMotionWrapper , classMap[size])}>
            <Image 
               src={imgSrc}
               className={styles.cardImg} 
               alt="image" 
               onError={handleOnError}
               layout='fill' />
            </motion.div>
       </div> 
        
    );
}

export default Card ;