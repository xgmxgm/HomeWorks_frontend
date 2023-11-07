'use client'

import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import styles from "./Profile.module.scss"
import { AnyAction } from "redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { FetchHomeWorks } from "@/store/HomeWorksSlice"
import { Loader } from "@/widgets/Loader"
import { SelectLessons } from "@/widgets/SelectLessons"

interface FethcData {
    lesson: string
}

export const Profile = () => {
    const dispatch: ThunkDispatch<FethcData, void, AnyAction> = useDispatch();

    const [isLoading, setIsLoading] = useState<null | boolean>(null);

    const User = useSelector((state: RootState) => state.user.user)
    const HomeWorks = useSelector((state: RootState) => state.homeWorks.homeWork)
    const isAuth = useSelector((state: RootState) => state.isAuth.isAuth)
    const router = useRouter();

    const [selectVal, setSelectVal] = useState<string>('Русский язык');

    const lessons: string[] = ['Русский язык', 'Казакский язык', 'Математика', 'Физика', 'Химия', 'География', 'Информатика', 'Английский язык', 'Физра', 'НВП', 'Казахская литература', 'Казахская история']

    useEffect(() => {
        if (!isAuth) {
            router.push("authorize")
        }
    }, [])
    
    if (!isAuth) {
        return <div> Rederecting...</div>
    }

    useEffect(() => {
        if (User.name) {
            setIsLoading(true)
            dispatch(FetchHomeWorks({lesson: selectVal, group: User.group})).finally(() => {
                setIsLoading(false)
            })
        }
    })

    return (
        <div className={styles.Profile__Main}>
            <div className={styles.Welcome__Div}>
                <h2>Добро Пожаловать !</h2>
            </div>
            <div className={styles.Profile__Up}>
                <h2>Группа: {User.group}</h2>
                <h2>Фамилия:  {User.lastName}</h2>
                <h2>Имя: {User.name}</h2>
                <h2>Email: {User.email}</h2>
                <h2>Статус: Студент</h2>
            </div>
            <div>
                <SelectLessons setValue={setSelectVal} dataArr={lessons} />
            </div>
            <div className={styles.HomeWorks}>
                <div className={styles.homeWork__title}>
                    <h2>Домашние задания</h2>
                </div>
                { isLoading ? <Loader /> :
                    HomeWorks.length ? HomeWorks.map((homeWork, index) =>
                        <div key={index} className={styles.HomeWork__card}>
                            <p>{homeWork.title}</p>
                            <p>{homeWork.info}</p>
                            <p>{homeWork.group}</p>
                            <p>{homeWork.lesson}</p>
                        </div>
                    )
                : <h2>Нету ДЗ !</h2>}
            </div>
        </div>
    )
}