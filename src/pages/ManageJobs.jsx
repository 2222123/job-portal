import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ManageJobs = () => {
  const { backendUrl, companyToken } = useContext(AppContext)
  const [jobs, setJobs] = useState([])

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/list-jobs', { 
        headers: { token: companyToken } 
      })
      if (data.success) {
        setJobs(data.jobs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs()
    }
  }, [companyToken])

  return (
    <div className='p-4'>
      <div className='bg-white border rounded shadow-sm overflow-x-auto'>
        <table className='min-w-full'>
          <thead className='bg-gray-50 border-b'>
            <tr>
              <th className='p-3 text-left'>#</th>
              <th className='p-3 text-left'>Job Title</th>
              <th className='p-3 text-left'>Date</th>
              <th className='p-3 text-left'>Location</th>
              <th className='p-3 text-center'>Applicants</th>
            </tr>
          </thead>
          <tbody>
            {/* Array empty ga unna error rakunda map chesthunnam */}
            {jobs && jobs.length > 0 ? [...jobs].reverse().map((job, index) => (
              <tr key={index} className='border-b hover:bg-gray-50'>
                <td className='p-3'>{index + 1}</td>
                <td className='p-3 font-semibold'>{job.title}</td>
                <td className='p-3 text-gray-500'>{new Date(job.date).toLocaleDateString()}</td>
                <td className='p-3'>{job.location}</td>
                <td className='p-3 text-center'>{job.applicants || 0}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No jobs found. Click "Add new job" to post!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageJobs