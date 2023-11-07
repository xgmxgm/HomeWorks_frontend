export interface ILoginData {
    email: string,
    password: string,
}

export interface IRegisterData {
    name: string,
    lastName: string,
    email: string,
    password: string,
    passwordRepeat: string,
    group: string,
    isTeacher?: boolean,
    lesson?: string
}

export interface IUserData {
    name: string,
    lastName: string,
    email: string,
    message?: string,
    group: string,
    isAdmin?: boolean,
    isTeacher?: boolean,
    lesson?: string,
}

export interface IHomeWork {
    title: string,
    info: string,
    group: string,
    lesson: string,
}