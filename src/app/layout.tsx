import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
