import React, { useEffect, useMemo } from 'react'
import keysStore from '../zustand/keysStore';

function Output() {

    const allKeys = keysStore((state) => state.allKeys);
    const selectedKeys = useMemo(() => allKeys?.filter((item) => item?.selected), [allKeys]);

    const containerLayout = keysStore((state) => state.containerLayout);

    const changeKeySelect = keysStore((state) => state.changeKeySelect);
    const calcStr = keysStore((state) => state.calcStr);

    const updateCalcStr = keysStore((state) => state.updateCalcStr);
    const updateErrCalc = keysStore((state) => state.updateErrCalc);

    const changeResultString = keysStore((state) => state.changeResultString);

    useEffect(() => {
        changeResultString('');
        updateCalcStr('');
    }, [])

    const handleCalcString = (content, id) => {

        if (id == '0') {
            return;
        }
        if (content == '=') {

            if (calcStr != '' && calcStr != '=' && calcStr.slice(0, -1) != '=') {

                console.log("calculating...")
                changeResultString(eval(calcStr))
                updateCalcStr(eval(calcStr))
                return;
            }
            updateErrCalc('Enter something before clicking =')

        }

        if (id == '18') {
            updateCalcStr('')
            changeResultString('')
            return;

        }

        if (id == '17') {
            updateCalcStr(calcStr.slice(0, -1))
            changeResultString(calcStr.slice(0, -1))
            return;

        }


        if (calcStr === '' && content.match(/[*/]/)) {
            updateErrCalc(' for * & /, Enter a number first')
            return;

        }

        if (calcStr !== '' && !calcStr.toString().slice(-1).match(/[0-9]/) && !content.match(/[0-9]/)) {
            updateErrCalc('Entering two symbols at once is not ideal');
            return;
        }




        updateCalcStr(calcStr + content)
        changeResultString(calcStr + content)
    }

    return (
        <div className='flex flex-col min-h-[100vh] items-center justify-center  bg-gray-200 dark:bg-gray-800'>
          
            <div className='rounded-xl shadow-2xl '>


                <div
                   className=' bg-gray-00 dark:bg-gray-600 rounded-xl'
                    style={{
                        width: `${Math.round(containerLayout.width)}px`,
                        height: `${Math.round(containerLayout.height)}px`,
                        position: 'relative'
                    }}
                >

                    {selectedKeys.map((item) => (
                        <div
                      
                            onClick={() => handleCalcString(item.content, item.id)}
                            // className='hover:color-pink'
                            style={{
                                width: `${item.width * 100}px`, height: `${item.height * 100}px`,
                                position: 'absolute',
                                // top: `${item.position.x}px`,
                                // left: `${item.position.y}px`,
                                transform: `translate(${item.position.x}px, ${item.position.y}px)`, 

                                background: '#83ACAE',
                                textAlign: 'center',
                                placeContent: 'center',
                                borderRadius: '10px',
                                color: 'white',
                                cursor: 'pointer',
                                // margin: '10px',
                                fontWeight:'bold',
                                textShadow:'1px 1px 3px gray'


                            }}

                            key={item.id}  >
                            {item.id == '0' ?
                                <div className='w-[80%] h-[80%] rounded-md drop-shadow-xl  flex items-center self-center mx-auto justify-center bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-500'>
                                    {/* {item.content != 'Result' &&
                                        <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M5.75 10c0-.69.56-1.25 1.25-1.25h10a1.25 1.25 0 1 1 0 2.5H7c-.69 0-1.25-.56-1.25-1.25m0 4c0-.69.56-1.25 1.25-1.25h10a1.25 1.25 0 1 1 0 2.5H7c-.69 0-1.25-.56-1.25-1.25" />
                                        </svg>
                                    } */}
                                    {item.content}
                                </div>
                                :
                                <> {item.content} </>
                            }

                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default Output