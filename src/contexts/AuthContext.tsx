import { createContext, useLayoutEffect, useEffect, useState } from "react";
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

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user;


  async function recover() {
    const user = await recoverUserInformation()
    setUser(user)
  }

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    console.log('nextauth.token')


    if (token) {
      recover()
    }
  }, [])

  // useEffect(() => {
  //   console.log('useEffect')
  //   return () => {
  //     console.log('useEffect cleanup')
  //   }
  // })

  // // window.requestAnimationFrame(() => console.log('requestAnimationFrame'))

  // useLayoutEffect(() => {
  //   console.log('useLayoutEffect')
  //   return () => {
  //     console.log('useLayoutEffect cleanup')
  //   }
  // })

  async function signIn({ email, password }: SignInData) {
    const { token, user }: any = await signInRequest({
      email,
      password,
    })

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: user.exp, // 1 hour
    })

    setCookie(undefined, 'nextauth.user', JSON.stringify(user), {
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