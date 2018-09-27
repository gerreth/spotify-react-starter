import styled from 'styled-components';

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
`;
