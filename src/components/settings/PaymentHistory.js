import React from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function createData(date, invoice_nr, amount) {
  return { date, invoice_nr, amount }
}

const rows = [
  createData('28 Oct', 'Invoice 123456', '$10.00'),
  createData('28 Sep', 'Invoice 123456', '$10.00'),
  createData('28 Aug', 'Invoice 123456', '$10.00'),
  createData('28 Jul', 'Invoice 123456', '$10.00')
]

function PaymentHistory() {
  return (
    <>
      <TableContainer>
        <Table aria-label="Payment history" style={{ width: '100%' }}>
          <TableHead>
            <TableRow style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
              <TableCell style={{ paddingLeft: '0', borderBottom: 'none', fontWeight: 'bold', fontSize: '1.15em' }}>2020</TableCell>
            </TableRow>
          </TableHead>
          <TableBody> 
            {rows.map((row) => (
              <TableRow key={row.invoice_nr}>
                <TableCell component="th" scope="row" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>
                  {row.date}
                </TableCell>
                <TableCell align="left" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>{row.invoice_nr}</TableCell>
                <TableCell align="right" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer>
        <Table aria-label="Payment history" style={{ width: '100%' }}>
          <TableHead>
            <TableRow style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
              <TableCell style={{ paddingLeft: '0', borderBottom: 'none', fontWeight: 'bold', fontSize: '1.15em' }}>2021</TableCell>
            </TableRow>
          </TableHead>
          <TableBody> 
            {rows.map((row) => (
              <TableRow key={row.invoice_nr}>
                <TableCell component="th" scope="row" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>
                  {row.date}
                </TableCell>
                <TableCell align="left" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>{row.invoice_nr}</TableCell>
                <TableCell align="right" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PaymentHistory
