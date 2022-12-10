import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { useRouter } from "next/router";
import { useEffect } from 'react'

const pageview = (url:any)=>{
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string,{path_url:url,})
}

function MyApp({ Component, pageProps }: AppProps) {
   const router = useRouter();

   useEffect(()=>{

    const handlerRouteChange = (url)=>{
      pageview(url)
    }

    router.events.on("routeChangeComplete", handlerRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handlerRouteChange);
    };

   },[router.events])

  return <> 
  
    <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string}`}
      />

      <Script id="google-analytics-script" strategy="afterInteractive">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string}');
                `}
      </Script>
      <Component {...pageProps} />
      </>
}

export default MyApp
