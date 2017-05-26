import React from 'react';
import { connect } from 'react-redux';

/**
 * conditionalRenderer HOC to protect routes
 * @param {[type]} Component         Component to protect from rendering
 * @param {[type]} options.condition Function which receives state as a parameter and allows you to provide any condition. 
 * @param {[type]} options.onConditionSuccess Function post condition success. If not passed component will be rendered as default.
 * @param {[type]} options.onConditionFailure function post condition failure. If not passed component will not be rendered.
 */
export default function conditionalRenderer(Component, { condition, onConditionSuccess, onConditionFailure }) {
  
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
      if (condition(props)) {
        // if on validation success you may still not want the component to be rendered
        this.shouldRender = typeof onConditionSuccess === 'function' ? onConditionSuccess(props) : true;
        if (this.shouldRender === 'undefined') {
          this.shouldRender = true;
        }
      } else {
        // if on validation failure you may still want the component to be rendered
        this.shouldRender = typeof onConditionFailure === 'function' ? onConditionFailure(props) : false;
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
