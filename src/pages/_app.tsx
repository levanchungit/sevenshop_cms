import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
