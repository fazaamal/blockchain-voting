/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    NODE_ENV: process.env.NODE_ENV,
    CONTRACT_ADDRESS_DEV: process.env.CONTRACT_ADDRESS_DEV,
    CONTRACT_ADDRESS_PROD: process.env.CONTRACT_ADDRESS_PROD, 
  },
}

module.exports = nextConfig
