import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ravisanth R Pillai | Independent Consultant | Engineer | Entrepreneur | Writer",
    template: "%s | Ravisanth R Pillai",
  },
  description: "Country Head at Indus Crusher. 15+ years in mining, crushing and aggregates. Worked across 40+ countries. Writer, documentary creator, and storyteller about Kerala's medieval history.",
  keywords: [
    "Ravisanth R Pillai",
    "Indus Crusher",
    "mining equipment",
    "crushing equipment",
    "aggregates",
    "VSI knowledge",
    "plant design",
    "bucket crushers",
    "Kerala history",
    "documentary creator",
    "engineering consultant",
    "mining consultant",
    "field engineering",
    "product strategy",
    "market development",
    "mineral processing",
    "technical training",
    "leadership coaching",
  ],
  authors: [{ name: "Ravisanth R Pillai" }],
  creator: "Ravisanth R Pillai",
  publisher: "Ravisanth R Pillai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.ravisanth.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ravisanth.com",
    siteName: "Ravisanth R Pillai",
    title: "Ravisanth R Pillai | Independent Consultant | Engineer | Entrepreneur | Writer",
    description: "Independent Consultant | Crushing–Screening–Beneficiation Engineer | Entrepreneur | Writer. Plant Design (50–1000 TPH) across 40+ countries. APR Beyond Boundaries Creativity Pvt. Ltd.",
    images: [
      {
        url: "https://www.ravisanth.com/assets/profile.png",
        width: 500,
        height: 500,
        alt: "Ravisanth R Pillai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravisanth R Pillai | Independent Consultant | Engineer | Entrepreneur | Writer",
    description: "Independent Consultant | Crushing–Screening–Beneficiation Engineer | Entrepreneur | Writer. Plant Design (50–1000 TPH) across 40+ countries.",
    images: [
      "https://www.ravisanth.com/assets/profile.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "Professional Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('darkMode');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = stored !== null ? stored === 'true' : prefersDark;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ravisanth R Pillai",
              jobTitle: "Independent Consultant",
              worksFor: {
                "@type": "Organization",
                name: "APR Beyond Boundaries Creativity Pvt. Ltd.",
              },
              description: "Independent Consultant | Crushing–Screening–Beneficiation Engineer | Entrepreneur | Writer. Plant Design (50–1000 TPH) across 40+ countries.",
              url: "https://www.ravisanth.com",
              image: "https://www.ravisanth.com/assets/profile.png",
              email: "hello@ravisanth.com",
              telephone: "+91 9566867444",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
                addressLocality: "India",
              },
              sameAs: [
                "https://www.linkedin.com/in/ravisanth-r-pillai",
                "https://www.youtube.com/@RAVISANTH",
                "https://www.youtube.com/@Hisorherstories",
              ],
              knowsAbout: [
                "Mining Equipment",
                "Crushing Equipment",
                "Aggregates",
                "VSI Knowledge",
                "Plant Design",
                "Bucket Crushers",
                "Kerala History",
                "Documentary Production",
                "Engineering Consulting",
                "Technical Training",
                "Leadership Coaching",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
