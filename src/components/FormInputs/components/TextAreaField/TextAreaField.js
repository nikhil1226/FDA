import React from 'react';
import _isEqual from 'lodash/isEqual';
import TextField from 'material-ui/TextField';

class TextAreaField extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    let isRender = true;
    if (_isEqual(nextProps, this.props)) {
      isRender = false;
    }
    return isRender;
  }

  render() {
    const { onHintText, onChange, onValue, onErrorText, onDisabled, onClassName } = this.props;
    const className = (typeof onClassName === 'undefined') ? 'textarea' : onClassName;
    return (
      <div>
        <TextField
          className={className}
          disabled={onDisabled}
          hintText={onHintText}
          value={onValue}
          onChange={onChange}
          maxLength="100"
          multiLine
          rows={2}
        />
        {onErrorText ? <span className="InputFieldErrorText">{onErrorText}</span> : ''}
      </div>
    );
  }
}

export default TextAreaField;
