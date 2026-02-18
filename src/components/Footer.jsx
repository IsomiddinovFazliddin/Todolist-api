import React from 'react'
import { VscDebugBreakpointData } from 'react-icons/vsc'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='border-t border-[#E9ECEF] py-5 z-30 p-5 bg-white'>
        <div className="container flex items-center justify-between mx-auto">
            <p className=" text-gray-500 text-[12px]">© 2026 TaskFlow. Built with React.</p>
            <div className='flex gap-3 items-center'>
                <Link className='text-[12px] text-gray-500'>Privecy</Link>
                <VscDebugBreakpointData className="text-gray-500 text-[12px]"/>
                <Link className='text-[12px] text-gray-500'>Terms</Link>
                <VscDebugBreakpointData className="text-gray-500 text-[12px]"/>
                <Link className='text-[12px] text-gray-500'>Help</Link>
            </div>
        </div>
    </div>
  )
}

export default Footer