import React, { useState } from 'react'
import styled from 'styled-components'

import HelpIcon from '@material-ui/icons/Help';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Avatar from '@material-ui/core/Avatar';

import {
  Link
} from "react-router-dom"

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'

function Header() {

  const [user] = useAuthState(auth)

  const [navOpen, setNavOpen] = useState(false)

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
          <Avatar alt={ user?.displayName } src={ user?.photoURL } onClick={(e) => setNavOpen(!navOpen)}>
            { user?.displayName.charAt(0) } 
          </Avatar>
          <ProfileDropdown className={navOpen ? 'active' : ''}>
            <Link to="/profile">
              Your Profile
            </Link>
            <Link to="/team">
              Your Team
            </Link>
            <Link to="/settings">
              Company Settings
            </Link>
            <Link to="/subscription">
              Subscription
            </Link>
            <Link to="#" onClick={() => auth.signOut()}>
              Sign Out
            </Link>
          </ProfileDropdown>
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
  position: relative;

  > .MuiSvgIcon-root {
    padding: 15px 7.5px;
    fill: #fff;
  }

  > .MuiAvatar-root {
    padding: 15px 7.5px;
    width: 24px;
    height: 24px;

    > img {
      border-radius: 50%;
    }

    > :hover {
      cursor: pointer;
    }
  }
`

const ProfileDropdown = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  top: 57px;
  right: 0;
  box-shadow: 0px 0px 8px #00000033;
  border-radius: 0px 0px 4px 4px;
  padding: 15px;
  background: #fff;
  min-width: 150px;

  > a {
    padding: 5px 10px;
    text-decoration: none;
    color: #292724;
    font-size: 16px;
  }

  &.active {
    display: flex;
  }
`

const HeaderSubnav = styled.div`
  display: flex;
  align-items: center;
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
