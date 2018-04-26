import React from 'react';
import TextField from 'material-ui/TextField';
import { Modal, Row, Col } from 'react-bootstrap';

class CommentBoxField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }
  componentWillMount() {
    this.setState({ comment: this.props.comment });
  }

  updateState = (newState) => {
    this.setState(newState);
  }

  updateComment = (e, requestRecordId) => {
    this.props.onChange(e.target.value, requestRecordId);
    this.setState({ comment: e.target.value });
  }

  render() {
    const { rowValue, commentLabel, requestRecordId } = this.props;
    return (
      <Row className="show-grid">
        <Col className="text-right" xs={12} md={6}>
          Comments for {commentLabel} {requestRecordId} <span className="redrequired">*</span>
        </Col>
        <Col xs={12} md={6}>
          <TextField
            className="textarea"
            hintText="Description Max 100 Characters"
            value={this.state.comment}
            onChange={(e) => this.updateComment(e, requestRecordId)}
            maxLength="100"
            multiLine
            rows={2}
          />
        </Col>
      </Row>
    );
  }
}

export default CommentBoxField;
