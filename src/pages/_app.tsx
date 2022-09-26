import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../store/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </Provider>
    );
}

export default MyApp;
