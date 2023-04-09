import './Backdrop.css'
import {MouseEventHandler} from "react";

interface IBackdrop {
    show: boolean
    CloseHandler: MouseEventHandler | undefined
}

const Backdrop = (props : IBackdrop) => {
    return props.show ? <div className='Backdrop' onClick={props.CloseHandler}></div> : null
}

export default Backdrop;