import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets"; 

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);

    // Load jobs from assets [01:27:40]
    const fetchJobs = async () => {
        setJobs(jobsData);
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        jobs // This 'jobs' is what JobListing.jsx needs
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}