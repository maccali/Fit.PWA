import { createContext, useLayoutEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";

type User = {
    name: string;
    email: string;
    // avatar_url: string;
}

type SignInData = {
    email: string;
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User;
    signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user;

    useLayoutEffect(() => {
        const { 'nextauth.token': token } = parseCookies()

        if (token) {
            recoverUserInformation().then(response => {
                console.log("response.user", response.user)
                setUser(response.user)
            })
        }
    }, [])

    async function signIn({ email, password }: SignInData) {
        const { token, user } = await signInRequest({
            email,
            password,
        })

        setCookie(undefined, 'nextauth.token', token, {
            maxAge: user.exp, // 1 hour
        })

        setCookie(undefined, 'nextauth.user', user, {
            maxAge: user.exp, // 1 hour
        })



        api.defaults.headers['token'] = `${token}`;

        setUser(user)

        Router.push('/dashboard');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}