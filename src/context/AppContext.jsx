import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [jobs, setJobs] = useState([]);
    
    // Recruiter Login Popup chupinchadaniki ee state kachithanga undali
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isSearched, setIsSearched] = useState(false);

    // Jobs data fetch cheyadaniki function
    const fetchJobs = async () => {
        setJobs(jobsData);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const value = {
        jobs, setJobs,
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        showRecruiterLogin, setShowRecruiterLogin, // Ivi Navbar & RecruiterLogin components ki chala important
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};