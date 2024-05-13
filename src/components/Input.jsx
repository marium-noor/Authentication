import React from 'react'
import { useId } from 'react'
import { forwardRef } from 'react'

const Input = forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props 
}, ref) {
    const id = useId()
  return (
    <div className='w-full flex item-center justify-center flex-row my-3'>
        {label && <label
        htmlFor={id}
        className='w-1/2 pt-2'>{label}</label>}

        <input 
        type={type}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        />
    </div>
  )
}
)
export default Input