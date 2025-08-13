import React from 'react'
export default function SheetSelector({apps, activeApp, setActiveApp, sheets, activeSheet, setActiveSheet}){
  return (
    <div className='space-y-3'>
      <label className='block font-medium'>Application</label>
      <select value={activeApp} onChange={e=>setActiveApp(e.target.value)} className='w-full p-2 border rounded'>
        {apps.map(a=> <option key={a} value={a}>{a}</option>)}
      </select>

      <label className='block font-medium mt-2'>Sheet</label>
      <select value={activeSheet} onChange={e=>setActiveSheet(e.target.value)} className='w-full p-2 border rounded'>
        {sheets.map(s=> <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  )
}
