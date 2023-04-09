import './Row.css'

interface IProps {
    name: string
    independent: string
    flag: string
    population: number
}

const Row = (props: IProps) => {
    return (
        <tr>
            <td scope="row"><img src={props.flag} alt="countries" className='image'/></td>
            <td>{props.name}</td>
            <td>{props.independent}</td>
            <td>{props.population}</td>
        </tr>
    )
};

export default Row;