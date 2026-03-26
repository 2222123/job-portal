import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([])

    // Sidebar Category Toggle Logic
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }

    // Sidebar Location Toggle Logic
    const handleLocationChange = (location) => {
        setSelectedLocations(prev => 
            prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
        )
    }

    useEffect(() => {
        // Essential: Added extra safety checks for jobs and searchFilter properties
        if (jobs && Array.isArray(jobs) && jobs.length > 0) {
            
            const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job?.category)
            
            const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job?.location)
            
            const matchesTitle = job => {
                const searchTitle = searchFilter?.title || ""
                return searchTitle === "" || job?.title?.toLowerCase().includes(searchTitle.toLowerCase())
            }

            const result = jobs.slice().reverse().filter(
                job => job && matchesCategory(job) && matchesLocation(job) && matchesTitle(job)
            )
            setFilteredJobs(result)
            setCurrentPage(1) // Reset to first page on new filter
        } else {
            setFilteredJobs([])
        }
    }, [jobs, selectedCategories, selectedLocations, searchFilter])

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row py-8'>
            
            {/* Sidebar Filters */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* Search Info if searched */}
                {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                    <div className='mb-6'>
                        <h3 className='font-medium text-lg mb-2'>Current Search</h3>
                        <div className='flex flex-wrap gap-2'>
                            {searchFilter.title && <span className='bg-blue-100 px-3 py-1 rounded text-sm'>{searchFilter.title}</span>}
                            {searchFilter.location && <span className='bg-red-100 px-3 py-1 rounded text-sm'>{searchFilter.location}</span>}
                            <button onClick={() => setSearchFilter({title: '', location: ''})} className='text-gray-500 text-sm underline'>Clear All</button>
                        </div>
                    </div>
                )}

                {/* Categories Filter */}
                <div className='mb-8'>
                    <h4 className='font-medium text-lg mb-4'>Search by Categories</h4>
                    <ul className='space-y-3'>
                        {JobCategories.map((category, index) => (
                            <li key={index} className='flex items-center gap-3'>
                                <input 
                                    className='scale-125' 
                                    type="checkbox" 
                                    onChange={() => handleCategoryChange(category)}
                                    checked={selectedCategories.includes(category)}
                                />
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Locations Filter */}
                <div className='mb-8'>
                    <h4 className='font-medium text-lg mb-4'>Search by Location</h4>
                    <ul className='space-y-3'>
                        {JobLocations.map((location, index) => (
                            <li key={index} className='flex items-center gap-3'>
                                <input 
                                    className='scale-125' 
                                    type="checkbox" 
                                    onChange={() => handleLocationChange(location)}
                                    checked={selectedLocations.includes(location)}
                                />
                                {location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Job Listings Section */}
            <section className='w-full lg:w-3/4 text-gray-800 px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8'>
                    {filteredJobs.length > 0 ? (
                        filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))
                    ) : (
                        <div className='col-span-full py-10 text-center'>
                             <p className='text-gray-500 text-lg'>No jobs found matching your criteria.</p>
                             <p className='text-gray-400 text-sm mt-2'>Try adding a job from the recruiter dashboard or clear filters.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} src={assets.left_arrow_icon} alt="" />
                        </a>
                        {[...Array(Math.ceil(filteredJobs.length / 6))].map((_, index) => (
                            <a key={index} href="#job-list">
                                <button 
                                    onClick={() => setCurrentPage(index + 1)} 
                                    className={`w-10 h-10 flex items-center justify-center border rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
                                >
                                    {index + 1}
                                </button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="" />
                        </a>
                    </div>
                )}
            </section>
        </div>
    )
}

export default JobListing