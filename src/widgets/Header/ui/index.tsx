'use client'

import { Button } from "@/shared/ui/Button"
import styles from "./Header.module.scss"
import { useSelector } from "react-redux"
import { RootState } from "@/store"


export const Header = () => {
    const isAuth = useSelector((state: RootState) => state.isAuth.isAuth)

    return (
        <div className={styles.Header}>
            <div className={styles.Header__Left}>
                Home Work
            </div>
            <div className={styles.Header__Right}>
                <a className={styles.a} href="/authorize"><Button>{ !isAuth ? "Войти" : "Выйти"}</Button></a>
            </div>
        </div>
    )
}