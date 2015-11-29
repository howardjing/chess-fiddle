import React, { Component, PropTypes } from 'react';

class EditableText extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  _startEditing () {
    this.setState({
      isEditing: true
    });
  }

  _onEditing (event) {
    let { onEditing } = this.props;
    onEditing(event.target.value);
  }

  _stopEditing () {
    let { onEdited } = this.props;
    this.setState({
      isEditing: false
    });
    onEdited();
  }

  componentDidUpdate () {
    let { isEditing } = this.state;
    if (isEditing) {
      this.refs.input.focus();
    }
  }

  render () {
    let { value, className, onEditing, onEdited } = this.props;
    let { isEditing } = this.state;

    if (isEditing) {
      return (
        <div className={ className }>
          <input ref="input" type="text" value={value} onChange={ this._onEditing.bind(this) } />
          <button onClick={ this._stopEditing.bind(this) }>save</button>
        </div>
      );
    } else {
      return (
        <div className={ className }
          onClick={this._startEditing.bind(this)}>
          { value }
        </div>
      );
    }
  }

}

EditableText.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onEditing: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired
};

export default EditableText;
