import React from "react";
import PropTypes from "prop-types";
import errorIf from "@flaque/error-if";
import is from "@sindresorhus/is";

/**
 * A React HOC that returns a component that the user can mutate.
 * @param {React} Component is the component we will mutate
 * @param {String} title is the name you want to associate with the mutation
 */
function mutate(Component, title) {
  class Mutated extends React.Component {
    constructor(props, context) {
      super(props);

      const mutations = context.mutations;
      if (!mutations) {
        this.ToRender = Component;
        return;
      }

      this.ToRender = mutations[title]
        ? mutations[title](Component) // Apply HOC function
        : Component;
    }

    render() {
      const ToRender = this.ToRender;
      return <ToRender {...this.props} />;
    }
  }

  Mutated.contextTypes = {
    mutations: PropTypes.object
  };

  return Mutated;
}

export default mutate;
