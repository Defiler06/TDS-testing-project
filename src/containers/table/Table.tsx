import './Table.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../index";
import Row from "../../components/row/Row";
import {changeCountries, fetchCountries} from "../../store/infoSlices";
import React, { useEffect, useState} from "react";
import {ICountry} from "../../interfaces/interfaces";
import Loader from "../../components/UI/preloader/Prealoader";
import SortRow from "../../components/sortRow/SortRow";
import FilterBar from "../../components/filterBar/FilterBar";


const Table = () => {
    const countries = useSelector<RootState, ICountry[]>(state => state.countries.countries);
    const filterCountires = useSelector<RootState, ICountry[]>(state => state.countries.filterCountries);
    const loader = useSelector<RootState, boolean>(state => state.countries.isLoading);
    const dispatch = useDispatch<AppDispatch>();

    const [sortData, setSortData] = useState<{column: null, direction: null}>({column: null, direction: null});
    const {column, direction} = sortData;

    const isNameAscSort = column === 'name' && direction === 'asc';
    const isNameDescSort = column === 'name' && direction === 'desc';
    const isIndependentAscSort = column === 'independent' && direction === 'asc';
    const isIndependentDescSort = column === 'independent' && direction === 'desc';
    const isPopulationAscSort = column === 'population' && direction === 'asc';
    const isPopulationDescSort = column === 'population' && direction === 'desc';


    const renderCountries = countries.map((element: ICountry, index: number) => {
        return <Row
            key={index}
            independent={element.independent ? "true" : "false"}
            flag={element.flag}
            population={element.population}
            name={element.name}
        />
    });

    const sortColumnHandle = (column: string, direction: string) => {
        const copyCountries = [...countries];

        if (column === 'name') {
            copyCountries.sort((a: ICountry, b: ICountry) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                if (direction === 'asc') {
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                } else {
                    if (nameA > nameB) return -1;
                    if (nameA < nameB) return 1;
                }

                return 0;
            });
        } else {
            copyCountries.sort((a: any, b: any) => (direction === 'asc' ? a[column] - b[column] : b[column] - a[column]));
        }

        dispatch(changeCountries(copyCountries));
    };

    const filterColumnHandler = (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        const copyCountries = [...filterCountires];

        if (event.currentTarget.value === 'independent') {
            const sortArray = copyCountries.filter(element => {
               return element.independent;
            });

            dispatch(changeCountries(sortArray));
        }

        if (event.currentTarget.value === 'not_independent') {
            const sortArray = copyCountries.filter(element => {
                return !element.independent;
            });

            dispatch(changeCountries(sortArray));
        }

        if (event.currentTarget.value === 'more') {
            const sortArray = copyCountries.filter(element => {
                return element.population > 1000000;
            });

            dispatch(changeCountries(sortArray));
        }

        if (event.currentTarget.value === 'less') {
            const sortArray = copyCountries.filter(element => {
                return element.population < 1000000;
            });

            dispatch(changeCountries(sortArray));
        }
    };


    useEffect(() => {
        dispatch(fetchCountries())
    }, [dispatch]);


    return (
        loader ? <Loader show={loader}/> : <div className='container'>
            <div className='main'>
                <table className='table'>
                    <thead>
                    <tr>
                        <th scope="col">Flag</th>
                        <th scope="col">Name
                            <SortRow
                                onClick={isNameAscSort ? null : () => sortColumnHandle('name', 'asc')}
                            >
                                asc
                            </SortRow>
                            <SortRow
                                onClick={isNameDescSort ? null : () => sortColumnHandle('name', 'desc')}
                            >
                                desc
                            </SortRow>
                        </th>
                        <th scope="col">Independent
                            <SortRow
                                onClick={isIndependentAscSort ? null : () => sortColumnHandle('independent', 'asc')}
                            >
                                asc
                            </SortRow>
                            <SortRow
                                onClick={isIndependentDescSort ? null : () => sortColumnHandle('independent', 'desc')}
                            >
                                desc
                            </SortRow>
                        </th>
                        <th scope="col">Population
                            <SortRow
                                onClick={isPopulationAscSort ? null : () => sortColumnHandle('population', 'asc')}
                            >
                                asc
                            </SortRow>
                            <SortRow
                                onClick={isPopulationDescSort ? null : () => sortColumnHandle('population', 'desc')}
                            >
                                desc
                            </SortRow>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderCountries}
                    </tbody>
                </table>
                <FilterBar
                    onClick={(event) => filterColumnHandler(event)}/>
            </div>
        </div>
    )
};

export default Table;