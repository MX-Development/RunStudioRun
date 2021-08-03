import React from 'react'
import styled from 'styled-components'

function FilterOption({ title, Icon, width }) {

  const itemWidth = width;

  return (
    <Item style={{ width: itemWidth + '%' }}>
      { title }
      <Icon />
    </Item>
  )
}

export default FilterOption

const Item = styled.div`
  font-size: 12px;
  text-transform: uppercase;

  > .MuiSvgIcon-root {
    font-size: 14px;
    padding-left: 2.5px;
    position: relative;
    top: 2px;
  }
`
