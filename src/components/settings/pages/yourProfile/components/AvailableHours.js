import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function AvailableHours() {

  const { control } = useForm();

  const [days, setDays] = useState([
    {
      "id": 1,
      "title": "Mon",
      "amount": 10,
      "checked": true
    },
    {
      "id": 2,
      "title": "Tue",
      "amount": 0,
      "checked": false
    },
    {
      "id": 3,
      "title": "Wed",
      "amount": 5,
      "checked": true
    },
    {
      "id": 4,
      "title": "Thu",
      "amount": 4,
      "checked": true
    },
    {
      "id": 5,
      "title": "Fri",
      "amount": 0,
      "checked": false
    },
    {
      "id": 6,
      "title": "Sat",
      "amount": 0,
      "checked": false
    }
  ])

  const handleChange = event => {

    var items;

    if (!event.target.name.includes('item')) {
      items = days;
      items[event.target.name - 1].amount = event.target.value;
      setDays([...items]);
    } else {
      items = days;
      items[event.target.id - 1].checked = !items[event.target.id - 1].checked;
      setDays([...items]);
    }

  }

  return (
    <>
      <Grid item xs={12} sm={12}>
        <h4 style={{ fontWeight: '600' }}>Hours I’m available to work</h4>
      </Grid>

      {
        days ?
        days.map((item, index) => (
          <Grid item xs={2} key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.checked}
                    onChange={handleChange}
                    id={item.id}
                    name={`item[${item.id}]`}
                  />
                }
                label={item.title}
                labelPlacement={'top'}
              />
            </FormGroup>
            <FormControl variant="outlined">
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    type="number"
                    {...field}
                    value={item.amount}
                    onChange={handleChange}
                  />
                )}
                control={control}
                name={`${item.id}`}
              />
            </FormControl>
          </Grid>
        ))
        : null
      }

    </>
  )
}

export default AvailableHours
