import React from 'react'
import build1 from "../assets/images/build1.jpg"
import build2 from "../assets/images/build2.webp"

const About = () => {
  return (
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="font-light text-white sm:text-lg ">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">What We Do:</h2>
                <p>At SecureScan, we are cybersecurity 
                experts dedicated to safeguarding your digital world. Our mission is to empower individuals and businesses with advanced security 
                solutions, ensuring they stay one step ahead of cyber threats.We provide comprehensive vulnerability assessments and penetration 
                testing services. With a team of certified professionals, cutting-edge tools, and a focus on data privacy, we deliver timely and 
                actionable reports to fortify your defenses.</p>
                <p>Our vision is to create a cyber-resilient world, offering customized solutions that prioritize your security needs. Protect your 
                digital assets with SecureScan's expertise and embark on a safer digital journey today. Your security is our top priority!
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <img className="w-full rounded-lg" src={build1} alt="office content 1"/>
                <img className="mt-4 w-full lg:mt-10 rounded-lg" src={build2} alt="office content 2"/>
            </div>
        </div>    
  )
}

export default About
