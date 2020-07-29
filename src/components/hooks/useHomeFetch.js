import {useState, useEffect} from 'react';
import {POPULAR_BASE_URL} from '../../config';

export const useHomeFetch = searchTerm => {
    const[state, setState] = useState({movies: []})
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);

    const fetchMovies = async endpoint => {
        setError(false);
        setLoading(true);
        
        const isLoadMore = endpoint.search('page'); //to check if endpoint is a query string to load more pages
        try {
            // fetch() is a built-in js function that gets data from endpoint
            // Both fetch() and json() are an async functions
            const result = await (await fetch(endpoint)).json();
            // "...prev" - use property spread notation to set new state to be the prev state, and only update 'movies, heroImage, currentPage, totalPages' property
            setState(prev => ({
                ...prev,
                movies: isLoadMore !== -1 ? [...prev.movies, ...result.results] : [...result.results],
                heroImage: prev.heroImage || result.results[0],
                currentPage: result.page,
                totalPages: result.total_pages
            }));
        }catch(error){
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }
    // Similar to componentDidMount and componentDidUpdate
    // To conditionally firing an effect: 
    // useEffect( fooFunction, [conditionVariable] )  - only useEffect only if the array of values that the effect depends on changes
    useEffect(() => {
        if (sessionStorage.homeState){
            setState(JSON.parse(sessionStorage.homeState));
            setLoading(false);
        }else{
            fetchMovies(POPULAR_BASE_URL);
        }
        
    }, [])
    //save state (popular movies) to sessionStorage so that when the browser is closed, the cache will be cleared
    useEffect(() => {
        // only save the state when searchTerm is not assigned (i.e. state = popular movies not search result's state)
        if(!searchTerm){
            sessionStorage.setItem('homeState', JSON.stringify(state));
        }
    })
    return [{state, loading, error}, fetchMovies];
}