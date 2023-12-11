import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, id = 'react-portal' }) => {
   const wrapperRef = useRef(null);
   if (wrapperRef.current === null && typeof document !== 'undefined') {
      const div = document.createElement('div');
      div.setAttribute('id', id);
      wrapperRef.current = div;
   }
   useEffect(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper || typeof document === 'undefined') {
         return;
      }
      document.body.appendChild(wrapper);
      return () => {
         document.body.removeChild(wrapper);
      };
   }, []);
   return createPortal(children, wrapperRef.current);
};

const Modal = ({ children, isOpen, onClose = () => { }, id }) => {
   const [isClick, setIsClick] = useState(false)

   const handleMouseDown = (e) => {
      setIsClick(true)
   }

   const handleMouseUp = (e) => {
      if (isClick) {
         onClose()
      }
      setIsClick(false)
   }

   if (!isOpen) return null;
   return (
      <Portal isOpen={isOpen} id={id}>
         <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="fixed inset-0 bg-[#00000087] f-center z-40"
         >
            <div className='w-fit h-fit' onMouseDown={e => e.stopPropagation()} onClick={e => e.stopPropagation()}>
               {children}
            </div>
         </div>
      </Portal>
   );
}

export default Modal;