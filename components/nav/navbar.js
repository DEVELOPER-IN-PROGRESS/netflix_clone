import Link from "next/link";
import Image from "next/image";

import styles from './navbar.module.css'

const NavBar = (props) => {

    const { showDropdown , username } = props

    const handleOnClickHome = () => {
        console.log('Home clicked') ;
    }

    const handleOnClickMyList = () => {
        console.log('My list clicked') ;
    }

    const handleShowDropdown = () => {
        console.log('Dropdown list clicked') ;
    }

    const handleSignout = () => {
        console.log('sign out clicked') ;
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
                  <p className={styles.username}>{username }</p>
                  
                  <Image
                    src={"/static/expand_more.svg"}
                    alt="Expand dropdown"
                    width="24px"
                    height="24px"
                  />
                </button>
    
                {showDropdown && (
                  <div className={styles.navDropdown}>
                    <div>
                      <a className={styles.linkName} onClick={handleSignout}>
                        Sign out
                      </a>
                      <div className={styles.lineWrapper}></div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      );
}

export default NavBar ; 