import Head from 'next/head'
import Image from 'next/image'

import Banner from '../components/banner/Banner'
 import NavBar from '../components/nav/navbar'
import Cardwrap from '../components/cardwrap/Cardwrap';
import { getPopularVideos, getVideos } from '../lib/video'

import styles from '../styles/Home.module.css'

export async function getServerSideProps(){

  const ytvideos = await  getVideos('disney trailer');

  const Productivity = await  getVideos('Productivity');

  const Travel = await  getVideos('Travel');

  const Popular = await  getPopularVideos();

  return { props : { ytvideos , Travel ,Productivity , Popular , }}
}

export default function Home({ytvideos , Travel ,Productivity , Popular}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar />

        <Banner
           videoId="4zH5iYM4wJo"
           title="Loki "
           subTitle="The god of mischief returns"
            imgUrl="./static/lok.jpg"/>

        <div className={styles.sectionWrapper}>
            <Cardwrap title="Productivity"  videos={Productivity} size="medium"/>

            <Cardwrap title="Travel"  videos={Travel} size="small"/>

            <Cardwrap title="Popular"  videos={Popular} size="large"/>
        </div>
      </div>

   </div>
  )
}
