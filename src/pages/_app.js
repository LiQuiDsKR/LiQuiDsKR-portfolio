import "../styles/globals.css";
import Header from "../components/Header";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className="pt-16" />
      <Component {...pageProps} />
    </>
  );
}
