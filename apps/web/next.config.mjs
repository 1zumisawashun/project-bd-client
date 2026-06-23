import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@ui'] = path.resolve(__dirname, '../../packages/ui/src')
    return config
  },
}

export default nextConfig
