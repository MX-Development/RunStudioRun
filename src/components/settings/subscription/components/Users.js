import React, { useEffect, useState } from 'react'

import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import Checkbox from '@material-ui/core/Checkbox';

function Users() {

  const [selected, setSelected] = React.useState([]);

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const [data, setData] = useState([])

  const fetchData = async () => {

    try {
      await axios.get(`/json/subscriptions.json`)
        .then(res => {
          setData(res.data)
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <TableContainer>
      <p style={{ paddingLeft: '0', borderBottom: 'none', fontWeight: 'bold', fontSize: '16px' }}>
        Total 5 Users / 1 Yearly Remaining / 0 Monthly Subscriptions
      </p>
      <Table aria-label="Users" style={{ width: '100%', marginTop: '8px' }}>
        <TableBody> 
          {data.map((row, index) => {
            const isItemSelected = isSelected(row.user);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <TableRow 
                hover
                onClick={() => handleClick(row.user)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.user}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    name={`user[${row.user}]`}
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>
                  {row.userName}
                </TableCell>
                <TableCell align="left" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>{row.status}</TableCell>
                <TableCell align="right" style={{ padding: '8px', paddingLeft: '0' }}>{row.type} / Renews {row.renewDate}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users
