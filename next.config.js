/** @type {import('next').NextConfig} */

const Dotenv = require('dotenv-webpack');

const nextConfig = {
	reactStrictMode: false,
  plugins:[
    new Dotenv()
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
        config.resolve.fallback = {
            fs: false,
            process: true,
            path: true,
            os: true,
        }
    }

    return config;
}
};

module.exports = nextConfig;
