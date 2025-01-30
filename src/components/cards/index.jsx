import Card from "./style";

const CardsMemory = ({ children, isFlipped, isMatched, ...props }) => {
  return (
    <Card
      {...props}
      $isFlipped={isFlipped} 
      $isMatched={isMatched}
    >
      <span className="card-content">{isFlipped ? children : "?"}</span>
    </Card>
  );
};

export default CardsMemory;