import Head from "next/head";
import "../styles/globals.css";
import Header from "../components/Header";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>이재형 포트폴리오</title>
        <meta name="description" content="개발자 이재형의 포트폴리오 페이지입니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="pt-16" />
      <Component {...pageProps} />
    </>
  );
}
