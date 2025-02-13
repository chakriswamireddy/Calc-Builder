import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router';

function Header() {

    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
    const loc = useLocation();


    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
        
        window.dispatchEvent(new Event('themeChange'));



    }, [darkMode])

    return (
        <div className='flex items-center justify-between pb-2 w-[100%] mx-auto pt-4 shadow-2xl  bg-gray-300 dark:bg-gray-900'>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
	<path fill="currentColor" d="M30.04 4.61c0-1.102-.938-2.04-2.04-2.04s-2.039.938-2.039 2.04v4.92c0 1.102.938 2.04 2.04 2.04c1.1 0 2.038-.938 2.038-2.04Zm9.538 8.929c-.773.797-.773 2.11 0 2.883c.797.797 2.086.82 2.906 0l3.493-3.492a2.065 2.065 0 0 0 0-2.907c-.774-.773-2.086-.773-2.883 0Zm-26.062 2.883c.773.797 2.086.797 2.882 0c.774-.75.774-2.11.024-2.883l-3.492-3.516c-.75-.75-2.086-.773-2.883 0c-.774.774-.774 2.11-.024 2.883ZM28 16.047c-6.539 0-11.953 5.414-11.953 11.953S21.46 39.977 28 39.977c6.516 0 11.93-5.438 11.93-11.977S34.516 16.047 28 16.047m23.32 13.992c1.102 0 2.04-.937 2.04-2.039s-.938-2.04-2.04-2.04h-4.898c-1.102 0-2.04.938-2.04 2.04s.938 2.039 2.04 2.039ZM4.68 25.961c-1.102 0-2.04.937-2.04 2.039s.938 2.039 2.04 2.039h4.898c1.102 0 2.04-.937 2.04-2.039s-.938-2.04-2.04-2.04ZM42.46 39.6a2.08 2.08 0 0 0-2.883 0c-.773.774-.773 2.087 0 2.883L43.094 46c.797.773 2.11.75 2.883-.023c.797-.774.797-2.086 0-2.883Zm-32.437 3.47c-.797.773-.797 2.109-.024 2.882c.774.774 2.11.797 2.906.024l3.492-3.493c.774-.773.774-2.086.024-2.882c-.774-.774-2.11-.774-2.906 0Zm20.015 3.398c0-1.102-.937-2.04-2.039-2.04s-2.039.938-2.039 2.04v4.922c0 1.101.938 2.039 2.04 2.039c1.1 0 2.038-.938 2.038-2.04Z" />
</svg> */}

            <div>
                 
                <h2 className='font-bold trailing-1.5 text-amber-800 text-2xl ml-5'> Calculator Builder </h2>
            </div>

            <Link to={loc.pathname == '/' ? '/build' : '/'} className=''>
                <button className='flex gap-2 text-amber-500 hover:text-amber-100 hover:bg-amber-500  bg-amber-200 shadow-2xl font-semibold px-4 py-2 rounded-2xl'>
                    {loc.pathname === '/' ? "Build it" : 'Edit it'}
                    {
                        loc.pathname == '/'
                            ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m15.5 16.9l1.4-1.4q.15-.15.15-.35t-.15-.35l-3.4-3.425q.1-.275.15-.55t.05-.625q0-1.425-1.012-2.437T10.25 6.75q-.425 0-.85.113t-.825.312l2.35 2.35l-1.4 1.4l-2.35-2.35q-.2.4-.312.825t-.113.85q0 1.425 1.013 2.438T10.2 13.7q.325 0 .613-.05t.562-.15l3.425 3.4q.15.15.35.15t.35-.15M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
                            </svg>
                            :

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<path fill="currentColor" d="M18 2h-2v2h-2v2h-2v2h-2v2H8v2H6v2H4v2H2v6h6v-2h2v-2h2v-2h2v-2h2v-2h2v-2h2V8h2V6h-2V4h-2zm0 8h-2v2h-2v2h-2v2h-2v2H8v-2H6v-2h2v-2h2v-2h2V8h2V6h2v2h2zM6 16H4v4h4v-2H6z" />
</svg>

                    }
                </button>
            </Link>


            <AnimatePresence mode='wait'>

                <motion.div
                    key={darkMode}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: '10deg', }}
                    exit={{ rotate: '-30deg' }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className=' mb-4  flex flex-col items-center pr-5 mr-2 justify-self-end  translate-y-2'
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {
                        darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                                <path fill="#ffac33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2z" />
                                <circle cx="18" cy="18" r="10" fill="#ffac33" />
                            </svg>)
                            : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
                                    <path fill="#2f88ff" stroke="#000" stroke-linejoin="round" stroke-width="1" d="M28.0527 4.41085C22.5828 5.83695 18.5455 10.8106 18.5455 16.7273C18.5455 23.7564 24.2436 29.4545 31.2727 29.4545C37.1894 29.4545 42.1631 25.4172 43.5891 19.9473C43.8585 21.256 44 22.6115 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C25.3885 4 26.744 4.14149 28.0527 4.41085Z" />
                                </svg>)
                    }
                </motion.div>

            </AnimatePresence>

        </div>
    )
}

export default Header