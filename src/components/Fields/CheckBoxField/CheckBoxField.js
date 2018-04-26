import React from 'react';
import Checkbox from 'material-ui/Checkbox';

class CheckBoxField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: ''
    };
  }

  componentWillMount() {
    this.setState({ checked: this.props.onChecked });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ checked: nextProps.onChecked });
  }

  handleCheck = (row) => {
    this.props.onClick(row, this.state.checked);
    this.setState({ checked: !this.state.checked });
  };

  render() {
    return (
      <Checkbox
        onCheck={() => this.handleCheck(this.props.rowValue)}
        name={this.props.name}
        checked={this.state.checked}
        disabled={this.props.onDisable}
      />
    );
  }
}

export default CheckBoxField;
