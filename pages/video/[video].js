import { useRouter } from "next/router";
import clsx from "clsx";
import Modal from "react-modal";
import styles from '../../styles/Video.module.css'

Modal.setAppElement('#__next');


export async function getStaticPaths(){
  const listOfVideos = ['vXzuFprlyrw' ,'rt-2cxAiPJk' ,  '5VYb3B1ETlk' , 'ChOhcHD8fBA' , 'x9D0uUKJ5KI' ] ;

  const paths = listOfVideos.map((video) => ({
    params: { video },
  }));

  console.log({paths})

  return { paths, fallback: "blocking" }; 
}

export async function getStaticProps() {

  const video =  {
    title: 'White Wolf',
    publishTime:'december-16-1991',
    description: 'Just some few random description .and how random can it get? Just some few random description .and how random can it get?Just some few random description .and how random can it get?Just some few random description .',
    channelTitle:'Sokovian Diaries',
    viewCount: 10000 ,
  } ;

  return { 
    props:{ 
      video , 
    } ,
    revalidate : 10  , // as in 10 seconds 
  } ; 

}

const Video = ({video}) => {
    const router = useRouter();

     const { title , publishTime , description , channelTitle , viewCount } = video ; 

    return ( 
          <div className={styles.container}>
            Video Page {router.query.video}
            <Modal
              isOpen={true}
              contentLabel="Watch the video"
              onRequestClose={() => { console.log("back"); router.back()}}
              className={styles.modal}
              overlayClassName={styles.overlay}
             > 
             <div>Modal body</div>
             <iframe
                id="ytplayer"
                className={styles.videoPlayer}
                type="text/html"
                width="100%"
                height="360"
                src={`https://www.youtube.com/embed/${router.query.video}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                frameborder="0"
              ></iframe>
              <div className={styles.modalBody}>
                <div className={styles.modalBodyContent}>
                  <div className={styles.col1}>
                    <p className={styles.publishTime}>{publishTime}</p>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.description}>{description}</p>
                  </div>
                  <div className={styles.col2}>
                    <p className={clsx(styles.subText, styles.subTextWrapper)}>
                      <span className={styles.textColor}>Cast: </span>
                      <span className={styles.channelTitle}>{channelTitle}</span>
                    </p>
                    <p className={clsx(styles.subText, styles.subTextWrapper)}>
                      <span className={styles.textColor}>View Count: </span>
                      <span className={styles.channelTitle}>{viewCount}</span>
                    </p>
                  </div>
                </div>
              </div>
              </Modal>
             
            </div>
        );
};



export default Video ; 