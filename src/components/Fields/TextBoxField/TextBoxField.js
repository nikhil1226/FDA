import React from 'react';
import TextField from 'material-ui/TextField';

class TextBoxField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      isReadOnly: true
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ comment: nextProps.comment });
  }

  updateState = (newState) => {
    this.setState(newState);
  }

  updateComment = (e, row) => {
    this.props.onChange(e.target.value, row.original.materialBatchRecord);
    this.setState({ comment: e.target.value });
  }

  render() {
    return (
      <div>
        <TextField
          className="DescriptionTextfeild"
          hintText="Comments"
          errorText={!this.props.isReadOnly && this.state.comment === '' ? '__________' : ''}
          value={this.state.comment}
          onChange={(e) => this.updateComment(e, this.props.rowValue)}
          maxLength="300"
          multiLine
          readOnly={this.props.isReadOnly}
          rows={2}
        />
      </div>

    );
  }
}

export default TextBoxField;
