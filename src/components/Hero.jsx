import React, { useRef, useState } from 'react'
import { assets } from '../assets/assets'

const jobs = [
  { id: 1, title: 'Frontend Developer', location: 'Bangalore', company: 'Amazon' },
  { id: 2, title: 'Backend Developer', location: 'Hyderabad', company: 'Microsoft' },
  { id: 3, title: 'Data Analyst', location: 'Delhi', company: 'Adobe' },
  { id: 4, title: 'React Developer', location: 'Bangalore', company: 'Walmart' },
  { id: 5, title: 'Full Stack Developer', location: 'Pune', company: 'Accenture' },
  { id: 6, title: 'Software Engineer', location: 'Chennai', company: 'TCS' },
  { id: 7, title: 'Java Developer', location: 'Hyderabad', company: 'Infosys' },
  { id: 8, title: 'Python Developer', location: 'Bangalore', company: 'Flipkart' },
  { id: 9, title: 'UI/UX Designer', location: 'Mumbai', company: 'Swiggy' },
  { id: 10, title: 'Data Scientist', location: 'Bangalore', company: 'IBM' },
  { id: 11, title: 'DevOps Engineer', location: 'Pune', company: 'Cisco' },
  { id: 12, title: 'Mobile App Developer', location: 'Noida', company: 'Paytm' },
  { id: 13, title: 'Cloud Engineer', location: 'Hyderabad', company: 'Oracle' },
  { id: 14, title: 'QA Engineer', location: 'Chennai', company: 'Capgemini' },
  { id: 15, title: 'Product Manager', location: 'Gurgaon', company: 'Google' },
  { id: 16, title: 'Business Analyst', location: 'Mumbai', company: 'Deloitte' },
  { id: 17, title: 'Machine Learning Engineer', location: 'Bangalore', company: 'NVIDIA' },
  { id: 18, title: 'Cyber Security Analyst', location: 'Pune', company: 'Wipro' },
  { id: 19, title: 'System Administrator', location: 'Kolkata', company: 'HCL' },
  { id: 20, title: 'Technical Support Engineer', location: 'Jaipur', company: 'Zoho' }
]
const Hero = () => {
  const titleRef = useRef(null)
  const locationRef = useRef(null)

  const [titleSuggestions, setTitleSuggestions] = useState([])
  const [locationSuggestions, setLocationSuggestions] = useState([])
  const [results, setResults] = useState([])

  const handleTitleChange = (e) => {
    const value = e.target.value
    if (!value) return setTitleSuggestions([])

    const filtered = [...new Set(
      jobs
        .map(job => job.title)
        .filter(title => title.toLowerCase().includes(value.toLowerCase()))
    )]

    setTitleSuggestions(filtered)
  }

  const handleLocationChange = (e) => {
    const value = e.target.value
    if (!value) return setLocationSuggestions([])

    const filtered = [...new Set(
      jobs
        .map(job => job.location)
        .filter(location => location.toLowerCase().includes(value.toLowerCase()))
    )]

    setLocationSuggestions(filtered)
  }

  const onSearch = () => {
    const title = titleRef.current.value.toLowerCase()
    const location = locationRef.current.value.toLowerCase()

    const filteredJobs = jobs.filter(job =>
      job.title.toLowerCase().includes(title) &&
      job.location.toLowerCase().includes(location)
    )

    setResults(filteredJobs)
    setTitleSuggestions([])
    setLocationSuggestions([])
  }

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      {/* HERO */}
      <div className='bg-gradient-to-r from-blue-800 to-blue-950 text-white py-16 text-center mx-2 rounded-xl'>
        <h2 className='text-3xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
        <p className='mb-8 max-w-xl mx-auto text-sm font-light'>
          Your Next Big Career Move Starts Right Here-Explore the Best Job Opportunities and Take the First Step Toward Your Future!
        </p>

        <div className='flex flex-col sm:flex-row items-center bg-white rounded text-gray-600 max-w-xl mx-auto px-2'>
          {/* Job title */}
          <div className='relative w-full'>
            <input
              type='text'
              placeholder='Search for jobs'
              ref={titleRef}
              onChange={handleTitleChange}
              className='p-2 outline-none w-full'
            />

            {titleSuggestions.length > 0 && (
              <ul className='absolute bg-white text-black w-full shadow-md rounded z-10'>
                {titleSuggestions.map((item, index) => (
                  <li
                    key={index}
                    className='px-3 py-2 hover:bg-blue-100 cursor-pointer'
                    onClick={() => {
                      titleRef.current.value = item
                      setTitleSuggestions([])
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Location */}
          <div className='relative w-full'>
            <input
              type='text'
              placeholder='Location'
              ref={locationRef}
              onChange={handleLocationChange}
              className='p-2 outline-none w-full'
            />

            {locationSuggestions.length > 0 && (
              <ul className='absolute bg-white text-black w-full shadow-md rounded z-10'>
                {locationSuggestions.map((item, index) => (
                  <li
                    key={index}
                    className='px-3 py-2 hover:bg-blue-100 cursor-pointer'
                    onClick={() => {
                      locationRef.current.value = item
                      setLocationSuggestions([])
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={onSearch}
            className='bg-blue-600 px-6 py-2 text-white rounded m-2'
          >
            Search
          </button>
        </div>
      </div>

      {/* RESULTS */}
      <div className='mt-10 grid gap-6'>
        {results.length === 0 && (
          <p className='text-center text-gray-500'>No jobs found</p>
        )}

        {results.map(job => (
          <div
            key={job.id}
            className='border p-5 rounded-md shadow-sm hover:shadow-md'
          >
            <h3 className='text-xl font-semibold'>{job.title}</h3>
            <p className='text-gray-600'>{job.company} — {job.location}</p>
          </div>
        ))}
      </div>

      <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
        <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
          <p className='font-medium'>Trusted by</p>
          <img className='h-6' src={assets.microsoft_logo} alt="" />
          <img className='h-6' src={assets.walmart_logo} alt="" />
          <img className='h-6' src={assets.accenture_logo} alt="" />
          <img className='h-6' src={assets.samsung_logo} alt="" />
          <img className='h-6' src={assets.amazon_logo} alt="" />
          <img className='h-6' src={assets.adobe_logo} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero