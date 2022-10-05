import * as React from 'react';
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider, EmotionCache } from '@emotion/react';

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
function MyApp({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps
}: MyAppProps) {
	return (
		<Provider store={store}>
			<CacheProvider value={emotionCache}>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</CacheProvider>
		</Provider>
	);
}

export default MyApp;
