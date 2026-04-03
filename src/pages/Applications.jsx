import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import moment from 'moment'
import { AppContext } from '../context/AppContext'
import { UserAuthContext } from '../context/UserAuthContext'
import { useUser, useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Applications = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([
    {
      _id: 'app1',
      companyId: {
        _id: 'comp1',
        name: 'Tech Solutions Inc',
        image: 'https://via.placeholder.com/40?text=TSI'
      },
      jobId: {
        _id: 'job1',
        title: 'Senior Full Stack Developer',
        location: 'Bangalore'
      },
      date: new Date('2024-03-28'),
      status: 'Pending'
    },
    {
      _id: 'app2',
      companyId: {
        _id: 'comp2',
        name: 'Digital Innovators',
        image: 'https://via.placeholder.com/40?text=DI'
      },
      jobId: {
        _id: 'job2',
        title: 'Junior Data Scientist',
        location: 'Washington'
      },
      date: new Date('2024-03-28'),
      status: 'Pending'
    }
  ])
  const [loading, setLoading] = useState(false)
  const { backendUrl } = useContext(AppContext)
  const { user: clerkUser } = useUser()
  const { getToken } = useAuth()
  const { user: traditionalUser, userToken } = useContext(UserAuthContext)

  const fetchApplications = useCallback(async () => {
    try {
      let token = null;
      let userId = null;

      // Check for traditional auth first
      if (traditionalUser && userToken) {
        token = userToken;
        userId = traditionalUser._id;
      }
      // Check for Clerk auth
      else if (clerkUser) {
        token = await getToken();
        userId = clerkUser.id;
      }

      if (!token || !userId) {
        console.log('⚠️ No auth found, showing temporary applications')
        return
      }

      console.log('🔍 Fetching real applications...')

      const { data } = await axios.get(
        backendUrl + '/api/users/applications',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (data.success && data.applications && data.applications.length > 0) {
        console.log('✔️ Real applications loaded. Count:', data.applications.length)
        console.log('Application statuses:', data.applications.map(app => app.status))
        setApplications(data.applications)
      } else {
        console.log('⚠️ No real applications found, keeping temporary data')
      }
    } catch (error) {
      console.error('⚠️ Error fetching applications:', error.message)
      console.log('Keeping temporary data as fallback')
    }
  }, [traditionalUser, userToken, clerkUser, backendUrl, getToken])

  useEffect(() => {
    if ((traditionalUser && userToken) || clerkUser) {
      fetchApplications()
    }
  }, [traditionalUser, userToken, clerkUser, fetchApplications])

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Applied Jobs</h2>
        
        <table className='min-w-full bg-white border rounded-lg mt-4'>
            <thead>
              <tr className='border-b text-left text-gray-700'>
                <th className='py-2 px-4'>Company</th>
                <th className='py-2 px-4'>Job Title</th>
                <th className='py-2 px-4'>Location</th>
                <th className='py-2 px-4'>Date</th>
                <th className='py-2 px-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications && applications.length > 0 ? (
                applications.map((job, index) => (
                  <tr key={index} className='border-b'>
                    <td className='py-3 px-4 flex items-center gap-2'>
                      <div className='w-8 h-8 rounded bg-gray-100 flex items-center justify-center overflow-hidden'>
                        <img 
                          className='w-8 h-8 rounded object-cover' 
                          src={job.companyId?.image && job.companyId.image !== 'placeholder' ? job.companyId.image : assets.company_icon} 
                          alt={job.companyId?.name || 'Company'} 
                          onError={(e) => { e.target.onerror = null; e.target.src = assets.company_icon; }}
                        />
                      </div>
                      <span className='font-medium'>{job.companyId?.name || 'N/A'}</span>
                    </td>
                    <td className='py-2 px-4'>{job.jobId?.title || 'N/A'}</td>
                    <td className='py-2 px-4'>{job.jobId?.location || 'N/A'}</td>
                    <td className='py-2 px-4'>{moment(job.date).format('ll')}</td>
                    <td className='py-2 px-4'>
                      <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='5' className='text-center py-10 text-gray-500'>No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    </>
  )
}

export default Applications
