
import { sign } from 'jsonwebtoken';

export function generateVerificationUrl(userId: string) {
  const token = sign({ userId }, 'tu_secreto', { expiresIn: '8h' });
  return `http://localhost:3000/api/verify?token=${token}`;
}
