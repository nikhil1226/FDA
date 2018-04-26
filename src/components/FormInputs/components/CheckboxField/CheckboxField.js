import React from 'react';
import _isEqual from 'lodash/isEqual';
import Checkbox from 'material-ui/Checkbox';

class CheckboxField extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    let isRender = true;
    if (_isEqual(nextProps, this.props)) {
      isRender = false;
    }
    return isRender;
  }

  render() {
    const { labelName, onClick, onChecked, onDisabled, onErrorText } = this.props;
    return (
      <div>
        <Checkbox
          label={labelName}
          onCheck={onClick}
          checked={onChecked}
          disabled={onDisabled}
        />
        <p className="danger">
          {onErrorText !== '' ? onErrorText : ''}
        </p>
      </div>
    );
  }
}
export default CheckboxField;
