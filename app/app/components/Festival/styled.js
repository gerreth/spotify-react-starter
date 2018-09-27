import styled from 'styled-components'

import { theme } from 'theme/'

const {
  sizes: {
    base
  }
} = theme

// Styled components
export const FestivalWrapper = styled.div`
  margin: 0 0 ${base*6}px;
  width: ${base*100}px
`

export const FestivalDate = styled.div`
  color: #999;
  font-size: .8em;
  line-height: ${base*3}px;
`

export const FestivalName = styled.div`
  font-size: 1.5em;
  line-height: ${base*7}px;
`

export const FestivalBandsWrapper = styled.div`
  line-height: ${base*4}px;
`

export const FestivalLocation = styled.div`
  color: #999;
  font-size: .8em;
  font-weight: 600;
  line-height: ${base*3}px;
`
