import { useEffect, useState } from "react";

import  { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
 
import styles from "../styles/Login.module.css";
import { magic } from "../lib/magic-client";

const Login = (props) => {

    const router = useRouter(); 
    const { isLoading } = props ; 
    const [email ,setEmail] = useState('');
    const [userMsg , setUserMsg] =  useState('');
    
    const handleOnChangeEmail = (e) => {
        setUserMsg('') ;
        const email = e.target.value ; 

         setEmail(email);
        console.log(email);
        
    }

    const handleLoginWithEmail = async (e) => {
        e.preventDefault(); 
        console.log("email" ,   process.env.NEXT_PUBLIC_EMAIL )

        if(email){
            if (email === process.env.NEXT_PUBLIC_EMAIL ){
                
                try {
                  const token =    await magic.auth.loginWithMagicLink({ email});
                  console.log({token})
                  } catch(error) {
                    // Handle errors if required!
                    console.error(error);
                  }

               router.push('/')
            }else {
                setUserMsg('Something went wrong ') ;    
            }
        }else {
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