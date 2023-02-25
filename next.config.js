/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    firebaseApiKey: 'AIzaSyDLADJwJ-oY_eYbBKNxu30AMZEF4560ExA',
    firebaseAuthDomain: 'chattybox-aafd4.firebaseapp.com',
    firebaseProjectId: 'chattybox-aafd4',
    firebaseStorageBucket: 'chattybox-aafd4.appspot.com',
    firebaseMessagingSenderId: '314865931685',
    firebaseAppId: '1:314865931685:web:5081a4e9b3f69d0f0c844c',
    firebaseMeasurementId: 'G-4FPCRLBPQT',
  },
}

module.exports = nextConfig
