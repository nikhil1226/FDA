import React from 'react';
import _isEqual from 'lodash/isEqual';
import ReactSuperSelect from 'react-super-select';

class SelectBoxField extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    let isRender = true;
    if (_isEqual(nextProps, this.props)) {
      isRender = false;
    }
    return isRender;
  }

  render() {
    const {
      palceHolder, onOptionValueKey, onOptionLabelKey, onDisabled, onChange,
      onDataSource, errorText, onMultiple, onInitialValue, onKeepOpenOnSelection
    } = this.props;

    return (
      <div>
        <ReactSuperSelect
          placeholder={palceHolder}
          dataSource={onDataSource}
          optionValueKey={onOptionValueKey}
          optionLabelKey={onOptionLabelKey}
          clearable={false}
          clearSelectedValueOnDataSourceChange={!false}
          initialValue={onInitialValue}
          disabled={onDisabled}
          multiple={onMultiple}
          onChange={onChange}
          keepOpenOnSelection={onKeepOpenOnSelection}
        />
        <p className="danger">
          {errorText !== '' ? errorText : ''}
        </p>
      </div>
    );
  }
}
export default SelectBoxField;
