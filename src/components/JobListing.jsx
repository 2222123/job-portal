import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {

    const { jobs, isSearched, searchFilter, setSearchFilter } = useContext(AppContext)

    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            
            {/* Sidebar Section */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                
                {/* Search Filter Title (Only visible when a search is performed) */}
                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                            <div className='mb-4 text-gray-600'>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                                        {searchFilter.title}
                                        <img onClick={e => setSearchFilter(prev => ({...prev, title:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                                        {searchFilter.location}
                                        <img onClick={e => setSearchFilter(prev => ({...prev, location:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                            </div>
                        </>
                    )
                }

                {/* Mobile Toggle Button: Filters / Close */}
                <button 
                    onClick={() => setShowFilter(prev => !prev)} 
                    className='lg:hidden flex items-center gap-2 border px-6 py-1.5 rounded border-gray-400 mb-4'
                >
                    {showFilter ? "Close" : "Filters"}
                </button>

                {/* Filter Sidebar Content */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <div className='mb-8'>
                        <h4 className='font-semibold mb-4'>Search by Categories</h4>
                        <ul className='space-y-3 text-gray-600'>
                            {["Programming", "Data Science", "Designing", "Networking", "Management", "Marketing", "Cybersecurity"].map((category, index) => (
                                <li key={index} className='flex gap-3 items-center'>
                                    <input className='scale-125' type="checkbox" />
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='mb-8'>
                        <h4 className='font-semibold mb-4'>Search by Location</h4>
                        <ul className='space-y-3 text-gray-600'>
                            {["Bangalore", "Washington", "Hyderabad", "Mumbai", "California", "Chennai", "New York"].map((location, index) => (
                                <li key={index} className='flex gap-3 items-center'>
                                    <input className='scale-125' type="checkbox" />
                                    {location}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Apply Filters button inside sidebar for mobile */}
                    <button 
                        onClick={() => setShowFilter(false)} 
                        className='lg:hidden w-full bg-blue-600 text-white py-2 rounded mt-4'
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Job Listings Section */}
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {/* Logic for pagination: slicing the array to show 6 per page */}
                    {jobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>

                {/* Pagination Controls */}
                {jobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} src={assets.left_arrow_icon} alt="" />
                        </a>
                        {Array.from({ length: Math.ceil(jobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button 
                                    onClick={() => setCurrentPage(index + 1)} 
                                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                                >
                                    {index + 1}
                                </button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(jobs.length / 6)))} src={assets.right_arrow_icon} alt="" />
                        </a>
                    </div>
                )}
            </section>
        </div>
    )
}

export default JobListing