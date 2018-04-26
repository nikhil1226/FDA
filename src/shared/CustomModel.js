import React from 'react';
import _isEqual from 'lodash/isEqual';
import { Modal } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import { SvgiPlus, SvgiMinus } from '../components/SVGIcons';

class ModelCustom extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    let isRender = true;
    if (_isEqual(nextProps, this.props)) {
      isRender = false;
    }
    return isRender;
  }
  render() {
    const {
      showModel, title, bodyContent, submitLabel, closeLabel,
      onSubmitClick, onCloseClick, bodyClassName
    } = this.props;
    return (
      <Modal
        bsSize="small"
        aria-labelledby="contained-modal-title-sm"
        show={showModel}
        onHide={onCloseClick}
      >
        {title && <Modal.Header>
          <Modal.Title
            aria-labelledby="contained-modal-title-sm"
            className="text-center"
          >
            <h4 className="text-center"> {title} </h4>
          </Modal.Title>
        </Modal.Header>}

        {bodyContent && <Modal.Body className={bodyClassName}>
          {bodyContent}
        </Modal.Body> }

        <Modal.Footer>
          {submitLabel && <RaisedButton
            className="margin-right buttonStyle"
            label={submitLabel}
            onTouchTap={onSubmitClick}
            icon={<SvgiPlus />}
          />}

          {closeLabel && <RaisedButton
            className="margin-right buttonStyle"
            label={closeLabel}
            onTouchTap={onCloseClick}
            icon={<SvgiMinus />}
          />}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModelCustom;
