import './Card.css';

const Card = ({ children, hover = false, className = '' }) => {
  return (
    <div className={`card ${hover ? 'card--hover' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
