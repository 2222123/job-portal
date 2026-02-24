// src/context/AppContext.jsx
import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]); // Must be initialized as []
    const [currentPage, setCurrentPage] = useState(1);
    const [searchFilter, setSearchFilter] = useState({ title: '', location: '' });
    const [isSearched, setIsSearched] = useState(false);

    const fetchJobs = async () => {
        setJobs(jobsData);
        setFilteredJobs(jobsData);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const value = {
        jobs, setJobs,
        filteredJobs, setFilteredJobs,
        currentPage, setCurrentPage,
        searchFilter, setSearchFilter,
        isSearched, setIsSearched
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};