import { useEffect, useState } from "react";

import  { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Login.module.css";
import { magic } from "../lib/magic-client";
import Link from "next/link";

const Login = () => {

    const router = useRouter();

    const [isLoading , setIsLoading] = useState(false);
    const [email ,setEmail] = useState('');
    const [userMsg , setUserMsg] =  useState('');

    useEffect( () =>{
        const handleComplete = () => {
            setIsLoading(false);
        }

        router.events.on('routeChangeComplete' , handleComplete) ;
        router.events.on('routeChangeError' , handleComplete) ;

        return() =>{
            router.events.off('routeChangeComplete' , handleComplete);
            router.events.off('routeChangeError' , handleComplete) ;
        }
    },[router])


    const handleOnChangeEmail = (e) => {
        setUserMsg('') ;
        const email= e.target.value;
         setEmail(email);
    }

    const handleLoginWithEmail = async (e) => {
        e.preventDefault();

        if(email){
            //if (email === process.env.NEXT_PUBLIC_EMAIL ){

                try {
                    setIsLoading(true) ;
                  const didToken =    await magic.auth.loginWithMagicLink({ email , showUI:true });
                   if(didToken){
                       console.log({didToken});
                       const response = await fetch('/api/login' ,{
                         method: "POST",
                         headers :{
                           'Authorization': `Bearer ${didToken}`,
                           'Content-type': "application/json",
                         },
                       });

                       const loggedInResponse = await response.json();
                          if(loggedInResponse.done){
                             router.push('/');
                          }
                            else {
                              setIsLoading(false);
                              setUserMsg('Something went wrong ') ;
                            }

                   }
                  } catch(error) {
                    // Handle errors if required!
                    console.error(error);
                  }


            // }

        }else {
            setIsLoading(false);
            setUserMsg('Enter a valid Email address') ;
        }


    }



    return (
        <div className={styles.container}>
        <Head>
          <title>Netflix SignIn</title>
        </Head>

        <header className={styles.header}>
          <div className={styles.headerWrapper}>
            <Link href="/" passHref>
            <a className={styles.logoLink} href="/">
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix logo"
                  width="128px"
                  height="34px"
                />
              </div>
            </a>
            </Link>
          </div>
        </header>

        <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>

        </div>
    )
};

export default Login ;