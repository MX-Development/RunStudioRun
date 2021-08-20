import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Checkbox from '@material-ui/core/Checkbox';

function createData(id, name, status, type) {
  return { id, name, status, type }
}

const rows = [
  createData(1, 'Taso Katsionis', 'Active', 'Monthly / Renews Oct 2020'),
  createData(2, 'Taso Katsionis', 'Active', 'Monthly / Renews Oct 2020'),
  createData(3, 'Taso Katsionis', 'Active', 'Monthly / Renews Oct 2020'),
  createData(4, 'Select user', 'Inactive', 'Not Assign / Renews Sep 2021')
]

function Users() {

  const [selected, setSelected] = React.useState([]);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      await axios.get(`https://kendrix.kendrix.website/json/subscriptions.json`)
        .then(res => {
          setData(res.data)
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <TableContainer>
      <Table aria-label="Users" style={{ width: '100%' }}>
        <TableHead>
          <TableRow style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
            <TableCell style={{ paddingLeft: '0', borderBottom: 'none', fontWeight: 'bold', fontSize: '1.15em' }}>
              Total 5 Users / 1 Yearly Remaining / 0 Monthly Subscriptions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
          {data.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <TableRow 
                hover
                onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>
                  {row.userName}
                </TableCell>
                <TableCell align="left" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>{row.status}</TableCell>
                <TableCell align="right" style={{ padding: '8px', paddingLeft: '0', paddingRight: '0' }}>{row.type} / Renews {row.renewDate}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users
