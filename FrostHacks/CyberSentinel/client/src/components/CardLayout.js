import React from 'react'

const CardLayout = ({img, title, subTitle, mini}) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow transform hover:-translate-y-5 transition duration-500 ease-in-out">
        <img className="p-8 rounded-t-lg" src={img} alt="scanner"/>
        <div className="px-5 pb-5">
            <span>
                <h5 className="text-xl text-center font-semibold tracking-tight text-gray-900">{title}</h5>
            </span>
            <div className="flex items-center mt-2.5 mb-5">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{mini}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">{subTitle}</span>
            </div>
        </div>
    </div>
  )
}

export default CardLayout
