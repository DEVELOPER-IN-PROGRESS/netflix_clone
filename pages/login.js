import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Login.module.css";

const Login = (props) => {

    const handleOnChangeEmail = () => {

    }

    const handleLoginWithEmail = () => {

    }

    const { isLoading , userMsg} = props ; 

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