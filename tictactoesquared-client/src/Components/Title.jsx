import React from 'react'

const Title = () => {
  return (
    <div className="flex items-start space-x-2 mt-5">
      <div className="grid grid-cols-1">
        <span className="text-3xl font-bold text-primary tracking-wide block">Tic-Tac-Toe</span>
      </div>
      <sup className="text-2xl font-bold text-primary">2</sup>
    </div>
  )
}

export default Title