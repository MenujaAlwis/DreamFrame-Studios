import './Spinner.css';

const Spinner = ({ size = 'md' }) => {
  return <div className={`spinner spinner--${size}`}></div>;
};

export default Spinner;
