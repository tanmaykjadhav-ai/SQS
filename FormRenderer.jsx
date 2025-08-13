import React from 'react'

export default function FormRenderer({fields, sheetName, values, updateData}){
  const rows = values.length ? values : [{}]
  return (
    <div className='space-y-4'>
      {rows.map((row, ri)=> (
        <div key={ri} className='p-4 bg-white rounded shadow'>
          <h3 className='font-semibold mb-2'>{sheetName} — Row {ri+1}</h3>
          <div className='grid gap-3'>
            {fields.map(f=> (
              <div key={f.name}>
                <label className='block text-sm'>{f.name}</label>
                <input className='w-full border p-2 rounded' value={row[f.name]||''} onChange={e=>updateData(sheetName, ri, f.name, e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className='mt-2 px-3 py-2 bg-blue-600 text-white rounded' onClick={()=>{
        const next = [...rows, {}]
        updateData(sheetName, null, '__replace__', next) // hack: we handle add in updateData by null idx
      }}>Add row</button>
    </div>
  )
}
