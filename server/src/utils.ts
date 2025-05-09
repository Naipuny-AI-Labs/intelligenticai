import { randomBytes } from 'crypto'
export const generateAPIKey = (): string => {
    const buffer = randomBytes(32)
    return buffer.toString('base64url')
}
