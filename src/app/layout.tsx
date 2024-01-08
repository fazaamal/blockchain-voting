import type { Metadata } from 'next'
import './globals.css'
import { Inconsolata, Montserrat } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import NavBar from '@/components/ui/NavBar'
import { MetaMaskProviderWrapper } from '@/components/providers/metamask-provider'

const host = typeof window !== "undefined" ? window.location.host : "defaultHost";
  
const sdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false,
  dappMetadata: {
    name: "Blockchain Voting System",
    url: host.includes('localhost')?'http://'+host: 'https://' + host, // using the host constant defined above
  },
};

const montserrat = Montserrat({
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  subsets: ['latin'],
})

const inconsolata = Inconsolata({
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inconsolata',
  subsets: ['latin'],
})



export const metadata: Metadata = {
  title: 'Voting dApp',
  description: 'Voting dApp to vote for the next President of Nusantara', 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={`${inconsolata.variable} ${montserrat.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <MetaMaskProviderWrapper> */}
              <NavBar />
              {children}
            {/* </MetaMaskProviderWrapper> */}
          </ThemeProvider>
      </body>
    </html>
  )
}