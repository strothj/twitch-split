import PropTypes from 'prop-types';

export default {
  streams: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  className: PropTypes.string,
};
