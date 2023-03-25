import Navbar from "./Navbar";
import "./globals.css";
import ModalsWrapper from "@/modals/ModalsWrapper";

export const metadata = {
  title: "Movie list app",
  description: "Weekly project for React Web II",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ModalsWrapper>
          <Navbar />
          <main>{children}</main>
        </ModalsWrapper>
      </body>
    </html>
  );
}
