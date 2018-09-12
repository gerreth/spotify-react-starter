import styled from 'styled-components';

// Styled components
export const HeaderWrapper = styled.div`
  background: #FFFFFF;
  ${'' /* box-shadow: 0 -1px 3px rgba(0,0,0,0.25); */}
  border-bottom: 1px solid #d9dadc;
  line-height: 36px;
  padding: 18px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  a {
    color: #333;
    font-weight: 600;
    padding: 0 18px;
    text-decoration: none;
    text-transform: uppercase;
  }
`;
