import bcrypt from 'bcrypt';
import {generateToken} from './auth';

const users: {[key: string]: {id: string; username: string; password: string}} = {};

export async function registerUser(username: string, password: string) {
    if (users[username]) {
        throw new Error('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = Date.now().toString();
    users[username] = {id, username, password: hashedPassword};
    return generateToken(id);
}

export async function loginUser(username: string, password: string) {
    const user = users[username];
    if (!user) {
        throw new Error('Invalid username or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }
    return generateToken(user.id);
}
