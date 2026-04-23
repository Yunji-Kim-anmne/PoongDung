import './globals.css';

export const metadata = {
  title: '풍덩 - 창작 연재 플랫폼',
  description: '풍덩 웹앱 Next.js 변환',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
