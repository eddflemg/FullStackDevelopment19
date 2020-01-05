import React from 'react'

const Input = ({ reset, type, value, onChange, name }) => (
  <div>
    <input
      value={value}
      type={type}
      onChange={onChange}
      name={name}
    />
  </div>
)

export default Input
