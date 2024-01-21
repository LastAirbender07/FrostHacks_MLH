import React from 'react'
import security from "../assets/images/sec.png"

const Home = () => {
  return (
      <div className="mx-auto max-w-7xl">
      <section
        id="hero"
        className="widescreen:section-min-height tallscreen:section-min-height mb-12 flex scroll-mt-40 flex-col-reverse items-center justify-center gap-8 p-6 sm:flex-row">
        <article className="sm:w-1/2">
          <h2 className="max-w-md text-center text-4xl font-bold text-slate-900 dark:text-white sm:text-left sm:text-5xl">
          Discover, Secure, Prevail: 
            <span className="dark-text-indigo-300 text-purple-200"> Empowering Your Digital Fortress</span>
          </h2>
          <p className="mt-4 max-w-md text-center text-2xl text-slate-900 sm:text-left">
          Unleashing the Power of Security to Safeguard Your Digital Journey
          </p>
          <p className="mt-4 max-w-md text-center text-2xl text-slate-800 dark:text-slate-400 sm:text-left">
            Cyber Vigilance for a Safer Digital Tomorrow.
          </p>
        </article>
        <img className="w-1/2" src={security} alt="Rocket Dab" />
      </section>
      </div>
  )
}

export default Home
