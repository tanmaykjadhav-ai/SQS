import React, { useState } from 'react'
import schema from './bx_questionnaire_schema.json'
import SheetSelector from './components/SheetSelector'
import FormRenderer from './components/FormRenderer'
import CSVExporter from './components/CSVExporter'

export default function App(){
  const apps = Object.keys(schema)
  const [activeApp, setActiveApp] = useState(apps[0])
  const sheets = Object.keys(schema[activeApp])
  const [activeSheet, setActiveSheet] = useState(sheets[0])
  const [data, setData] = useState(()=> JSON.parse(localStorage.getItem('bxData') || '{}'))

  const updateData = (sheetName, rowIdx, field, value) => {
    const sheetRows = data[sheetName] ? [...data[sheetName]] : []
    const sheetRows = data[sheetName] ? [...data[sheetName]] : []
    if (field === '__replace__' && Array.isArray(value)) { // replace entire rows array (used for Add row)
      const next = {...data, [sheetName]: value}
      setData(next); localStorage.setItem('bxData', JSON.stringify(next));
      return
    }
    if (rowIdx == null) { // set single object
      const obj = {...(sheetRows[0]||{}) , [field]: value}
      sheetRows[0] = obj
    } else {
      sheetRows[rowIdx] = {...(sheetRows[rowIdx]||{}), [field]: value}
    }
    const next = {...data, [sheetName]: sheetRows}
    setData(next); localStorage.setItem('bxData', JSON.stringify(next))
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <h1 className='text-2xl font-bold mb-4'>BX Questionnaire (Demo)</h1>
      <div className='grid md:grid-cols-3 gap-4'>
        <div className='md:col-span-1'>
          <SheetSelector apps={apps} activeApp={activeApp} setActiveApp={(a)=>{ setActiveApp(a); const s = Object.keys(schema[a])[0]; setActiveSheet(s); }} sheets={Object.keys(schema[activeApp])} activeSheet={activeSheet} setActiveSheet={setActiveSheet} />
          <CSVExporter schema={schema} data={data} />
        </div>
        <div className='md:col-span-2'>
          <FormRenderer fields={schema[activeApp][activeSheet]} sheetName={activeSheet} values={data[activeSheet]||[]} updateData={updateData} />
        </div>
      </div>
    </div>
  )
}
