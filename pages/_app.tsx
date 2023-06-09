import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Saira } from 'next/font/google';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

const saira = Saira({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<style jsx global>{`
				html {
					font-family: ${saira.style.fontFamily};
				}
			`}</style>
			<Head>
				<title>PokéSynergy - Team Builder</title>
				<meta
					name='description'
					content='Create perfectly balanced teams that dominate battles.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default App;
