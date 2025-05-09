import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secret-key'

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization header missing or invalid' })
        return
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        ;(req as any).user = decoded // attach user info to request
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' })
        return
    }
}
