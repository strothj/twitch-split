import React, { Component, PropTypes } from 'react';
import './Input.scss';

class Input extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
  };

  static defaultProps = { className: '' };

  componentDidMount() {
    this.input.focus();
  }

  blur = () => {
    // Add a small delay so click handlers in other components have a chance to
    // fire.
    setTimeout(() => {
      this.props.onBlur();
    }, 300);
  }

  render() {
    return (
      <section
        className={`search-input ${this.props.className}`}
      >
        <form
          onSubmit={(e) => { e.preventDefault(); }}
        >
          <input
            type="text"
            ref={(c) => { this.input = c; }}
            onChange={(e) => { this.props.onChange({ value: e.target.value }); }}
            onBlur={this.blur}
            onFocus={() => { this.props.onFocus(); }}
            value={this.props.value}
            disabled={this.props.disabled}
          />
        </form>
      </section>
    );
  }
}

export default Input;
