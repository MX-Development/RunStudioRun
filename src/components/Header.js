import React from 'react'
import styled from 'styled-components'

import HelpIcon from '@material-ui/icons/Help';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {
  Link
} from "react-router-dom"

function Header() {
  return (
    <HeaderContainer>
      <HeaderTop>
        <HeaderLogo>
          <h1>RSR</h1>
        </HeaderLogo>
        <HeaderNav>
          <Link to="/">
            To Dos
          </Link>
          <Link to="/projects">
            Work
          </Link>
          <Link to="/">
            Contacts
          </Link>
          <Link to="/">
            Settings
          </Link>
        </HeaderNav>
        <HeaderActions>
          <AddCircleIcon />
          <HelpIcon />
          <AccountCircleIcon />
        </HeaderActions>
      </HeaderTop>
      <HeaderSubnav> 
        <LeftSpace />
        <SubnavLinks>
          <Link to="/">
            Projects
          </Link>
          <Link to="/">
            Estimates
          </Link>
          <Link to="/">
            Purchases
          </Link>
          <Link to="/">
            Invoices
          </Link>
          <Link to="/">
            Reports
          </Link>
        </SubnavLinks>
        <SubnavSearch>
          <input id="search" name="search" className="form-control" placeholder="Search..." />
        </SubnavSearch>
      </HeaderSubnav>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3C3C3C;
  padding: 0 15px;
`

const HeaderLogo = styled.div`
  color: #fff;
`

const HeaderNav = styled.div`
  display: flex;

  > a {
    padding: 15px 45px;
    text-decoration: none;
    color: #fff;
    font-size: 22px;
  }

  > a:hover {
    background: var(--gold);
    color: #fff;
  }

  > a:active {
    background: #fff;
  }
`

const HeaderActions = styled.div`
  display: flex;

  > .MuiSvgIcon-root {
    padding: 15px 7.5px;
    fill: #fff;
  }
`

const HeaderSubnav = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #FFFFFF;
  box-shadow: 0px 1px 4px #0000001A;
  padding: 5px 0;
`

const LeftSpace = styled.div`
  flex: 0.2;
`

const SubnavLinks = styled.div`
  flex: 0.6;
  display: flex;
  justify-content: center;

  > a {
    color: #B1B0AF;
    text-transform: uppercase;
    font-size: 12px;
    padding: 5px 7.5px;
    text-decoration: none;
    margin: 0 5px;
  }

  > a:hover {
    background-color: var(--gold);
    color: #fff;
    border-radius: 2px;
  }
`

const SubnavSearch = styled.div`
  flex: 0.2;

  input {
    width: 100%;
    font-size: 12px;  
  }
`