'use client'

import styles from "./Modal.module.scss"

interface IProps {
    children: React.ReactNode,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
}

export const Modal = ({ children, isOpen, setIsOpen }: IProps) => {
    return (
        <div>
            { isOpen &&
                <div
                    className={styles.Modal__Main}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className={styles.Modal__Content} onClick={(e) => e.stopPropagation()}>
                        { children }
                    </div>
                </div>
            }
        </div>
    )
}