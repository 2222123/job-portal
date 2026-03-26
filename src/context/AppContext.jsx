import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { user } = useUser();
    const { getToken } = useAuth();

    const [jobs, setJobs] = useState([]);
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
    const [companyToken, setCompanyToken] = useState(localStorage.getItem('companyToken'));
    const [companyData, setCompanyData] = useState(null);

    const [userData, setUserData] = useState(null);
    const [userToken, setUserToken] = useState(null);

    // Function to fetch all jobs
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs');
            if (data.success) {
                setJobs(data.jobs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to fetch Company Data
    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/data', { headers: { token: companyToken } });
            if (data.success) {
                setCompanyData(data.company);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to fetch User Data (Deenivalla Login Issue fix avthundi)
    const fetchUserData = async () => {
        try {
            const token = await getToken();
            setUserToken(token);

            const { data } = await axios.get(backendUrl + '/api/users/user', { 
                headers: { Authorization: `Bearer ${token}` } 
            });

            if (data.success) {
                setUserData(data.user);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken]);

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    const value = {
        setJobs, jobs,
        showRecruiterLogin, setShowRecruiterLogin,
        backendUrl,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        userData, setUserData,
        userToken, setUserToken,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}