import React, { useEffect, useMemo, useState } from 'react'
import keysStore from '../zustand/keysStore';
import Select from 'react-select'

const KeysMenu = React.memo(() => {
    const allKeys = keysStore((state) => state.allKeys);
    const changeKeySelect = keysStore((state) => state.changeKeySelect);
    const notSelectedKeys = useMemo(() => allKeys?.filter((item) => !item?.selected), [allKeys]);

    const handleSelect = (vals) => {
        const selectedValues = new Set(vals.map((i) => i.value)); 

        allKeys.forEach(({ id, label }) => {
            changeKeySelect(id, selectedValues.has(label));
        });
    };

    const selectedValues = useMemo(() =>
        allKeys
            .filter((item) => item.selected)
            .map((item) => ({
                value: item.label,
                label: item.label,
            })),
        [allKeys]);

    return (
        <div className='p-6 shadow-xl w-95% sm:w-[65%] mt-4 rounded-xl border-0 self-center  bg-gray-100 dark:bg-gray-700'>
            <Select
               value={selectedValues}
                isMulti
                name="colors"
                options={allKeys.map(item => {
                    return { value: item.label, label: item.label }
                })}
                className="basic-multi-select   bg-gray-200 dark:bg-gray-800"
                classNamePrefix="select"
                onChange={handleSelect}
                styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: 'rgb(251,191,20',
                      borderColor: state.isFocused ? 'rgb(251 191 36)' : provided.borderColor, 
                      boxShadow: state.isFocused ? '0 0 0 2px rgba(251, 191, 36, 0.5)' : 'none',
                      '&:hover': { borderColor: 'rgb(251 191 36)' }
                    }),

                    multiValueLabel: (provided) => ({
                        ...provided,
                        color: 'white',
                        background:'gray'
                         
                      }),

                      multiValueRemove: (provided) => ({
                        ...provided,
                        color: 'white',
                        background:'gray',
                        '&:hover': {
                          backgroundColor: 'rgb(220,38,38)', 
                          color: 'white',
                        }
                      }),

                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor:  state.isFocused ? 'rgb(251 191 106)' : 'lightgray',  
                        color: state.isFocused ? 'black' : provided.color, 
                        '&:active': {
                          backgroundColor: 'rgb(234 179 8)',  
                        }
                      })
                  }}
            />

        </div>
    )
});

export default KeysMenu