import React from 'react'
import jay from "../assets/images/jay.jpg"
import nav from "../assets/images/nav.jpeg"
import kural from "../assets/images/kural.jpeg"
import robot from "../assets/images/robot2.svg"
import CardLayout2 from './CardLayout2'

const Contact = () => {
  return (
    <div className="mx-auto max-w-7xl">
        <h2 className="mx-8 mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Contact Us:</h2>
      <section
        className="widescreen:section-min-height tallscreen:section-min-height mb-12 flex scroll-mt-40 flex-col-reverse items-center justify-center gap-8 p-6 sm:flex-row">
        <img className="w-1/2" src={robot} alt="cyber" />
        <article className="sm:w-1/2">
            <div className="grid grid-rows-3 gap-4">
                <CardLayout2 
                img = {jay}
                title="Jayaraj Viswanathan"
                subTitle = "Full Stack Developer | CyberSecurity Enthusiast | Competitive Programmer"
                l1="https://www.linkedin.com/in/jayaraj-viswanathan-a7634b222/"
                l2="https://github.com/LastAirbender07/"
                l3="https://jayaraj-portfolio.netlify.app/"
                l4="https://www.instagram.com/jayaraj_07/"
                l5="mailto: jayarajviswanathan@gmail.com"
                />
                <CardLayout2 
                img = {nav}
                title="S Navaneethan"
                subTitle = "Android App Developer | Gamer | Front end Developer"
                l1="https://www.linkedin.com/in/navaneethan-s-314644237/"
                l2="https://github.com/NAVANEETHAN22"
                l3=""
                l4=""
                l5=""
                />
                <CardLayout2 
                img = {kural}
                title="E Kuralamudhan"
                subTitle = "Cloud Engineer | Ethical Hacker | ML"
                l1=""
                l2="https://github.com/kuralez"
                l3=""
                l4=""
                l5=""
                />
            </div>
        </article>
      </section>
      </div>
  )
}

export default Contact