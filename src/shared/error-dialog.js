import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import { SvgiCancel } from '../components/SVGIcons';

class ErrorDialog extends React.Component {
  render() {
    return (
      <Modal show={this.props.showErrorModal} onHide={this.props.onHide}>
        <Modal.Body className="no-padding">
          <h4 className="text-center">{this.props.errorText}</h4>
        </Modal.Body>
        <Modal.Footer>
          <RaisedButton
            className="margin-right buttonStyle"
            label="Close"
            onTouchTap={this.props.onClick}
            icon={<SvgiCancel />}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ErrorDialog;
