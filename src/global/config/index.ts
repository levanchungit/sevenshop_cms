const isProduction = process.env.NODE_ENV === 'production'

export const API_URL = isProduction ? process.env.HOST : process.env.LOCAL

console.info('API_URL => ', API_URL)
