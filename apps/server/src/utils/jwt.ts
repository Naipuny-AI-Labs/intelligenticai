import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secret-key' // Use env in real apps
const JWT_EXPIRES_IN = '1h'

export const generateToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET)
}
