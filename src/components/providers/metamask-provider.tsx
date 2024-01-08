import { MetaMaskProvider } from "@metamask/sdk-react";

const host = typeof window !== "undefined" ? window.location.host : "defaultHost";

const sdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false,
  dappMetadata: {
    name: "Blockchain Voting System",
    url: host.includes('localhost')?'http://'+host: 'https://' + host, // using the host constant defined above
  },
};

export function MetaMaskProviderWrapper({ children }: { children: React.ReactNode }) {
  return <MetaMaskProvider debug={false} sdkOptions={sdkOptions} >{children}</MetaMaskProvider>
}