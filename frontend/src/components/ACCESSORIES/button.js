import React from 'react';
import PropTypes from 'prop-types';

const classes = 'btn btn-lg m-2 border';
const blockClasses = 'btn btn-lg m-2 border btn-block';

const Button = (props) => {
  const {
    name, onClick, glyph, colour, block,
  } = props;
  const c = colour === 'orange' ? 'FF652F' : colour;
  return (
    <button
      type="submit"
      onClick={onClick}
      className={block === '' ? classes : blockClasses}
      style={{ backgroundColor: `#${c}`, color: 'white' }}
    >
      <span className={`m-2 ${glyph}`} />
      {` ${name}`}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  glyph: PropTypes.string,
  colour: PropTypes.string,
  block: PropTypes.string,
};
Button.defaultProps = {
  block: '',
  glyph: '',
  colour: '5BC5A7',
};

export default Button;
