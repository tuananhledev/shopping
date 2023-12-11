import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

const Button = ({ children, primary = false, onClick = () => { }, className }) => {
   return (
      <button
         onClick={onClick}
         className={cx('px-3 py-2 w-full text-base rounded', primary ? 'text-white bg-[#ff424e]' : 'text-[#0a68ff] hover:bg-[#0060ff1f] border border-[#0a68ff]', className)}
      >
         {children}
      </button>
   )
}

export default Button;

export const ButtonLink = ({ children, to, leftIcon = null, active = false, onClick = () => { }, }) => {
   let Comp = 'div'
   const props = {
      onClick,
   }
   if (to) {
      Comp = Link
      props.to = to
   }

   return (
      <Comp
         {...props}
         onClick={onClick}
         className={cx(
            'fy-center text-sm px-4 py-2 rounded-lg cursor-pointer',
            active ? 'text-[#0a68ff] hover:bg-[#0060ff1f]' : 'text-[#808089] hover:bg-[#27272a1f]'
         )}
      >
         {leftIcon}
         <span>{children}</span>
      </Comp >
   )
}

export const ButtonCart = ({ count }) => {
   return (
      <Link
         to={'/cart'}
         className={cx(
            'fy-center text-sm px-2 py-2 rounded-lg hover:bg-[#0060ff1f] relative',
         )}
      >
         <img
            className='w-6 h-6 object-cover'
            src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
            alt=""
         />
         <span className='text-white text-xs bg-[#ff424f] rounded-lg px-1 py-[0.5px] text-center absolute right-0 -top-1'>
            {count}
         </span>
      </Link >
   )
}