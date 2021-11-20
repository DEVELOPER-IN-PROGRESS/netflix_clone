import Card from "../card/card";

import styles from './Cardwrap.module.css'

const Cardwrap = (props) => {
    const { title , videos = [] , size } = props ; 
    console.log({videos});
 return(<section className={styles.container}>
     <h2 className={styles.title}>{title}</h2>
     <div className={styles.cardWrapper}>
          { 
           videos.map( (vd, id) => {
            return ( <Card 
            imgUrl={vd.imgUrl}
            size={size}
            key={id}
            id={id}
            />) 
           } ) }
    

     </div>
     </section>)
};

export default Cardwrap ;