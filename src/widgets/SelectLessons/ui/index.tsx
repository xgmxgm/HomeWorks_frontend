import styles from "./SelectLessons.module.scss"

interface IProps {
    setValue: (value: string) => void,
    dataArr: string[],
}

export const SelectLessons = ({ setValue, dataArr }: IProps) => {
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectValue = event.target.value;
        setValue(selectValue);
    }

    return (
        <div>
            <select className={styles.select} onChange={selectChange}>
                {
                    dataArr.map((data, index) => 
                        <option className={styles.option} key={index} value={data}>{data}</option>
                    )
                }
            </select>
        </div>
    )
}