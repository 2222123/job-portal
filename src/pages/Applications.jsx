import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import moment from 'moment'
import { AppContext } from '../context/AppContext'

const Applications = () => {
  const { userApplications } = useContext(AppContext)

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
            {/* userApplications undha ledha ani check chestunnam */}
            {userApplications && userApplications.length > 0 ? (
              userApplications.map((job, index) => (
                <tr key={index} className='border-b'>
                  <td className='py-3 px-4 flex items-center gap-2'>
                    <img className='w-8 h-8' src={job.companyId.image} alt="" />
                    {job.companyId.name}
                  </td>
                  <td className='py-2 px-4'>{job.jobId.title}</td>
                  <td className='py-2 px-4'>{job.jobId.location}</td>
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