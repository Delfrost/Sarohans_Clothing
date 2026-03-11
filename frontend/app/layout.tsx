import "./globals.css";
import NavBar from "../components/ui/NavBar";
import SarohansFooter from "../components/sections/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&family=IM+Fell+English:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "#050505",
        }}
      >
        {/* Navbar */}
        <NavBar />

        {/* Page Content — paddingTop offsets the fixed navbar height */}
        <div
          style={{
            flex: 1,
            paddingTop: "90px",
          }}
        >
          {children}
        </div>

        {/* Footer — always at the bottom */}
        <SarohansFooter />
      </body>
    </html>
  );
}