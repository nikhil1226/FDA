import React, { Component } from 'react';

class MobileTearSheet extends Component {
  static defaultProps = {
    height: 500
  };
  render() {
    const { prepareStyles } = this.context.muiTheme;
    const styles = {
      root: {
        marginBottom: 24,
        marginRight: 24,
        maxWidth: 360,
        width: '100%'
      },
      container: {
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflow: 'hidden'
      },
      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        maxWidth: 360
      }
    };

    return (
      <div style={prepareStyles(styles.root)}>
        <div style={prepareStyles(styles.container)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MobileTearSheet;
