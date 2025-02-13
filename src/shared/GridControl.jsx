import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function GridControl({ showGrid, setShowGrid, gridLevel, setGridLevel }) {
  return (
    <AnimatePresence mode='wait' >

    <motion.div
      initial={{ scaleY: 0.5 }}
      animate={{ scaleY: 1, }}
      exit={{ scaleY: 0.5 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className=' mb-4  flex flex-col items-center  bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl shadow-2xl'
    >
      <div className="pretty p-switch p-fill  p-warning">
        <input type="checkbox" onClick={() => setShowGrid(!showGrid)} />
        <div className="state  p-warning">
          <label className=' text-gray-800 font-extrabold dark:text-gray-300'> {showGrid ? "Hide Grid" : 'Show Grid'} </label>
        </div>
      </div>

      {showGrid &&
       

          <motion.div
            initial={{ scaleY: 0.5 }}
            animate={{ scaleY: 1, }}
            exit={{ scaleY: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeIn' }}
          >





            <fieldset className="space-y-1  sm:w-60 dark:text-ambent-800 mt-4">
              <p className=' text-amber-700 dark:text-amber-500'> Grid Size </p>
              <input onChange={(e) => setGridLevel(e.target.value)} type="range" className="w-full accent-amber-500 dark:accent-ambent-600" min="1" max="5" />
              <div aria-hidden="true" className="flex justify-between px-1 dark:text-gray-50">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </fieldset>
          </motion.div>
      }
    </motion.div>
      </AnimatePresence>

  )
}

export default GridControl