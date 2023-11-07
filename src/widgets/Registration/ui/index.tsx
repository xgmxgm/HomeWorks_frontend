'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import styles from "./Registration.module.scss"
import { RegistrationUser } from '@/store/userSlice'
import { RootState } from '@/store'
import { IUserData } from '@/interfaces'
import { Loader } from '@/widgets/Loader'

export const Registration = () => {
    const router = useRouter();
    
    const dispatch: ThunkDispatch<IUserData, void, AnyAction> = useDispatch();
    const User = useSelector((state: RootState) => state.user.user)
    const isAuth = useSelector((state: RootState) => state.isAuth.isAuth)

    const [isLoading, setIsLoading] = useState<null | boolean>(null);

    const [name, setInputName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordRepeat, setPasswordRepeat] = useState<string>('')
    const [group, setGroup] = useState<string>('')
    const [isTeacher, setIsTeacher] = useState<boolean>(false)

    const sendData = () => {
        setIsLoading(true)
        dispatch(RegistrationUser({name, lastName, email, password, passwordRepeat, group, isTeacher})).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        if (isAuth) {
            router.push('/personalarea')
        }
    })

    return (
        <div className={styles.Registration__main}>
            <div className={styles.Registration}>
                <h2>Регистрация</h2>
                <Input
                    inputValue={name}
                    setInputValue={setInputName}
                    placeholder='Введите ваше имя...'
                />
                <Input
                    inputValue={lastName}
                    setInputValue={setLastName}
                    placeholder='Введите вашу фамилию...'
                />
                <Input
                    inputValue={email}
                    setInputValue={setEmail}
                    placeholder='Введите вашу почту...'
                />
                <Input
                    inputValue={group}
                    setInputValue={setGroup}
                    placeholder='Введите вашу группу...'
                />
                <Input
                    inputValue={password}
                    setInputValue={setPassword}
                    placeholder='Введите ваш пароль...'
                />
                <Input
                    inputValue={passwordRepeat}
                    setInputValue={setPasswordRepeat}
                    placeholder='Повторите пароль...'
                />
                <p>{User && User.message}</p>
                { isLoading ? <Loader /> :
                    <Button onClick={sendData}>зарегистрироваться</Button>
                }
                <a className={styles.a} href="/authorize">есть аккаунт</a>
            </div>
        </div>
    )
}