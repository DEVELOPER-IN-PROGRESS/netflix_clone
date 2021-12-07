import { useRouter } from "next/router";
import NavBar from "../../components/nav/navbar";
import clsx from "clsx";
import Modal from "react-modal";
import styles from '../../styles/Video.module.css'

import { getYoutubeVideoById } from "../../lib/video";

Modal.setAppElement('#__next');


export async function getStaticPaths(){
  const listOfVideos = ['vXzuFprlyrw' ,'rt-2cxAiPJk' ,  '5VYb3B1ETlk' , 'ChOhcHD8fBA' , 'x9D0uUKJ5KI' ] ;

  const paths = listOfVideos.map((video) => ({
    params: { video },
  }));

  console.log({paths})

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  console.log("context" , context )


  const videoID = context.params.video;
  const videoArray = await getYoutubeVideoById(videoID);

  return {
    props:{
      video: videoArray.length > 0 ? videoArray[0] : {}  ,
    } ,
    revalidate : 10  , // as in 10 seconds
  } ;

}

const Video = ({video}) => {
    const router = useRouter();

     const { title , publishTime , description , channelTitle , statistics: { viewCount } = { viewCount : 0 } } = video ;

    return (
          <div className={styles.container}>
            <NavBar />
            <Modal
              isOpen={true}
              contentLabel="Watch the video"
              onRequestClose={() => { console.log("back"); router.back()}}
              className={styles.modal}
              overlayClassName={styles.overlay}
             >

             <iframe
                id="ytplayer"
                className={styles.videoPlayer}
                type="text/html"
                width="100%"
                height="360"
                src={`https://www.youtube.com/embed/${router.query.video}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                frameBorder="0"
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