import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext)
  const [applicants, setApplicants] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchCompanyApplicants = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants', { 
        headers: { token: companyToken } 
      })
      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyApplicants()
    }
  }, [companyToken])

  return loading ? <Loading /> : (
    <div className='container mx-auto p-4'>
      {applicants && applicants.length > 0 ? (
        <div>
          <table className='w-full max-w-4xl bg-white border border-gray-200'>
            <thead>
              <tr className='border-b text-left text-gray-700'>
                <th className='py-2 px-4 border-b'>#</th>
                <th className='py-2 px-4 border-b'>User Name</th>
                <th className='py-2 px-4 border-b'>Job Title</th>
                <th className='py-2 px-4 border-b'>Location</th>
                <th className='py-2 px-4 border-b'>Resume</th>
                <th className='py-2 px-4 border-b'>Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((item, index) => (
                <tr key={index} className='text-gray-700 border-b'>
                  <td className='py-2 px-4'>{index + 1}</td>
                  <td className='py-2 px-4 flex items-center gap-2'>
                    <img className='w-10 h-10 rounded-full' src={item.userId.image} alt="" />
                    <span>{item.userId.name}</span>
                  </td>
                  <td className='py-2 px-4'>{item.jobId.title}</td>
                  <td className='py-2 px-4'>{item.jobId.location}</td>
                  <td className='py-2 px-4'>
                    <a href={item.userId.resume} target='_blank' rel="noreferrer" className='text-blue-500 underline'>Resume</a>
                  </td>
                  <td className='py-2 px-4'>Pending</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='flex items-center justify-center h-[70vh]'>
          <p className='text-xl font-medium text-gray-500'>No Applications Found</p>
        </div>
      )}
    </div>
  )
}
export default ViewApplications