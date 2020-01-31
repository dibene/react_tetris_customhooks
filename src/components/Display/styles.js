import styled from 'styled-components';

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center; 
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  ${props => (props.startedGame ? 'box-shadow: 0px 11px 28px 0px rgba(0,225,255,1)' : '')};
  ${props => (props.startedGame ? 'text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px rgba(0,225,255,1), 0 0 30px rgba(0,225,255,1), 0 0 40px rgba(0,225,255,1), 0 0 55px rgba(0,225,255,1), 0 0 75px rgba(0,225,255,1);' : '')};
  ${props => (props.startedGame ? 'color: white' : '')};
  
  ${props => (props.gameOver ? 'box-shadow: 0px 11px 28px 0px red' : '')};
`;