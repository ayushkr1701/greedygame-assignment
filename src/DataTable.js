import React, { useState, useEffect } from 'react';
import './App.css';
import DatePicker from "react-date-picker";

export default function DataTable() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState({
    app_id: true,
    date: true,
    requests: true,
    responses: true,
    impressions: true,
    clicks: true,
    revenue: true,
  });

  // Fetch data from API
  useEffect(() => {
    if(startDate && endDate){
    async function fetchData() {
      const response = await fetch(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${(startDate.toISOString()).slice(0,10)}&endDate=${(endDate.toISOString()).slice(0,10)}`);
      const json = await response.json();
      setData(json.data);
      console.log(json.data);
    }
    fetchData();
  }
  }, [startDate, endDate]);


  const rows = data.map(item => (
    //Displaying data fetched from api in table.
    <tr key={item.app_id}>
      <td style={{ display: columns.app_id ? 'table-cell' : 'none' }}>{item.app_id}</td>
      <td style={{ display: columns.date ? 'table-cell' : 'none' }}>{((item.date).slice(0,10))}</td>
      <td style={{ display: columns.requests ? 'table-cell' : 'none' }}>{item.requests}</td>
      <td style={{ display: columns.responses ? 'table-cell' : 'none' }}>{item.responses}</td>
      <td style={{ display: columns.clicks ? 'table-cell' : 'none' }}>{item.clicks}</td>
      <td style={{ display: columns.revenue ? 'table-cell' : 'none' }}>{"$"+(item.revenue).toFixed(2)}</td>
    </tr>
  ));

  // Render checkboxes to show/hide columns 
  const checkboxes = Object.keys(columns).map(key => (
    <label key={key} className='data'>
      <input
        type="checkbox"
        checked={columns[key]}
        onChange={() => {
          setColumns({
            ...columns,
            [key]: !columns[key]
          });
        }}
      />
      {key}
    </label>
  ));

  return (
    <div >
      <div className='data'>
      <>Enter start date: </>
      <DatePicker
        dateFormat="y-MM-dd"
        maxDate={new Date("2021-06-31")}
        minDate={new Date("2021-06-01")}
        onChange={setStartDate}
        value={startDate}
      />
      </div>
      <div className='data'>
      <>Enter end date: </>
      <DatePicker
        dateFormat="y-MM-dd"
        maxDate={new Date("2021-06-31")}
        minDate={new Date("2021-06-01")}
        onChange={setEndDate}
        value={endDate}
      />
      </div>

      {checkboxes}
      <table className='data'>
        <thead className='tablehead'>
          <tr>
            <th style={{ display: columns.app_id ? 'table-cell' : 'none' }}>App ID</th>
            <th style={{ display: columns.date ? 'table-cell' : 'none' }}>Date</th>
            <th style={{ display: columns.requests ? 'table-cell' : 'none' }}>Requests</th>
            <th style={{ display: columns.responses ? 'table-cell' : 'none' }}>Responses</th>
            <th style={{ display: columns.clicks ? 'table-cell' : 'none' }}>Clicks</th>
            <th style={{ display: columns.revenue ? 'table-cell' : 'none' }}>Revenue</th>
          </tr>
        </thead>
        <tbody >
          {rows}
        </tbody>
      </table>
    </div>
  );
}
