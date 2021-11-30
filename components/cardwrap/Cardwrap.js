import Card from "../card/card";
import Link from 'next/link' ; 

import styles from './Cardwrap.module.css'

const Cardwrap = (props) => {
    const { title , videos = [] , size } = props ; 
    console.log({videos});
 return(<section className={styles.container}>
     <h2 className={styles.title}>{title}</h2>
     <div className={styles.cardWrapper}>
          { 
           videos.map( (vd, id) => {
            return ( 
             <Link href={`/video/${vd.id}`} passHref> 
               <a href={`/video/${vd.id}`}>
                <Card 
                imgUrl={vd.imgUrl}
                size={size}
                key={vd.id}
                id={id}
                />
                </a>   
             </Link>  
            ) 
           } ) }
    

     </div>
     </section>)
};

export default Cardwrap ;