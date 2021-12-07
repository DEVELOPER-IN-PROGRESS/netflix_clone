import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../components/loading/Loading'
import { magic } from '../lib/magic-client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading , setIsLoading] = useState(true);
  useEffect( () => {
    async function runLogin(){
    const isLoggedIn = await magic.user.isLoggedIn()
    if(isLoggedIn){
      console.log({isLoggedIn});
      router.push('/');
    }else {
      router.push('/login');
    }
}
    runLogin();
 },[router]) ;

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

  return isLoading ? <Loading/> : <Component {...pageProps} />
}

export default MyApp
