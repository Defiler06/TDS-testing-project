import './Preloader.css'
import Backdrop from "../bacdrop/Backdrop";

interface ILoader {
    show: boolean
}

const Loader = ({show} : ILoader) => {
    return (
        show ?
            <>
                <Backdrop show={true} CloseHandler={undefined}/>
                <div className='Spinner'></div>
            </>
            : null
    )
}

export default Loader;