/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
  };
  
  const withTM = require("next-transpile-modules")(["react-haiku","mui-chips-input"]);
  module.exports = withTM(nextConfig);