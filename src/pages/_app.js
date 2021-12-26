// import App from 'next/app'
// import '../App.css';
import '../../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                name="description"
                content="Twitter Spaces Search"
                />
                {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
                <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <link href="/dist/output.css" rel="stylesheet"></link>
            </Head>
            <Component {...pageProps} />
        </>
)}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp