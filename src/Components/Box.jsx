import React ,{useState} from "react"
import styles from '../Styles/Box.module.css'
function Box(props){
    return (
        <button className={styles.button} onClick={props.handleChange}>{props.value}</button>
    )
}
export default Box