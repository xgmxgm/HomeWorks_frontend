'use client'

import { RootState } from "@/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from "./admin.module.scss"
import { Button } from "@/shared/ui/Button"
import { Modal } from "@/widgets/Modal"
import { Input } from "@/shared/ui/Input"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { IUserData } from "@/interfaces"
import { RegistrationUser } from "@/store/userSlice"
import { Loader } from "@/widgets/Loader"
import { SelectLessons } from "@/widgets/SelectLessons"

export const Admin = () => {
    const User = useSelector((state: RootState) => state.user.user)
    const router = useRouter();

    const dispatch: ThunkDispatch<IUserData, void, AnyAction> = useDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<null | boolean>(null);

    // const [selectVal, setSelectVal] = useState<string>('');

    const [name, setInputName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordRepeat, setPasswordRepeat] = useState<string>('')
    const [group, setGroup] = useState<string>('')
    const [lesson, setLesson] = useState<string>('')
    const [isTeacher, setIsTeacher] = useState<boolean>(false)

    const lessons: string[] = ['Русский язык', 'Казакский язык', 'Математика', 'Физика', 'Химия', 'География', 'Информатика', 'Английский язык', 'Физра', 'НВП', 'Казахская литература', 'Казахская история']

    useEffect(() => {
        if (!User.isAdmin) {
            router.push('authorize')
        }
    }, [])
    
    if (!User.isAdmin) {
        return <div> Rederecting...</div>
    }

    const sendData = () => {
        setIsLoading(true)
        dispatch(RegistrationUser({name, lastName, email, password, passwordRepeat, group, isTeacher, lesson})).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div>
            For Admin
            <div>
                <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
                    <div>
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
                        <SelectLessons setValue={setLesson} dataArr={lessons} />
                        <div className={styles.Registration__TeacherCheck}>
                            <p>Вы учитель</p>
                            <input
                                type='checkbox'
                                checked={isTeacher}
                                onChange={(e) => setIsTeacher(e.target.checked)}
                            />
                        </div>
                        <p>{User && User.message}</p>
                        { isLoading ? <Loader /> :
                            <Button onClick={sendData}>зарегистрироваться</Button>
                        }
                    </div>
                </Modal>
            </div>
            <Button onClick={() => setIsOpen(!isOpen)}>registration</Button>
        </div>
    )
}