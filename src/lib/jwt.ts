import jwt from 'jsonwebtoken';
require('dotenv').config();

class Jwt {
  private secretKey = process.env.JWT_SECRET_KEY;

  generateToken(walletAddress:string, validHours: number = 1) {
    const expirationTime = Math.floor(Date.now() / 1000) + 3600 * validHours; // Token expires in 1 hour
    const payload = {
      walletAddress,
      exp: expirationTime,
    };
  
    const token = jwt.sign(payload, this.secretKey as string);
    return token;
  }
  
  // Function to verify a JWT
  verifyToken(token: string, walletAddress?: string) {
    try {
      const decoded = jwt.verify(token, this.secretKey as string) as any;
      

      if(walletAddress) if(decoded.walletAddress !== walletAddress) return false;

      if(Date.now() >= decoded.exp * 1000) return false;

      return true;
    } catch (error: any) {
      console.error('Invalid token:', error.message);
      return false;
    }
  }
}

const JwtInstance =  new Jwt();

export default JwtInstance;