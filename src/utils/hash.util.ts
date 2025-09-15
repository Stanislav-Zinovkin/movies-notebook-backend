import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPassword( password: string, isHashed = false): Promise<string> {
    if (isHashed) {
        return password;
    }
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword( password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
}