import Head from "next/head";
import Cardwrap from "../../components/cardwrap/Cardwrap";
import NavBar from "../../components/nav/navbar";

import styles from "../../styles/myList.module.css";

const MyList = ({ myListVideos }) => {
    return (
      <div>
        <Head>
          <title>My list</title>
        </Head>
        <main className={styles.main}>
          <NavBar />
          <div className={styles.sectionWrapper}>
            <Cardwrap
              title="My List"
              videos={myListVideos}
              size="small"
            />
          </div>
        </main>
      </div>
    );
  };

  export default MyList;