import React, { useEffect, useMemo } from 'react'
import keysStore from '../zustand/keysStore'
import { useRef, useState } from 'react';
import { DndContext, DragOverlay, useSensor, useSensors, MouseSensor, TouchSensor, useDraggable } from '@dnd-kit/core';
import { Resizable, ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import DraggableItem from '../shared/DraggableItem';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import GridControl from '../shared/GridControl';




function DragContainer() {
  // const selectedKeys = keysStore((state) => state.selectedKeys());

  const allKeys = keysStore((state) => state.allKeys);
  const updateKeyPosition = keysStore((state) => state.updateKeyPosition);
  const updateKeySize = keysStore((state) => state.updateKeySize);

  const containerLayout = keysStore((state) => state.containerLayout);
  const updateContainerLayout = keysStore((state) => state.updateContainerLayout);



  const selectedKeys = useMemo(() => allKeys?.filter((item) => item?.selected), [allKeys]);
  // const notSelectedKeys = useMemo(() => allKeys?.filter((item) => !item?.selected), [allKeys]);


  const [showGrid, setShowGrid] = useState(true)
  const [gridLevel, setGridLevel] = useState(2)


  const [activeId, setActiveId] = useState(null);

  const containerRef = useRef(null);

  const getNormaliseValue = (val) => {
    // return ( val - (val%20) );
    return val;
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;

    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;


    selectedKeys.map((item) => {
      if (item.id === active.id) {
        const newX = Math.min(
          Math.max(getNormaliseValue(item.position.x + delta.x), 0),
          (getNormaliseValue(containerWidth - item.width * 100)) - 20
        );

        const newY = Math.min(
          Math.max(getNormaliseValue(item.position.y + delta.y), 0),
          (getNormaliseValue(containerHeight - item.height * 100)) - 30
        );


        updateKeyPosition(item.id, newX, newY);
      }

    })



    // setItems((items) =>
    //   items.map((item) => {
    //     if (item.id === active.id) {
    //       const newX = Math.min(
    //         Math.max(getNormaliseValue(item.position.x + delta.x), 0),
    //         (getNormaliseValue(containerWidth - item.width * 100))  -20
    //       );

    //       const newY = Math.min(
    //         Math.max(getNormaliseValue(item.position.y + delta.y), 0),
    //         (getNormaliseValue(containerHeight - item.height * 100)) - 30
    //       );


    //       return {
    //         ...item,
    //         position: { x: newX, y: newY },
    //       };
    //     }
    //     return item;
    //   })
    // );

    setActiveId(null);
  };

  const handleResize = (id, size) => {
    // setItems((items) =>
    //   items.map((item) => {
    //     if (item.id === id) {
    //       return {
    //         ...item,
    //         width: Math.max(20, size.width) / 100,
    //         height: Math.max(20, size.height) / 100,
    //       };
    //     }
    //     return item;
    //   })
    // );

    selectedKeys.map((item) => {
      if (item.id === id) {
        updateKeySize(item.id, Math.max(20, size.width) / 100, Math.max(20, size.height) / 100)

      }

    })
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    // backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    margin: '0 auto',
    backgroundSize: `${gridLevel * 20}px ${gridLevel * 25}px`,
  };

  const handleContainerResize = (e, { size }) => {
    // console.log(size);
    updateContainerLayout(size)

  }

  const [appTheme, setAppTheme] = useState(localStorage.getItem('theme'))


  useEffect(() => {
    const handleThemeChange = () => {
      setAppTheme(localStorage.getItem('theme'))
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);


  return (
    <div className="p-4 flex flex-col  gap-4 items-center  bg-gray-200 dark:bg-gray-800  ">

      {appTheme}


      <GridControl showGrid={showGrid} setShowGrid={setShowGrid} gridLevel={gridLevel} setGridLevel={setGridLevel} />

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ width: '100%', height: '100%' }}
      >
        <ResizableBox onResize={handleContainerResize} width={containerLayout.width} height={containerLayout.height} className='  bg-gray-100 dark:bg-gray-600 rounded-2xl' >


          <div
            ref={containerRef}
            style={containerStyle}
            className={
              showGrid
                ? appTheme === 'light'
                  ? 'bg-[radial-gradient(circle,rgb(107,106,106)_1%,transparent_10%)]'
                  : 'bg-[radial-gradient(circle,rgb(245,209,209)_1%,transparent_10%)]'
                : ''
            }
          >
            {selectedKeys?.map((item) => (
              <DraggableItem
                key={item.id}
                {...item}
                onResize={handleResize}
                className='border'
              />
            ))}
          </div>

        </ResizableBox>

        <DragOverlay>
          {activeId ? (
            <div
              style={{
                backgroundColor: '#fff',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                padding: '1rem',
                width: `${selectedKeys.find(item => item.id === activeId)?.width * 100}px`,
                height: `${selectedKeys.find(item => item.id === activeId)?.height * 100}px`,
                opacity: 0.9,
                cursor: 'grabbing',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
              }}
            >
              {selectedKeys.find(item => item.id === activeId)?.content}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default DragContainer