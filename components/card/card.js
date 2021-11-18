import Image from 'next/image'
import styles from './card.module.css'

const Card = (props) => {

const {size , imgUrl} = props ; 

const classMap = {
    large: styles.lgItem ,
    medium: styles.mdItem ,
    small: styles.smItem ,
}

    return (
       <div className={styles.container}>
           <div className={classMap[size]}>Card
            <Image src={imgUrl} className={styles.cardImg} alt="image" layout='fill' />
            </div>
       </div> 
        
    );
}

export default Card ;