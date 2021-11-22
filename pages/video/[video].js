import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from '../../styles/Video.module.css'

Modal.setAppElement('#__next');

const Video = () => {
    const router = useRouter();
    console.log({router});
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
             </Modal>
 
            </div>);
}

export default Video ; 