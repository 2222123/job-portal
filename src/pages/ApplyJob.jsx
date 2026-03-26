import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import JobCard from '../components/JobCard'
import { assets } from '../assets/assets'
import kconvert from 'k-convert'
import moment from 'moment'
import axios from 'axios'
import { toast } from 'react-toastify'

const ApplyJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [JobData, setJobData] = useState(null)
  const { jobs, backendUrl, userData, userToken } = useContext(AppContext)

  const fetchJob = async () => {
    const data = jobs.filter(job => job._id === id)
    if (data.length > 0) {
      setJobData(data[0])
    }
  }

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Login to apply for jobs')
      }
      const { data } = await axios.post(backendUrl + '/api/users/apply', { jobId: id }, { headers: { token: userToken } })
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob()
    }
  }, [id, jobs])

  return JobData ? (
    <>
      <Navbar />
      <div className='container px-4 2xl:px-20 mx-auto py-10'>
        <div className='flex flex-col lg:flex-row justify-between items-start gap-10'>
          <div className='w-full lg:w-3/4'>
            {/* Job Header */}
            <div className='bg-sky-50 border border-sky-400 rounded-xl p-8 mb-8 flex justify-between items-center flex-wrap gap-4'>
              <div className='flex items-center gap-4'>
                <img className='h-20 bg-white p-3 rounded-lg border' src={JobData.companyId.image} alt="" />
                <div>
                  <h1 className='text-2xl font-semibold'>{JobData.title}</h1>
                  <div className='flex gap-4 text-gray-600 text-sm mt-1'>
                    <span className='flex items-center gap-1'><img src={assets.suitcases_icon} alt="" /> {JobData.companyId.name}</span>
                    <span className='flex items-center gap-1'><img src={assets.location_icon} alt="" /> {JobData.location}</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-end gap-2'>
                <button onClick={applyHandler} className='bg-blue-600 text-white px-10 py-2.5 rounded'>Apply Now</button>
                <p className='text-gray-500 text-sm'>Posted {moment(JobData.date).fromNow()}</p>
              </div>
            </div>
            {/* Description */}
            <div className='rich-text' dangerouslySetInnerHTML={{ __html: JobData.description }}></div>
          </div>

          {/* Similar Jobs Sidebar */}
          <div className='w-full lg:w-1/4'>
            <h2 className='text-xl font-semibold mb-4'>More jobs from {JobData.companyId.name}</h2>
            <div className='flex flex-col gap-4'>
              {jobs.filter(job => job._id !== id && job.companyId._id === JobData.companyId._id).slice(0, 3).map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : <Loading />
}
export default ApplyJob