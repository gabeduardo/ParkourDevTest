
import { sign } from 'jsonwebtoken';

export function generateVerificationUrl(userId: string, host: string) {
  const token = sign({ userId }, 'tu_secreto', { expiresIn: '8h' });
  const url = `http://${host}/api/verify?token=${token}`;
  return url;
}
