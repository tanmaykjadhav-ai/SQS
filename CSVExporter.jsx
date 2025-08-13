import React from 'react'

function toCSV(fields, rows){
  const headers = fields.map(f=>f.name).join(',')
  const body = rows.map(r=> fields.map(f=> '"'+String(r[f.name]||'').replace(/"/g,'""')+'"').join(',')).join('\n')
  return headers + '\n' + body + '\n'
}

function download(name, content){
  const blob = new Blob([content], {type:'text/csv'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url)
}

export default function CSVExporter({schema, data}){
  const exportSheet = (app, sheet) => {
    const fields = schema[app][sheet]
    const rows = data[sheet] || []
    const csv = toCSV(fields, rows)
    download(sheet + '.csv', csv)
  }
  const exportAll = ()=> {
    Object.keys(schema).forEach(app=> Object.keys(schema[app]).forEach(sheet=> exportSheet(app, sheet)))
  }
  return (
    <div className='space-y-3 mt-4'>
      <button className='w-full py-2 bg-green-600 text-white rounded' onClick={exportAll}>Export All CSVs</button>
    </div>
  )
}
