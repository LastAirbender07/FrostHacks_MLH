import React, { useState } from 'react';
import Request from './components/Request';
import Header from './components/Header';
import Footer from './components/Footer';
import scan from "./assets/images/scanner.png" 
import sqlInj from "./assets/images/sql.png" 
import nik from "./assets/images/nikto.png"
import cveId from "./assets/images/cve.webp" 
import xssimg from "./assets/images/xss.jpg"
import py from "./assets/images/python.webp"
import csrfimg from "./assets/images/csrf.jpg"
import cppimg from "./assets/images/cpplogo.webp"
import java from "./assets/images/java.jpg"
import CardLayout from "./components/CardLayout";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import URL from './components/URL';
import ChatBot from './components/ChatBot';
import Nikto from './components/Nikto';
import Request2 from './components/Request2';
import URL2 from './components/URL2';
import URL3 from './components/URL3';

function App() {
  const [scanner, setScanner] = useState(false);
  const [sql, setSql] = useState(false);
  const [cve, setCve] = useState(false);
  const [python, setPython] = useState(false);
  const [xss, setXss] = useState(false);
  const [csrf, setCsrf] = useState(false);
  const [cpp, setCpp] = useState(false);
  const [nikto, setNikto] = useState(false);
  const [spotB, setSpotB] = useState(false);

  return (
    <div className="w-full h-screen font-bodyfont text-black relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-scroll">
      <Header title="Susceptability Scanner"/>
      <Home/>
      <div className='flex items-center justify-center h-screen gap-7'>
        <div className="grid grid-row-2 gap-2">
            <CardLayout img={sqlInj} title="SQL Injection Scanner" subTitle="$Free" mini="web"/> 
            <div
            onClick={ () =>
                setScanner(false)&
                setSql(true)&
                setCve(false)
                } 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Check
            </div>
        </div>
        <div className="grid grid-row-2 gap-2">
            <CardLayout img={scan} title="Secure Scanner" subTitle="$Free" mini="file | url"/> 
            <div
            onClick={ () =>
                setScanner(true)&
                setSql(false)&
                setCve(false)
                } 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Scan
            </div>
        </div>
        <div className="grid grid-row-2 gap-2">
            <CardLayout img={cveId} title="Find info using CVE Id" subTitle="$Free" mini="database"/> 
            <div
            onClick={ () =>
                setScanner(false)&
                setSql(false)&
                setCve(true)
                } 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Discover
            </div>
        </div>
      </div>
      <div className="w-full-h-screen">
        { scanner && 
            <div className='grid grid-rows-2 gap-4'>
            <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
              <Request webHeader = "scan-file" text="Scan dll/exe files"/>
            </div>
            <div className="w-full h-full mx-auto flex justify-center items-center">
              <URL webHeader = "scan-url" text="URL Scanner"/>
            </div>
          </div>
          }
          {
            sql && <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
              <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
                <URL webHeader = "sql-injection-scan" text="SQL Injection Scanner"/>
              </div>
            </div>
          }
          {
            cve && <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
              <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
                <URL webHeader = "cve-tracker" text="Get CVE ID information"/>
              </div>
            </div>
          }    
      </div>
      <div className='flex items-center justify-center h-screen gap-7'>
        <div className="grid grid-row-2 gap-2">
            <CardLayout img={xssimg} title="XSS Scanner" subTitle="$Free" mini="web"/> 
            <div
            onClick={ () =>
                setNikto(false)&
                setXss(true)&
                setCsrf(false)
                } 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Check
            </div>
        </div>
        <div className="grid grid-row-2 gap-2">
            <CardLayout img={nik} title="Nikto Scanner" subTitle="$Free" mini="web | url"/> 
            <div
            onClick={ () =>
                setXss(false)&
                setCsrf(false)&
                setNikto(true)
                } 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Check
            </div>
        </div>
        <div className="grid grid-row-2 gap-2">
            <CardLayout img={csrfimg} title="CSRF scanner" subTitle="$Free" mini="web"/> 
            <div
            onClick={ () =>
                setNikto(false)&
                setXss(false)&
                setCsrf(true)
                } 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Check
            </div>
        </div>
      </div>
      <div className="w-full-h-screen">
          {
            nikto && 
            <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
              <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
                <Nikto webHeader = "nikto-scan" text="Nikto Scanner"/>
              </div>
            </div>
          }   
          {
            xss && <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
              <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
                <URL3 webHeader = "scan-xss" text="XSS Scanner"/>
              </div>
            </div>
          }
          {
            csrf && <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
            <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
              <URL2 webHeader = "csrf-scan" text="CSRF Scanner"/>
            </div>
          </div>
          }      
      </div>

      <div className='flex items-center justify-center h-screen gap-7'>
        <div className="grid grid-row-2 gap-2">
            <CardLayout img={java} title="Java Scanner" subTitle="$Free" mini="file | java"/> 
            <div
            onClick={ () =>
                setCpp(false)&
                setSpotB(true)&
                setPython(false)
                } 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Check
            </div>
        </div>
        <div className="grid grid-row-2 gap-2">
            <CardLayout img={py} title="Python Scanner" subTitle="$Free" mini="file | .py"/> 
            <div
            onClick={ () =>
                setPython(true)&
                setCpp(false)&
                setSpotB(false)
                } 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Scan
            </div>
        </div>
        <div className="grid grid-row-2 gap-2">
            <CardLayout img={cppimg} title="Cpp Check" subTitle="$Free" mini=".c | .cpp"/> 
            <div
            onClick={ () =>
                setCpp(true)&
                setSpotB(false)&
                setPython(false)
                } 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Scan
            </div>
        </div>

      </div>
      <div className="w-full-h-screen">
          {
            cpp && <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
              <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
                <Request2 webHeader = "analyze-code2" text="C/C++ file scanner"/>
              </div>
            </div>
          }
          {
            spotB && <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
              <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
                <Request2 webHeader = "analyze-code3" text="Java Scanner"/>
              </div>
            </div>
          }
          {
            python && <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
              <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
                <Request webHeader = "analyze-code1" text="Get python file scanner"/>
              </div>
            </div>
          }
      </div>

      <br/>
      <About/>
      <br/>
      <div className="w-full-h-screen">
        <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
          <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
            <ChatBot/>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <Contact/>
      <Footer/>
    </div>
    );
}

export default App;