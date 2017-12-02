import React, { Children } from "react";
import PropTypes from "prop-types";

class MutationsProvider extends React.Component {
  getChildContext() {
    const mutations = this.props.mutations;
    return { mutations };
  }

  render() {
    // Require 1 child so we don't have to wrap in a div
    return Children.only(this.props.children);
  }
}

MutationsProvider.propTypes = {
  mutations: PropTypes.object,
  children: PropTypes.element.isRequired
};

MutationsProvider.childContextTypes = {
  mutations: PropTypes.object,
  api: PropTypes.object
};

export default MutationsProvider;
