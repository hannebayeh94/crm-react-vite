import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="bg-red-600 text-center p-3 text-white font-bold my-4">
    {children}
  </div>
  )
}

export default Alerta