import "./globals.css";

// Root layout is minimal — html/body/lang are set in [locale]/layout.tsx
// so the <html lang=""> attribute is locale-specific.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
