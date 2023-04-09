import React from "react";
import './SortRow.css';

interface IProps {
    onClick: any;
    children : string
}

const SortRow = (props : IProps) => {
    return <button onClick={props.onClick} className='sort_button'>{props.children}</button>;
};

export default SortRow;
