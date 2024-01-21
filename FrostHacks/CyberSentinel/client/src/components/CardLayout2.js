import React from 'react'
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { AiFillGithub } from 'react-icons/ai'
import { TbWorld} from 'react-icons/tb'

const CardLayout2 = ({img, title, subTitle, l1, l2, l3, l4, l5}) => {
  return (
    <div>
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={img} alt=""/>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
                    <p className="mb-3 font-normal text-gray-700">{subTitle}</p>
                    <div className='flex justify-center gap-3 mt-2'>
                        <a 
                        href={l1}
                        target='_blank'
                        rel='noreferrer'
                        className='hover:text-red-800 duration-300 cursor-pointer text-xl'><FaLinkedinIn/>
                        </a>
                        <a 
                        href={l2}
                        target='_blank' 
                        rel='noreferrer'
                        className='hover:text-red-800 duration-300 cursor-pointer text-xl'><AiFillGithub/>
                        </a>
                        <a 
                        href={l3}
                        target='_blank'
                        rel='noreferrer'
                        className='hover:text-red-800 duration-300 cursor-pointer text-xl'><TbWorld/>
                        </a>
                        <a 
                        href={l4}
                        target='_blank'
                        rel='noreferrer'
                        className='hover:text-red-800 duration-300 cursor-pointer text-xl'><FaInstagram/>
                        </a>
                        <a 
                        href = {l5}
                        target='_blank'
                        rel='noreferrer'
                        className='hover:text-red-800 duration-300 cursor-pointer text-xl'><FiMail/>
                        </a>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CardLayout2
