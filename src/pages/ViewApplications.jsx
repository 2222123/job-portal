import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext)
  const [applicants, setApplicants] = useState([
    {
      _id: 'app1',
      userId: {
        _id: 'user1',
        name: 'Rajesh Kumar',
        image: 'https://via.placeholder.com/40?text=RK',
        resume: 'https://example.com/resume1.pdf'
      },
      jobId: {
        _id: 'job1',
        title: 'Senior Full Stack Developer',
        location: 'Bangalore'
      },
      date: new Date('2024-03-25')
    },
    {
      _id: 'app2',
      userId: {
        _id: 'user2',
        name: 'Priya Sharma',
        image: 'https://via.placeholder.com/40?text=PS',
        resume: 'https://example.com/resume2.pdf'
      },
      jobId: {
        _id: 'job2',
        title: 'Junior Data Scientist',
        location: 'Washington'
      },
      date: new Date('2024-03-24')
    },
    {
      _id: 'app3',
      userId: {
        _id: 'user3',
        name: 'Amit Patel',
        image: 'https://via.placeholder.com/40?text=AP',
        resume: 'https://example.com/resume3.pdf'
      },
      jobId: {
        _id: 'job3',
        title: 'Graphic Designer',
        location: 'Hyderabad'
      },
      date: new Date('2024-03-23')
    },
    {
      _id: 'app4',
      userId: {
        _id: 'user4',
        name: 'Sneha Desai',
        image: 'https://via.placeholder.com/40?text=SD',
        resume: 'https://example.com/resume4.pdf'
      },
      jobId: {
        _id: 'job1',
        title: 'Senior Full Stack Developer',
        location: 'Bangalore'
      },
      date: new Date('2024-03-22')
    }
  ])
  const [loading, setLoading] = useState(false)

  const fetchCompanyApplicants = async () => {
    try {
      if (!companyToken) {
        console.log('⚠️ No company token found, showing temporary applications')
        return
      }

      console.log('🔍 Fetching real applications...')
      const { data } = await axios.get(backendUrl + '/api/company/applicants', { 
        headers: { token: companyToken } 
      })
      
      if (data.success && data.applications && data.applications.length > 0) {
        setApplicants(data.applications.reverse())
        console.log('✔️ Real applications loaded. Count:', data.applications.length)
      } else {
        console.log('⚠️ No real applications found, keeping temporary data')
      }
    } catch (error) {
      console.error('⚠️ Error fetching applications, keeping temporary data:', error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyApplicants()
    }
  }, [companyToken])

  return (
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