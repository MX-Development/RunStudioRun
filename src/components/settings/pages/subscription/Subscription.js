import React from 'react'
import styled from 'styled-components'

import PageTitle from '../../../layout/pages/PageTitle'

import StackedBlocks from '../../components/StackedBlocks'
import Block from '../../components/Block'
import BlockContainer from '../../components/BlockContainer'

import Payment from './components/Payment'
import PaymentHistory from './components/PaymentHistory'

import OutlineHound from '../../../assets/img/outline-hound.svg'
import Users from './components/Users'
import ProfileBadge from '../../components/ProfileBadge'

function Subscription() {

  return (
    <>
      <PageTitle title={'Subscription'} />

      <BlockContainer>
        <StackedBlocks>

          <Block style={{ minHeight: 'none' }}>
            <ProfileBadge />
          </Block>

          <Block>
            <h2 style={{ fontWeight: '400', marginBottom: '8px' }}>Payment</h2>

            <p style={{ marginBottom: '16px' }}>
              <strong>You currently have <span style={{ color: 'var(--gold)' }}>5 subscriptions</span> and to add more please select an option below, proceed to payment and then assign to your user.</strong>
            </p>

            <Payment />

          </Block>

          <Block>
            <BlockHeading>
              <h3 style={{ marginBottom: '8px', color: 'var(--gold)', fontWeight: 'bold', fontSize: '18px' }}>Payment History</h3>
              <button className="btn btn-light-gray">Export</button>
            </BlockHeading>
            <div style={{ maxHeight: '350px', overflowY: 'scroll', paddingRight: '15px' }}>
              <PaymentHistory />
            </div>
          </Block>

        </StackedBlocks>
        <StackedBlocks>

          <Block background={'#DDDBD7'}>
            <div style={{ padding: '10px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ marginBottom: '8px', fontSize: '22px', fontWeight: 'bold' }}>30 Days Free Trial</h3>
              <h3 style={{ fontWeight: 'lighter', marginBottom: '8px' }}>6 Dec 2020 - 6 Jan 2021</h3>
              <h4 style={{ color: 'white' }}>28 Days Remaining</h4>
            </div>

            <img src={OutlineHound} style={{ position: 'absolute', right: '30px', top: '0', height: '100%' }} alt="outline hound" />
          </Block>

          <Block>
            <Users />
          </Block>

        </StackedBlocks>
      </BlockContainer>
    </>
  )
}

export default Subscription

const BlockHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
