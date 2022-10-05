import "../styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { theme } from "../components/Theme";

const queryClient = new QueryClient();



function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <CssVarsProvider theme={theme}>
                {/* {console.log(extendTheme())} */}
                <Component {...pageProps} />
                <ReactQueryDevtools />
            </CssVarsProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
