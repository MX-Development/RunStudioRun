import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import HelpIcon from '@material-ui/icons/Help';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Avatar from '@material-ui/core/Avatar';

import {
  Link,
  useHistory
} from "react-router-dom"

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'

import RunStudioRunLogo from './assets/runstudiorun-logo.svg'
import JobSelect from './JobSelect';

function Header() {

  let history = useHistory()

  const [user] = useAuthState(auth)

  const [navOpen, setNavOpen] = useState(false)
  const [activeNav, setActiveNav] = useState(null)
  const [activeSubitem, setActiveSubitem] = useState(null)
  
  const [openQuickNav, setQuicknav] = useState(false)

  const [modalOpened, setModalOpened] = useState(false)
  const [modalTitle, setModalTitle] = useState(null)

  const navItems = [
    {
      item: 'To dos',
      sub_items: []
    },
    {
      item: 'Work',
      sub_items: [
        {
          title: 'Projects',
          path: '/projects'
        },
        {
          title: 'Estimates',
          path: '/estimates'
        },
        {
          title: 'Purchases',
          path: '/purchases'
        },
        {
          title: 'Invoices',
          path: '/invoices'
        },
        {
          title: 'Reports',
          path: '/reports'
        }
      ]
    },
    {
      item: 'Contacts',
      sub_items: [
        {
          title: 'Companies',
          path: '/companies'
        },
        {
          title: 'People',
          path: '/people'
        }
      ]
    },
    {
      item: 'Settings',
      sub_items: [
        {
          title: 'Your profile',
          path: '/profile'
        },
        {
          title: 'Your team',
          path: '/team'
        },
        {
          title: 'Company settings',
          path: '/settings'
        },
        {
          title: 'Items & Tasks',
          path: '/items-and-tasks'
        },
        {
          title: 'Expenses',
          path: '/expenses'
        },
        {
          title: 'Subscription',
          path: '/subscription'
        }
      ]
    }
  ]

  return (
    <>
      <HeaderContainer>
        <HeaderTop>
          <HeaderLogo>
            <img src={RunStudioRunLogo} alt="Run Studio Run logo" />
          </HeaderLogo>
          <HeaderNav>
            {
              navItems.map(item => (
                <Link key={item.item} onClick={(e) => {
                  
                  setActiveNav(item.item)

                  if (item.item == 'To dos') {
                    history.push(`/to-do`)
                  } else {
                    history.push(`${item.sub_items[0].path}`)
                    setActiveSubitem(item.sub_items[0].title)
                  }
                  
                }} className={activeNav === item.item ? 'active' : null}>
                  { item.item }
                </Link>
              ))
            }
          </HeaderNav>
          <HeaderActions>
            <AddCircleIcon onClick={(e) => {
              setQuicknav(!openQuickNav)
              setNavOpen(false)
            }} />
            <QuickNav className={openQuickNav ? 'active' : ''}>
              <h2>Quick</h2>
              <Columns>
                <Column>
                  <h3>Projects</h3>
                  <Link to="/projects/add" onClick={() => setQuicknav(false)}>
                    New Project
                  </Link>
                  <Link to="/estimates/add" onClick={() => setQuicknav(false)}>
                    New Job
                  </Link>
                  <Link to="/purchases/add" onClick={() => setQuicknav(false)}>
                    New Purchases
                  </Link>
                  <Link onClick={(e) => {
                    setModalTitle('Additional Time')
                    setModalOpened(!modalOpened)
                    setQuicknav(false)
                  }}>
                    Additional Time
                  </Link>
                </Column>
                <Column>
                  <h3>Contacts</h3>
                  <Link to="/companies/add" onClick={() => setQuicknav(false)}>
                    Add Company
                  </Link>
                  <Link to="/companies/import">
                    Import Company
                  </Link>
                  <Link to="/people/add" onClick={() => setQuicknav(false)}>
                    Add People
                  </Link>
                  <Link to="/people/import">
                    Import People
                  </Link>
                  <Link to="/contacts/sync">
                    Sync Contacts
                  </Link>
                </Column>
                <Column>
                  <h3>Profile & Settings</h3>
                  <Link to="/team/add" onClick={() => setQuicknav(false)}>
                    Add Team Member
                  </Link>
                  <Link to="/items-and-tasks/add" onClick={() => setQuicknav(false)}>
                    Add Item
                  </Link>
                  <Link to="/expenses/add" onClick={() => setQuicknav(false)}>
                    Add Expense
                  </Link>
                </Column>
              </Columns>
            </QuickNav>
            <HelpIcon />
            <Avatar alt={ user?.displayName } src={ user?.photoURL } onClick={(e) => {
              setNavOpen(!navOpen)
              setQuicknav(false)
            }}>
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
            {
              activeNav === 'To dos' ?
              <JobSelect />
              :
              navItems.map(item => (
                item.sub_items.map(sub_item => (
                  activeNav === item.item ?
                    <Link to={sub_item.path} key={sub_item.title} parent={item.item} onClick={(e) =>  {
                      setActiveSubitem(sub_item.title)
                    }} className={activeSubitem === sub_item.title ? 'active' : null}>
                      { sub_item.title }
                    </Link>
                  : null
                ))
              ))
            }
          </SubnavLinks>
          <SubnavSearch>
            <input id="search" name="search" className="form-control" placeholder="Search..." />
          </SubnavSearch>
        </HeaderSubnav>
      </HeaderContainer>
    </>
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
  position: relative;
  top: 5px;
`

const HeaderNav = styled.div`
  display: flex;

  > a {
    background: transparent;
    padding: 15px 45px;
    text-decoration: none;
    color: #fff;
    font-size: 22px;
    transition: background .25s ease-in-out;
  }

  > a:hover {
    background: var(--gold);
    color: #fff;
  }

  > a.active {
    background: var(--gold);
    color: #fff;
  }
`

const HeaderActions = styled.div`
  display: flex;
  position: relative;

  > .MuiSvgIcon-root {
    fill: #fff;
    cursor: pointer;
    width: 1.5em !important;
    height: 1.5em !important;
    margin-right: 5px;
  }

  > .MuiAvatar-root {
    width: 1.75em !important;
    height: 1.75em !important;

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
  top: 40px;
  right: 0;
  box-shadow: 0px 0px 8px #00000033;
  border-radius: 0px 0px 4px 4px;
  padding: 15px;
  background: #fff;
  min-width: 175px;
  z-index: 1;

  > a {
    padding: 5px 10px;
    text-decoration: none;
    color: #292724;
    font-size: 14px;
    display: flex;
    word-wrap: none;
  }

  > a:hover {
    background: #F4F2F0;
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
    border-radius: 2px;
  }

  > a:hover {
    background-color: var(--gold);
    color: #fff;
  }

  > a.active {
    background-color: var(--gold);
    color: #fff;
  }
`

const SubnavSearch = styled.div`
  flex: 0.2;

  input {
    width: 100%;
    font-size: 12px;  
  }
`

const QuickNav = styled.div`
  display: none;
  position: absolute;
  top: 40px;
  right: 0;
  box-shadow: 0px 0px 8px #00000033;
  border-radius: 0px 0px 4px 4px;
  padding: 15px;
  background: #fff;
  z-index: 5;

  &.active {
    display: flex;
    flex-direction: column;
  }

  > h2 {
    font-size: 42px;
    font-weight: 300;
    margin-bottom: 15px;
  }
`

const Columns = styled.div`
  display: flex;
`

const Column = styled.div`
  min-width: 150px;

  > h3 {
    color: #E0BC77;
    margin-bottom: 20px;
  }

  > a {
    padding: 5px 10px;
    text-decoration: none;
    color: #292724;
    font-size: 14px;
    display: flex;
    word-wrap: none;
  }

  > a:hover {
    background: #F4F2F0;
  }
`
