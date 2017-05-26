import React from 'react';
import { connect } from 'react-redux';

/**
 * ConditionalRenderer HOC to protect routes
 * @param {[type]} Component         Component to protect from rendering
 * @param {[type]} options.validator Function which receives state as a parameter and allows you to provide any condition. 
 * @param {[type]} options.validationSuccess Function post validation success. If not passed component will be rendered as default.
 * @param {[type]} options.validationFailure function post validation failure. If not passed component will not be rendered.
 */
export default function ConditionalRenderer(Component, { validator, validationSuccess, validationFailure }) {
  
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      this.authorize = this.authorize.bind(this);
      this.shouldRender = false;
    }
    componentWillMount() {
      this.authorize(this.props);
    }
    authorize(props) {
      if (validator(props)) {
        // if on validation success you may still not want the component to be rendered
        this.shouldRender = typeof validationSuccess === 'function' ? validationSuccess(props) : true;
        if (this.shouldRender === 'undefined') {
          this.shouldRender = true;
        }
      } else {
        // if on validation failure you may still want the component to be rendered
        this.shouldRender = typeof validationFailure === 'function' ? validationFailure(props) : false;
        if (this.shouldRender === 'undefined') {
          this.shouldRender = false;
        }
      }
    }
    render() {
      return this.shouldRender ? <Component shouldRender={this.shouldRender} {...this.props} /> : null;
    }
  }

  const mapStateToProps = (state) => state;
  
  return connect(mapStateToProps)(WrapperComponent);
}
