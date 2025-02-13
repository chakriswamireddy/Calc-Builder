


import React, { useRef, useState } from 'react';
import { DndContext, DragOverlay, useSensor, useSensors, MouseSensor, TouchSensor, useDraggable } from '@dnd-kit/core';
import { Resizable, ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import DragContainer from './components/DragContainer';
import KeysMenu from './components/KeysMenu';
import keysStore from './zustand/keysStore';


import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import Header from './shared/Header';
import Output from './components/Output';
import { BrowserRouter, Route, Routes } from 'react-router';




const DraggableItem = ({ id, content, width, height, position, onResize }) => {
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

  return (
    <Resizable
      width={width * 101}
      height={height * 101}
      onResize={(e, { size }) => onResize(id, size)}
      resizeHandles={['se']}
      minConstraints={[50, 50]} 
      maxConstraints={[300, 300]}
    >
      <div ref={setNodeRef} style={style}>
        {/* Drag handle */}
        <div {...listeners} {...attributes} style={{ cursor: 'grab', width: '100%', height: '100%', textAlign: 'center', placeContent: 'center' }}>
          {content}
        </div>
      </div>
    </Resizable>
  );
};

const App = () => {
  const [items, setItems] = useState([
    { id: '1', content: 'Item 1', width: 1, height: 1, position: { x: 0, y: 0 } },
    { id: '2', content: 'Item 2', width: 2, height: 1, position: { x: 150, y: 0 } },
    { id: '3', content: 'Item 3', width: 1, height: 2, position: { x: 0, y: 150 } },
    { id: '4', content: 'Item 4', width: 1, height: 1, position: { x: 300, y: 150 } },
    { id: '5', content: 'Item 5', width: 2, height: 2, position: { x: 150, y: 300 } },
    { id: '6', content: 'Item 6', width: 1, height: 1, position: { x: 450, y: 0 } }
  ]);

  const [activeId, setActiveId] = useState(null);

  const containerRef = useRef(null);

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

    setItems((items) =>
      items.map((item) => {
        if (item.id === active.id) {
          const newX = Math.min(
            Math.max(item.position.x + delta.x, 0),
            (containerWidth - item.width * 100) - 40  
          );

          const newY = Math.min(
            Math.max(item.position.y + delta.y, 0),
            (containerHeight - item.height * 100) - 30  
          );

          return {
            ...item,
            position: { x: newX, y: newY },
          };
        }
        return item;
      })
    );

    setActiveId(null);
  };

  const handleResize = (id, size) => {
    setItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            width: Math.max(50, size.width) / 100, 
            height: Math.max(50, size.height) / 100,
          };
        }
        return item;
      })
    );
  };

  const containerStyle = {
    position: 'relative',
    width: '600px',
    height: '800px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    margin: '0 auto',
  };

  const calcStr = keysStore((state) => state.calcStr);
  const errCalc = keysStore((state) => state.errCalc);



  return (

    <BrowserRouter>
      <div className='  bg-gray-200 dark:bg-gray-800 min-h-[100vh]' >
        {/* <DotsGrid /> */}

        <Header />

      <Routes>
        <Route path='/' element={
          <div className='flex flex-col'>
            <DragContainer />
            <KeysMenu />
          </div>
        } />

        <Route path='/build' element={<Output />} />
      </Routes>

      </div>
    </BrowserRouter>
  );
};

export default App;