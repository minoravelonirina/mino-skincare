import bcrypt from "bcryptjs";
import { User } from "./types";

const users: Map<number, User> = new Map();

export const db = {
    // find user by email
    findUserByEmail: async (email: string): Promise<User | null> => {
        for (const user of users.values()){
            if (user.email === email){
                return user;
            }
        }
        return null;
    },

    findUserById: async (id: number): Promise<User | null> => {
        return users.get(id) || null;
    },

    createUser: async (
        firstname: string,
        lastname: string,
        email: string, 
        password: string
    ): Promise<User> => {
        const existingUser = await db.findUserByEmail(email);
        if (existingUser){
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = Date.now().valueOf()

        const user: User = {
            id: userId,
            firstname,
            lastname,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };

        users.set(userId, user);
        return user;
    },

      // Verify password										
    verifyPassword: async (plainPassword: string, hashedPassword: string): Promise<boolean> => {										
        return await bcrypt.compare(plainPassword, hashedPassword);										
    },										


    // Verify password
    sanitizeUser: (user: User): Omit<User, 'password'> => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },
};