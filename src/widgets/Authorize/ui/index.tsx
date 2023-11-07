'use client'

import { useEffect, useState } from "react"

import styles from "./Authorize.module.scss"
import { Input } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { AnyAction } from "redux"

import { RootState } from "@/store"
import { AuthorizeUser } from "@/store/userSlice";
import { ThunkDispatch } from "@reduxjs/toolkit"
import { IUserData } from '@/interfaces'
import { Loader } from "@/widgets/Loader"

export const Authorize = () => {
    const router = useRouter();

    const dispatch: ThunkDispatch<IUserData, void, AnyAction> = useDispatch();
    const User = useSelector((state: RootState) => state.user.user)
    const isAuth = useSelector((state: RootState) => state.isAuth.isAuth)

    const [isLoading, setIsLoading] = useState<null | boolean>(null);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const sendData = () => {
        setIsLoading(true)
        dispatch(AuthorizeUser({email, password})).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (isAuth) {
            router.push('/personalarea')
        }

        if (User.isTeacher) {
            router.push('/teacher')
        }

        if (User.isAdmin) {
            router.push('/admin')
        }
    })

    return (
        <>
            <div className={styles.Authorize__main}>
                <div>
                    <h2>Авторизация</h2>
                </div>
                <Input
                    inputValue={email}
                    setInputValue={setEmail}
                    placeholder="Введите вашу почту..."
                />
                <Input
                    inputValue={password}
                    setInputValue={setPassword}
                    placeholder="Введите ваш пароль..."
                />
                <p>{User && User.message}</p>
                { isLoading ? <Loader /> :
                    <Button onClick={sendData}>Войти</Button>
                }
                <a className={styles.a} href="/registration">нет аккаунта</a>
            </div>
        </>
    )
}