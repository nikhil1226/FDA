import React from 'react';
import _isEqual from 'lodash/isEqual';
import RaisedButton from 'material-ui/RaisedButton';

class ButtonField extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    let isRender = true;
    if (_isEqual(nextProps, this.props)) {
      isRender = false;
    }
    return isRender;
  }

  render() {
    const { buttonLabel, onClick, buttonIcon } = this.props;
    return (
      <RaisedButton
        label={buttonLabel}
        className="table-button"
        onClick={onClick}
        icon={buttonIcon}
      />
    );
  }
}

export default ButtonField;
