// src/components/JobListing.jsx
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
    const { jobs, filteredJobs, setFilteredJobs, currentPage, setCurrentPage, searchFilter } = useContext(AppContext);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]); // State for location filter

    useEffect(() => {
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category);
        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location);
        const matchesSearchTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesSearchTitle(job) && matchesSearchLocation(job)
        );

        setFilteredJobs(newFilteredJobs);
        setCurrentPage(1);
    }, [jobs, selectedCategories, selectedLocations, searchFilter]);

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            {/* Sidebar */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* Categories Filter (Already working) */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobCategories.map((category, index) => (
                            <li className='flex gap-3 items-center' key={index}>
                                <input className='scale-125' type="checkbox" 
                                onChange={() => setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category])}
                                checked={selectedCategories.includes(category)} />
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ADD THIS: Search by Location Filter */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4 pt-10'>Search by Location</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobLocations.map((location, index) => (
                            <li className='flex gap-3 items-center' key={index}>
                                <input className='scale-125' type="checkbox" 
                                onChange={() => setSelectedLocations(prev => prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location])}
                                checked={selectedLocations.includes(location)} />
                                {location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Job Listings Section */}
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {/* FIXED: added '?' after filteredJobs to stop the 'slice' error */}
                    {filteredJobs?.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default JobListing