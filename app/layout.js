import './globals.css';
import Script from 'next/script';
import { Suspense } from 'react';
import GATracker from './components/GATracker';

export const metadata = {
  title: '풍덩 - 창작 연재 플랫폼',
  description: '풍덩 웹앱 Next.js 변환',
  icons: {
    icon: '/풍덩_로고__ai__명함용__확정___-removebg-preview.png',
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const shouldEnableGa = process.env.NODE_ENV === 'production' && Boolean(gaId);

  return (
    <html lang="ko">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DLYFZLY24B"></script>
        <script dangerouslySetInnerHTML={{__html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-DLYFZLY24B');
`}} />
      </head>
      <body>
        {shouldEnableGa && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}', { send_page_view: false });
              `}
            </Script>
            <Suspense fallback={null}>
              <GATracker />
            </Suspense>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
