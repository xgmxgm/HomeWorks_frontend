'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

import styles from "./Teacher.module.scss"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { CreateNewHomework, FetchHomeWorks, DeleteHomeWork } from "@/store/HomeWorksSlice";
import { Button } from "@/shared/ui/Button";
import { Modal } from "@/widgets/Modal";
import { Input } from "@/shared/ui/Input";

interface FethcData {
    lesson: string
}

export const Teacher = () => {
    const dispatch: ThunkDispatch<FethcData, void, AnyAction> = useDispatch();

    const User = useSelector((state: RootState) => state.user.user);
    const HomeWorks = useSelector((state: RootState) => state.homeWorks.homeWork)
    const router = useRouter();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [info, setInfo] = useState<string>('');

    useEffect(() => {
        if (!User.isTeacher) {
            router.push('authorize')
        }
    }, [])
    
    if (!User.isTeacher) {
        return <div> Rederecting...</div>
    }

    useEffect(() => {
        if (User.lesson) {
            dispatch(FetchHomeWorks({lesson: User.lesson, group: User.group}));
        }
    })

    const createHomework = () => {
        if (User.lesson) {
            dispatch(CreateNewHomework({title, info, group: User.group, lesson: User.lesson}))
        }
        setTitle('')
        setInfo('')
        setIsOpen(false)
    }

    const deleteHomeWork = (title: string, info: string) => {
        if (User.lesson) {
            dispatch(DeleteHomeWork({title, info}))
        }
        setIsOpen(false)
    }

    return (
        <div className={styles.Teacher__Main}>
            <div className={styles.Welcome__Div}>
                <h2>Добро Пожаловать !</h2>
            </div>
            <div className={styles.Teacher__Up}>
                <h2>{User.group}</h2>
                <h2>{User.lastName}</h2>
                <h2>{User.name}</h2>
                <h2>{User.email}</h2>
                <h2>Предмет: {User.lesson}</h2>
                <h2>Статус: Преподаватель</h2>
            </div>
            <div className={styles.create__homeWork}>
                <Button onClick={() => setIsOpen(!isOpen)}>Создать ДЗ</Button>
            </div>
            <div>
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <div>
                        <p>Название:</p>
                        <Input inputValue={title} setInputValue={setTitle} placeholder="Введите название ДЗ..." />
                        <p>Описание:</p>
                        <Input inputValue={info} setInputValue={setInfo} placeholder="Введите описание ДЗ..." />
                        <Button onClick={() => createHomework()}>Создать</Button>
                    </div>
                </Modal>
            </div>
            <div className={styles.HomeWorks}>
                <div className={styles.homeWork__title}>
                    <h2>Домашние задания</h2>
                </div>
                { HomeWorks.length ?
                    HomeWorks.map((homeWork, index) =>
                        <div key={index} className={styles.HomeWork__card}>
                            <p>{homeWork.title}</p>
                            <p>{homeWork.info}</p>
                            <p>Группа: {homeWork.group}</p>
                            <p>Предмет: {homeWork.lesson}</p>
                            <Button onClick={() => deleteHomeWork(homeWork.title, homeWork.info)}>Удалить</Button>
                        </div>
                    )
                : <div><h2>Нету ДЗ !</h2></div>}
            </div>
        </div>
    )
}