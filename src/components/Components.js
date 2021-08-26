import React from 'react'
import styled from 'styled-components'

// Tables
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


// Form elements
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

// Grid system
import Grid from '@material-ui/core/Grid';

function createData(name, preview, variable, hex) {
  return { name, preview, variable, hex };
}

const rows = [
  createData('Gold', 'var(--gold)', 'var(--gold)', '#E0BC77'),
  createData('Light gray', 'var(--light-gray)', 'var(--light-gray)', '#DDDBD7'),
  createData('Dark gray', 'var(--dark-gray)', 'var(--dark-gray)', '#B1B0AF')
];

function Components() {

  return (
    <>
      <Heading>
        Colors
      </Heading>
      <Elements>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Color</TableCell>
                <TableCell>Preview</TableCell>
                <TableCell align="right">Variable</TableCell>
                <TableCell align="right">HEX</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell><Color color={row.preview} /></TableCell>
                  <TableCell align="right">{row.variable}</TableCell>
                  <TableCell align="right">{row.hex}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Elements>

      <Heading>
        Buttons
      </Heading>
      <Elements>
        <a href="#" className="btn btn-gold">Button</a>
        <a href="#" className="btn btn-dark-gray">Button</a>
        <a href="#" className="btn btn-light-gray">Button</a>
      </Elements>

      <Heading>
        Typography
      </Heading>
      <Elements>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
      </Elements>

      <Heading>
        Form elements
      </Heading>
      <Elements>

        <FormControl component="fieldset">

        <Grid container spacing={4}> 
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>  

              <Grid item xs={12} sm={12}>
                <h4>Form fields</h4>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormGroup>
                  <FormControl variant="outlined">
                    <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Form label</FormLabel>
                    <TextField
                      id="full_name"
                      placeholder="Form field"
                      variant="outlined"
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormGroup>
                  <FormControl variant="outlined">
                    <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Form label</FormLabel>
                    <TextField
                      id="full_name"
                      placeholder="Disabled field"
                      variant="outlined"
                      disabled
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormGroup>
                  <FormControl variant="outlined">
                    <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Form label</FormLabel>
                    <TextField
                      id="full_name"
                      placeholder="Form field with a value"
                      variant="outlined"
                      defaultValue={'Value'}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>

            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>  

              <Grid item xs={12} sm={12}>
                <h4>Checkboxes and radio-buttons</h4>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={true} name="checked" />} label="Checked" />
                  <FormControlLabel control={<Checkbox checked={false} name="unchecked" />} label="Unchecked" />
                  <FormControlLabel control={<Checkbox checked={false} name="disabled" disabled/>} label="Disabled" />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="test" name="test1" value={'checked'}>
                    <FormControlLabel value="checked" control={<Radio />} label="Checked" />
                    <FormControlLabel value="unchecked" control={<Radio />} label="Unchecked" />
                    <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                  </RadioGroup>
                </FormControl>
              </Grid>

            </Grid>
          </Grid>
        </Grid>

        </FormControl>

      </Elements>
    </>
  )
}

export default Components

const Heading = styled.div`
  display: flex;
  margin: 60px 0 15px;
  font-size: 32px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding-bottom: 15px;
`

const Elements = styled.div`
  > a {
    margin-right: 5px;
  }

  > h1, h2, h3, h4, h5, h6 {
    margin-bottom: 8px;
  }
`

const Color = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.color || "palevioletred"};
`
