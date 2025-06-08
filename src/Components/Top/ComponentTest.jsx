import { Select } from 'antd'
import React from 'react'
import InformationUser from './InformationUser'

const ComponentTest = () => {
  const handleTest = () => { }
  return (
    <div>
      <div onClick={() => console.log("la data")}></div>
      <div>textodeprueba</div>
      <div>Selection</div>
      <div>ComponentTestText</div>
      <Select />
      <InformationUser />
    </div>
  )
}

export default ComponentTest
