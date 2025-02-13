import { useDraggable } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react'

import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import TrashSVG from '../assets/trash.svg'
import keysStore from '../zustand/keysStore';

const DraggableItem = ({ id, content, width, height, position, onResize, selected }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform
    } = useDraggable({
        id: id
    });

    const style = {
        position: 'absolute',
        width: `${width * 100}px`,
        height: `${height * 100}px`,
        left: position.x,
        top: position.y,
        backgroundColor: '#fff',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        padding: '1rem',
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        touchAction: 'none',
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };

    const changeKeySelect = keysStore((state) => state.changeKeySelect);
    const calcStr = keysStore((state) => state.calcStr);

    const updateCalcStr = keysStore((state) => state.updateCalcStr);
    const updateErrCalc = keysStore((state) => state.updateErrCalc);

    const changeResultString = keysStore((state) => state.changeResultString);




    const handleCalcString = () => {
        // console.log(content)
        if (id=='0') {
            return;
        }
        
        if (content == '=') {
            console.log(Number(calcStr))
            if (calcStr != '' && calcStr != '=') {

                console.log("calculating...")
                changeResultString(eval(calcStr))
                updateCalcStr(eval(calcStr))
                return;
            }
            updateErrCalc('Enter something before clicking =')


            // return;
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
        <Resizable
            width={width * 101}
            height={height * 101}
            onResize={(e, { size }) => onResize(id, size)}
            resizeHandles={['se']}
            minConstraints={[10, 10]}
            maxConstraints={[300, 300]}
            className='border-8'
        >
            <div ref={setNodeRef} style={style} className='relative '   >
                <div {...listeners} {...attributes}
                    className='w-[100%] h-[100%] text-center font-semibold place-content-center cursor-grab '
                >
                    <div onClick={handleCalcString}>
                        {content}

                    </div>
                    <img src={TrashSVG} onClick={() => changeKeySelect(id, false)} alt="" className=' absolute top-0 right-0 size-[30%] max-w-3 cursor-pointer' />

                </div>

            </div>
        </Resizable >
    );
};

export default DraggableItem