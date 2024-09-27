import './TermSelector.css';

const TermSelector = ({ selectedTerm, onSelectTerm }) => {
  return (
    <div>
      <button
        onClick={() => onSelectTerm('Fall')}
        className={`term-button ${selectedTerm === 'Fall' ? 'selected' : ''}`}
      >
        Fall
      </button>
      <button
        onClick={() => onSelectTerm('Winter')}
        className={`term-button ${selectedTerm === 'Winter' ? 'selected' : ''}`}
      >
        Winter
      </button>
      <button
        onClick={() => onSelectTerm('Spring')}
        className={`term-button ${selectedTerm === 'Spring' ? 'selected' : ''}`}
      >
        Spring
      </button>
    </div>
  );
};

export default TermSelector;
