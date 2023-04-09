export interface ICountry {
    name: string
    independent: boolean
    flag: string
    population: number
}

export interface IState {
    countries:  ICountry[]
    filterCountries: ICountry[]
    isLoading: boolean
    error: Error | null
}
