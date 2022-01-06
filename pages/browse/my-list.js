import Head from "next/head";
import Cardwrap from "../../components/cardwrap/Cardwrap";
import NavBar from "../../components/nav/navbar";
import useRedirectUser from "../../utils/redirectUser";
import { getMyList } from "../../lib/videos";

import styles from "../../styles/myList.module.css";

export async function getServerSideProps(context) {
  const { userId, token } = await useRedirectUser(context);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}

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