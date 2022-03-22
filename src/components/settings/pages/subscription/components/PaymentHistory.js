import React, { useEffect, useState } from 'react'

import axios from 'axios';

import moment from 'moment'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function PaymentHistory() {

  const [data, setData] = useState([])

  // Fetch data on page load - when history changes
  useEffect(() => {
    try {
      axios.get(`/json/settings/subscription/payment_history.json`)
        .then(res => {
          setData([]);
          let rows = [];
          res.data.forEach(item => {
            rows.push(createData(item.date, item.invoice_nr, item.amount));
          })
          setData(rows);
        })

    } catch (err) {
      // An error has occurred
      console.trace(err);
    }
  }, []);

  // Create rows
  function createData(date, invoice_nr, amount) {
    return { date, invoice_nr, amount }
  }

  return (
    <>
      <TableContainer>
        <Table aria-label="Payment history" style={{ width: '100%' }}>
          <TableHead>
            <TableRow style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
              <TableCell style={{ paddingLeft: '0', borderBottom: 'none', fontWeight: 'bold', fontSize: '1.15em' }}>2021</TableCell>
            </TableRow>
          </TableHead>
          <TableBody> 
            {data?.map((row) => {
              const year = moment(row.date).format('Y');
              if (year !== '2021') return false;

              const date = moment(row.date).format('DD MMMM');
              return (
                <TableRow key={row.invoice_nr}>
                  <TableCell component="th" scope="row" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>
                    {date}
                  </TableCell>
                  <TableCell align="left" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>{row.invoice_nr}</TableCell>
                  <TableCell align="right" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>{row.amount}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer>
        <Table aria-label="Payment history" style={{ width: '100%' }}>
          <TableHead>
            <TableRow style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
              <TableCell style={{ paddingLeft: '0', borderBottom: 'none', fontWeight: 'bold', fontSize: '1.15em' }}>2022</TableCell>
            </TableRow>
          </TableHead>
          <TableBody> 
            {data?.map((row) => {
              const year = moment(row.date).format('Y');
              if (year !== '2022') return false;
              
              const date = moment(row.date).format('DD MMMM');
              return (
                <TableRow key={row.invoice_nr}>
                  <TableCell component="th" scope="row" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>
                    {date}
                  </TableCell>
                  <TableCell align="left" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>{row.invoice_nr}</TableCell>
                  <TableCell align="right" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>{row.amount}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PaymentHistory
