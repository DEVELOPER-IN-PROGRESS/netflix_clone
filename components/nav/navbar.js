import { useRouter } from "next/router";
import {useEffect, useState} from 'react'

import Link from "next/link";
import Image from "next/image";

import styles from './navbar.module.css'
import { magic } from "../../lib/magic-client";

const NavBar = () => {
    const router = useRouter(); 
    const [showDropdown , setShowDropdown] = useState(false);
    const [userName ,setUserName] = useState('')
      
   useEffect( async() => {
    try{
      const {ema } = await magic.user.getMetadata(); 
      const didToken = await magic.user.getIdToken(); 
      console.log({didToken});
      if(email){
        setUserName(email);
      }
      
    }catch(error){
      console.error({error})
    }  
     return () => {
     }
   }, [])

    


    const handleOnClickHome = (e) => {
        console.log('Home clicked') ;
        e.preventDefault();
        router.push("/"); 
    }

    const handleOnClickMyList = (e) => {
        console.log('My list clicked') ;
        e.preventDefault();
        router.push("/browse/my-list"); 
    }

    const handleShowDropdown = (e) => {
        console.log('Dropdown list clicked') ;
        e.preventDefault();
        setShowDropdown(!showDropdown); 
       
    }

    const handleSignout = async(e) => {
        console.log('sign out clicked') ;
        e.preventDefault();
        try{
            await magic.user.logout();
            console.log( await magic.user.isLoggedIn() );
            router.push('/login');
        } catch(error){
          console.error("error logging out " , error);
          router.push('/login');
        }
        
    }

    return (
        <div className={styles.container}>
          <div className={styles.wrapper}>
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
    
            <ul className={styles.navItems}>
              <li className={styles.navItem} onClick={handleOnClickHome}>
                Home
              </li>
              <li className={styles.navItem2} onClick={handleOnClickMyList}>
                My List
              </li>
            </ul>
            <nav className={styles.navContainer}>
              <div>
                <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                  <p className={styles.username}>{userName}</p>
                  
                  <Image
                    src={"/static/expand_more.svg"}
                    alt="Expand dropdown"
                    width="24px"
                    height="24px"
                  />
                </button>
    
                { showDropdown && 
                  <div className={styles.navDropdown}>
                    <div>
                      
                      <a className={styles.linkName} onClick={handleSignout}>
                        Sign out
                      </a>
                      
                      <div className={styles.lineWrapper}></div>
                    </div>
                  </div>
                 }
              </div>
            </nav>
          </div>
        </div>
      );
}

export default NavBar ; 