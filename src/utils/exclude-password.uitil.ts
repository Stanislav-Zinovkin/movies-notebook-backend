export function excludePassword<T extends { password?: any}>(
    user: T,
): Omit<T, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}