import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import HelpIcon from '@material-ui/icons/Help';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Avatar from '@material-ui/core/Avatar';

import {
  Link,
  useHistory,
  useLocation
} from "react-router-dom"

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'

import RunStudioRunLogo from './assets/img/logo-hound.svg'
import JobSelect from './to-dos/components/JobSelect';
import Tooltips from './Tooltips';

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function Header() {

  let history = useHistory()
  let location = useLocation()

  const [user] = useAuthState(auth)

  const [navOpen, setNavOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [activeNav, setActiveNav] = useState(null)
  const [activeSubitem, setActiveSubitem] = useState(null)
  
  const [openQuickNav, setQuicknav] = useState(false)

  const [modalOpened, setModalOpened] = useState(false)

  // Set active nav from page URL
  useEffect(() => {
    // Contacts
    if (location.pathname.includes('/companies')) {
      setActiveNav('Contacts')
      setActiveSubitem('Companies')
    }
    else if (location.pathname.includes('/people')) {
      setActiveNav('Contacts')
      setActiveSubitem('People')
    }

    // To Dos
    else if (location.pathname === '/to-do') {
      setActiveNav('To Dos')
    }

    // Work
    else if (location.pathname.includes('/projects')) {
      setActiveNav('Work')
      setActiveSubitem('Projects')
    }
    else if (location.pathname.includes('/estimates')) {
      setActiveNav('Work')
      setActiveSubitem('Estimates')
    }
    else if (location.pathname.includes('/purchases')) {
      setActiveNav('Work')
      setActiveSubitem('Purchases')
    }
    else if (location.pathname.includes('/invoices')) {
      setActiveNav('Work')
      setActiveSubitem('Invoices')
    }
    else if (location.pathname === '/reports') {
      setActiveNav('Work')
      setActiveSubitem('Reports')
    }

    // Settings
    else if (location.pathname === '/profile') {
      setActiveNav('Settings')
      setActiveSubitem('Your profile')
    }
    else if (location.pathname.includes('/team')) {
      setActiveNav('Settings')
      setActiveSubitem('Your team')
    }
    else if (location.pathname === '/settings') {
      setActiveNav('Settings')
      setActiveSubitem('Company settings')
    }
    else if (location.pathname.includes('/items-and-tasks')) {
      setActiveNav('Settings')
      setActiveSubitem('Items & Tasks')
    }
    else if (location.pathname.includes('/expenses')) {
      setActiveNav('Settings')
      setActiveSubitem('Expenses')
    }
    else if (location.pathname === '/subscription') {
      setActiveNav('Settings')
      setActiveSubitem('Subscription')
    }
  }, [])

  const navItems = [
    {
      item: 'To Dos',
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
        <Tooltips />
        <HeaderTop>
          <HeaderLogo>
            <img src={RunStudioRunLogo} alt="Run Studio Run logo" />
            <span>
              Run<br/>
              Apple<br/>
              Run
            </span>
          </HeaderLogo>
          <HeaderNav>
            {
              navItems.map(item => (
                <Link to={`#`} key={item.item} onClick={(e) => {
                  
                  setActiveNav(item.item)

                  if (item.item === 'To Dos') {
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
            <AddCircleIcon 
              onClick={(e) => {
                setQuicknav(!openQuickNav)
                setNavOpen(false)
                setHelpOpen(false)
              }}
              className={openQuickNav ? 'active' : null} 
            />
            <QuickNav className={openQuickNav ? 'active' : ''}>
              <h2>Quick</h2>
              <Columns>
                <Column>
                  <h5>Projects</h5>
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
                    // setModalTitle('Additional Time')
                    setModalOpened(!modalOpened)
                    setQuicknav(false)
                  }}>
                    Additional Time
                  </Link>
                </Column>
                <Column>
                  <h5>Contacts</h5>
                  <Link to="/companies/add" onClick={() => setQuicknav(false)}>
                    Add Company
                  </Link>
                  <Link to="/companies/import" onClick={() => setQuicknav(false)}>
                    Import Company
                  </Link>
                  <Link to="/people/add" onClick={() => setQuicknav(false)}>
                    Add People
                  </Link>
                  <Link to="/people/import" onClick={() => setQuicknav(false)}>
                    Import People
                  </Link>
                  <Link to="/people/sync" onClick={() => setQuicknav(false)}>
                    Sync Contacts
                  </Link>
                </Column>
                <Column>
                  <h5>Profile & Settings</h5>
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
            <HelpIcon onClick={(e) => {
              setHelpOpen(!helpOpen)
              setQuicknav(false)
              setNavOpen(false)
            }} />
            <Dropdown className={helpOpen ? 'help-dropdown active' : 'help-dropdown'}>
              <Link to="#">
                Support Guide
              </Link>
              <Link to="#">
                Show Tooltips
              </Link>
              <Link to="#">
                Email us
              </Link>
            </Dropdown>
            <Avatar alt={ user?.displayName } src={ user?.photoURL } onClick={(e) => {
              setNavOpen(!navOpen)
              setQuicknav(false)
              setHelpOpen(false)
            }}>
              { user?.displayName.charAt(0) } 
            </Avatar>
            <Dropdown className={navOpen ? 'active' : ''}>
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
            </Dropdown>
          </HeaderActions>
        </HeaderTop>
        <HeaderSubnav> 
          <LeftSpace />
          <SubnavLinks className={location.pathname.includes("/projects/") ? 'hidden' : 'shown'}>
            {
              location.pathname === "/to-do" || location.pathname === '/kanban' || location.pathname === '/trello' ?
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
            {
              // location.pathname === "/to-do" || location.pathname === '/kanban' || location.pathname === '/trello' ?
              //   <>
              //     <Link to="/to-do">Timeline</Link>
              //     <Link to="/kanban">Kanban</Link>
              //     <Link to="/trello">Trello</Link>
              //   </>
              // :
              // null
            }
          </SubnavLinks>
          <SubnavSearch>

            <Grid item xs={12} sm={12}>
              <FormGroup style={{ position: 'relative' }}>
                <FormControl variant="outlined">
                  <TextField
                    id="search"
                    placeholder="Search..."
                    variant="outlined"
                  />
                </FormControl>
                <SearchIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11.998" height="12" viewBox="0 0 11.998 12">
                    <path id="Path_2496" data-name="Path 2496" d="M11.835-5.375,9.5-7.712a.562.562,0,0,0-.4-.164H8.718a4.851,4.851,0,0,0,1.031-3A4.874,4.874,0,0,0,4.875-15.75,4.874,4.874,0,0,0,0-10.875,4.874,4.874,0,0,0,4.875-6a4.851,4.851,0,0,0,3-1.031v.382a.562.562,0,0,0,.164.4l2.336,2.336a.56.56,0,0,0,.794,0l.663-.663A.565.565,0,0,0,11.835-5.375Zm-6.96-2.5a3,3,0,0,1-3-3,3,3,0,0,1,3-3,3,3,0,0,1,3,3A3,3,0,0,1,4.875-7.876Z" transform="translate(0 15.75)" fill="#b1b0af"/>
                  </svg>
                </SearchIcon>
              </FormGroup>
            </Grid>

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
  background-color: var(--text-gray);
  padding: 0 30px;
`

const HeaderLogo = styled.div`
  position: relative;
  top: 4px;
  width: 12.5%;
  display: flex;

  > img {
    margin-right: 2.5px;
    max-height: 50px;
  }

  > span {
    color: #fff;
    font-weight: 700;
    letter-spacing: .65px;
    line-height: .95;
    text-transform: uppercase;
    font-size: 15px;
  }
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
    background: #fff;
    color: var(--text-gray);
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
    transition: background .25s ease-in-out, transform .25s ease-in-out;
  }

  > .MuiSvgIcon-root:first-child {
    &.active {
      transform: rotate(135deg);
      fill: var(--gold)
    }
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

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 46px;
  right: -999px;
  box-shadow: 0px 0px 8px #00000033;
  border-radius: 0px 0px 4px 4px;
  padding: 15px;
  background: var(--white);
  min-width: 175px;
  z-index: 1;
  opacity: 0;
  transition: opacity .35s ease-in-out;

  > a {
    padding: 5px 10px;
    text-decoration: none;
    color: #292724;
    font-size: 14px;
    word-wrap: none;
  }

  > a:hover {
    background: #F4F2F0;
  }

  &.active {
    display: flex;
    opacity: 1;
    transition: opacity .35s ease-in-out;
    right: 0;
  }

  &.help-dropdown.active {
    right: 42.5px;
  }
`

const HeaderSubnav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--white);
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
    color: var(--white);
  }

  > a.active {
    background-color: var(--gold);
    color: var(--white);
  }

  &.hidden {
    display: none;
  }

  &.shown {
    display: flex;
  }
`

const SubnavSearch = styled.div`
  flex: 0.2;
  margin-right: 20px;

  input {
    width: 100%;
    padding: 4px !important;
    margin: 4px !important;
  }

  .MuiOutlinedInput-notchedOutline {
    border: 0;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-100%, -50%);
`

const QuickNav = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 46px;
  right: -999px;
  box-shadow: 0px 0px 8px #00000033;
  border-radius: 0px 0px 4px 4px;
  padding: 15px;
  background: var(--white);
  z-index: 5;
  opacity: 0;
  transition: opacity .35s ease-in-out;

  &.active {
    opacity: 1;
    right: 85px;
    transition: opacity .35s ease-in-out;
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

  > h5 {
    color: var(--gold);
    margin-bottom: 20px;
    font-weight: 500;
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
