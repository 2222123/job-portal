import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job, isApplied = false }) => {
  const navigate = useNavigate()

  // Function to determine color scheme and icon based on job title/category
  const getJobStyle = () => {
    const title = job.title?.toLowerCase() || ''
    const category = job.category?.toLowerCase() || ''
    
    if (title.includes('senior') && title.includes('full stack')) {
      return {
        borderColor: 'from-violet-500 to-purple-600',
        textColor: 'text-violet-600',
        bgColor: 'from-violet-500 to-purple-600',
        borderGradient: 'from-violet-600 to-purple-400',
        hoverColor: 'hover:text-violet-600',
        icon: assets.fullstack_senior_icon
      }
    } else if (title.includes('backend') || (title.includes('developer') && title.includes('node'))) {
      return {
        borderColor: 'from-emerald-500 to-green-600',
        textColor: 'text-emerald-600',
        bgColor: 'from-emerald-500 to-green-600',
        borderGradient: 'from-emerald-600 to-green-400',
        hoverColor: 'hover:text-emerald-600',
        icon: assets.backend_engineer_icon
      }
    } else if (title.includes('frontend') && !title.includes('junior')) {
      return {
        borderColor: 'from-cyan-500 to-teal-600',
        textColor: 'text-cyan-600',
        bgColor: 'from-cyan-500 to-teal-600',
        borderGradient: 'from-cyan-600 to-teal-400',
        hoverColor: 'hover:text-cyan-600',
        icon: assets.frontend_developer_icon
      }
    } else if (title.includes('database') || title.includes('dba') || title.includes('database admin')) {
      return {
        borderColor: 'from-green-500 to-emerald-600',
        textColor: 'text-green-600',
        bgColor: 'from-green-500 to-emerald-600',
        borderGradient: 'from-green-600 to-emerald-400',
        hoverColor: 'hover:text-green-600',
        icon: assets.database_admin_icon
      }
    } else if (title.includes('junior frontend') || (title.includes('frontend') && title.includes('junior'))) {
      return {
        borderColor: 'from-sky-500 to-blue-600',
        textColor: 'text-sky-600',
        bgColor: 'from-sky-500 to-blue-600',
        borderGradient: 'from-sky-600 to-blue-400',
        hoverColor: 'hover:text-sky-600',
        icon: assets.junior_frontend_icon
      }
    } else if (category.includes('data') && title.includes('scientist')) {
      return {
        borderColor: 'from-amber-500 to-yellow-600',
        textColor: 'text-amber-600',
        bgColor: 'from-amber-500 to-yellow-600',
        borderGradient: 'from-amber-600 to-yellow-400',
        hoverColor: 'hover:text-amber-600',
        icon: assets.data_scientist_icon
      }
    } else if (title.includes('devops') || title.includes('dev ops')) {
      return {
        borderColor: 'from-rose-500 to-pink-600',
        textColor: 'text-rose-600',
        bgColor: 'from-rose-500 to-pink-600',
        borderGradient: 'from-rose-600 to-pink-400',
        hoverColor: 'hover:text-rose-600',
        icon: assets.devops_icon
      }
    } else if (title.includes('architect') || title.includes('solutions')) {
      return {
        borderColor: 'from-indigo-500 to-purple-600',
        textColor: 'text-indigo-600',
        bgColor: 'from-indigo-500 to-purple-600',
        borderGradient: 'from-indigo-600 to-purple-400',
        hoverColor: 'hover:text-indigo-600',
        icon: assets.architect_icon
      }
    } else if (title.includes('designer') || category.includes('design') && !title.includes('architect')) {
      if (title.includes('ui') || title.includes('ux')) {
        return {
          borderColor: 'from-pink-500 to-rose-600',
          textColor: 'text-pink-600',
          bgColor: 'from-pink-500 to-rose-600',
          borderGradient: 'from-pink-600 to-rose-400',
          hoverColor: 'hover:text-pink-600',
          icon: assets.designer_icon
        }
      } else {
        return {
          borderColor: 'from-purple-500 to-indigo-600',
          textColor: 'text-purple-600',
          bgColor: 'from-purple-500 to-indigo-600',
          borderGradient: 'from-purple-600 to-indigo-400',
          hoverColor: 'hover:text-purple-600',
          icon: assets.designing_icon
        }
      }
    } else if (category.includes('programming') || title.includes('developer')) {
      return {
        borderColor: 'from-blue-500 to-cyan-600',
        textColor: 'text-blue-600',
        bgColor: 'from-blue-500 to-cyan-600',
        borderGradient: 'from-blue-600 to-cyan-400',
        hoverColor: 'hover:text-blue-600',
        icon: null
      }
    } else if (category.includes('data') || title.includes('data')) {
      return {
        borderColor: 'from-orange-500 to-red-600',
        textColor: 'text-orange-600',
        bgColor: 'from-orange-500 to-red-600',
        borderGradient: 'from-orange-600 to-red-400',
        hoverColor: 'hover:text-orange-600',
        icon: null
      }
    } else if (category.includes('marketing') || title.includes('marketing')) {
      return {
        borderColor: 'from-green-500 to-teal-600',
        textColor: 'text-green-600',
        bgColor: 'from-green-500 to-teal-600',
        borderGradient: 'from-green-600 to-teal-400',
        hoverColor: 'hover:text-green-600',
        icon: null
      }
    } else if (category.includes('networking') || title.includes('network')) {
      return {
        borderColor: 'from-cyan-500 to-blue-600',
        textColor: 'text-cyan-600',
        bgColor: 'from-cyan-500 to-blue-600',
        borderGradient: 'from-cyan-600 to-blue-400',
        hoverColor: 'hover:text-cyan-600',
        icon: assets.networking_icon
      }
    } else if (category.includes('management') || title.includes('manager') || title.includes('lead')) {
      return {
        borderColor: 'from-amber-500 to-orange-600',
        textColor: 'text-amber-600',
        bgColor: 'from-amber-500 to-orange-600',
        borderGradient: 'from-amber-600 to-orange-400',
        hoverColor: 'hover:text-amber-600',
        icon: assets.management_icon
      }
    } else if (category.includes('cybersecurity') || title.includes('security') || title.includes('cybersecurity')) {
      return {
        borderColor: 'from-red-500 to-rose-600',
        textColor: 'text-red-600',
        bgColor: 'from-red-500 to-rose-600',
        borderGradient: 'from-red-600 to-rose-400',
        hoverColor: 'hover:text-red-600',
        icon: assets.cybersecurity_icon
      }
    } else {
      return {
        borderColor: 'from-blue-500 to-blue-600',
        textColor: 'text-blue-600',
        bgColor: 'from-blue-500 to-blue-600',
        borderGradient: 'from-blue-600 to-blue-400',
        hoverColor: 'hover:text-blue-600',
        icon: null
      }
    }
  }

  const style = getJobStyle()
  const customLogo = style.icon

  return (
    <div className='group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'>
      {/* Gradient Top Border */}
      <div className={`h-1 bg-gradient-to-r ${style.borderGradient}`}></div>

      <div className='p-6'>
        {/* Header Section with Logo and Company Info */}
        <div className='flex items-center gap-4 mb-6 pb-4 border-b border-gray-100'>
          {/* Company/Job Logo */}
          <div className='relative'>
            <div className={`w-14 h-14 bg-gradient-to-br ${style.bgColor} rounded-xl flex items-center justify-center border-2 border-opacity-30 shadow-lg group-hover:scale-110 transition duration-300`}>
              <img 
                className='h-10 w-10 object-contain' 
                src={customLogo || job?.companyId?.image || assets.default_company_logo} 
                alt="Logo" 
                onError={(e) => {e.target.src = assets.default_company_logo}}
              />
            </div>
          </div>

          {/* Company Info */}
          <div className='flex-1'>
            <p className={`text-xs font-semibold ${style.textColor} uppercase tracking-wider`}>🎯 Insider Jobs</p>
            <p className='font-bold text-gray-900 text-sm line-clamp-1'>{job?.companyId?.name || 'Company'}</p>
            <p className='text-xs text-gray-400 mt-1'>Updated recently</p>
          </div>
        </div>

        {/* Job Title */}
        <h3 className={`font-bold text-xl text-gray-900 mb-3 line-clamp-2 ${style.hoverColor} transition`}>{job.title}</h3>

        {/* Job Details with Icons */}
        <div className='space-y-3 mb-4'>
          {/* Location */}
          <div className='flex items-center gap-2'>
            <img src={assets.location_icon} alt="Location" className='w-4 h-4 text-gray-500' />
            <span className='text-sm text-gray-700 font-medium'>{job.location}</span>
          </div>

          {/* Level */}
          <div className='flex items-center gap-2'>
            <img src={assets.suitcase_icon} alt="Level" className='w-4 h-4 text-gray-500' />
            <span className='text-sm text-gray-700 font-medium'>{job.level}</span>
          </div>

          {/* Salary */}
          <div className='flex items-center gap-2'>
            <img src={assets.money_icon} alt="Salary" className='w-4 h-4 text-gray-500' />
            <span className='text-sm font-bold text-green-600'>₹{job.salary?.toLocaleString() || 'N/A'}</span>
          </div>
        </div>

        {/* Required Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className='mb-4 pb-4 border-b border-gray-100'>
            <p className='text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider'>Required Skills</p>
            <div className='flex flex-wrap gap-2'>
              {job.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className='bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium'>
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium'>
                  +{job.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Badge Pills */}
        <div className='flex flex-wrap gap-2 mb-5 pb-4 border-b border-gray-100'>
          <span className={`bg-gradient-to-r ${style.bgColor} bg-opacity-10 text-opacity-100 px-3 py-1.5 rounded-full text-xs font-semibold border border-opacity-20`} style={{color: style.textColor.replace('text-', '')}}>📍 {job.location}</span>
          <span className={`bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-full text-xs font-semibold`}>💼 {job.level}</span>
          {isApplied ? (
            <span className={`bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 px-3 py-1.5 rounded-full text-xs font-semibold`}>✅ Applied</span>
          ) : (
            <span className={`bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 px-3 py-1.5 rounded-full text-xs font-semibold`}>✨ Hot Opportunity</span>
          )}
        </div>

        {/* Job Description */}
        <p className='text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 120) }}></p>

        {/* Action Buttons */}
        <div className='grid grid-cols-2 gap-3'>
          <button 
            onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} 
            className={`${isApplied ? 'bg-indigo-500 hover:bg-indigo-600' : `bg-gradient-to-r ${style.bgColor}`} text-white px-4 py-2.5 rounded-lg font-bold shadow-md hover:shadow-lg transition duration-300 text-sm`}
          >
            {isApplied ? '✅ Already Applied' : 'Apply Now'}
          </button>
          <button 
            onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} 
            className={`${style.textColor} border-2 px-4 py-2.5 rounded-lg font-bold hover:bg-opacity-5 transition duration-300 text-sm`}
            style={{borderColor: style.textColor.replace('text-', '')}}
          >
            View Details
          </button>
        </div>
      </div>

      {/* Hover Effect Badge */}
      <div className='absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition duration-300'>
        NEW
      </div>
    </div>
  )
}

export default JobCard