import "./globals.css";
import NavBar2 from "../components/ui/NavBar2";
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "#0A0800",
        }}
      >
        {/* NavBar2 is fixed-position, so NO paddingTop here — hero goes full bleed under it */}
        <NavBar2 />

        {/* Children render directly — hero section handles its own top padding internally */}
        <div style={{ flex: 1 }}>
          {children}
        </div>

        <SarohansFooter />
      </body>
    </html>
  );
}