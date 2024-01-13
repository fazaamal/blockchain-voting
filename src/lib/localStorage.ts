export function setAuthToken(authToken: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', authToken);
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

export function setWalletAddress(walletAddress: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('walletAddress', walletAddress);
  }
}

export function getWalletAddress(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('walletAddress');
  }
  return null;
}
