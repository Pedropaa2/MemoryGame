import styled from "styled-components";
const Card = styled.div.attrs(props => ({
 
  $isFlipped: props.$isFlipped,
  $isMatched: props.$isMatched
}))`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  background-color: ${props => 
    props.$isMatched ? 'transparent' : 
    props.$isFlipped ? 'lightyellow' : 'lightblue'};
  
  transform: rotateY(${props => props.$isFlipped ? '180deg' : '0deg'});
  transform-style: preserve-3d;

  .card-content {
    transition: opacity 0.3s;
    opacity: ${props => props.$isFlipped ? 1 : 0};
    transform: rotateY(${props => props.$isFlipped ? '180deg' : '0deg'});
  }

  &:active {
    transform: scale(0.95);
  }
`;
export default Card