// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  modules: ['@nuxtjs/tailwindcss'],
 
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET_KEY,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET_KEY,

    // Cloudinary
    // cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    // cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    // cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
}
})
