/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Reduce memory during dev by limiting workers
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
}

export default nextConfig
