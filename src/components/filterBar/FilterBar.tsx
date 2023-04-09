import './FilterBar.css'
import {MouseEventHandler} from "react";

interface IProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const FilterBar = (props : IProps) => {
    return (
        <form className='filter'>
            <p className='title_filter'>Filter Bar</p>
            <button value='independent' onClick={props.onClick} className='filter_button'>Independent</button>
            <button value='not_independent' onClick={props.onClick} className='filter_button'>Not independent</button>
            <button value='more' onClick={props.onClick} className='filter_button'>Population more than 1 million</button>
            <button value='less' onClick={props.onClick} className='filter_button'>Population less than 1 million</button>
        </form>
    )
};

export default FilterBar;