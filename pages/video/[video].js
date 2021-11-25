import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from '../../styles/Video.module.css'

Modal.setAppElement('#__next');

const Video = () => {
    const router = useRouter();
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
             </Modal>
 
            </div>
        );
};



export default Video ; 