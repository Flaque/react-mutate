import React from "react";
import PropTypes from "prop-types";
import errorIf from "@flaque/error-if";
import is from "@sindresorhus/is";

/**
 * A React HOC that returns a component that the user can mutate.
 * @param {React} Component is the component we will mutate
 * @param {String} title is the name you want to associate with the mutation
 */
function mutate(Component, title, api = {}) {
  class Mutated extends React.Component {
    constructor(props, context) {
      super(props);

      this.ToRender = Component;
      const mutations = context.mutations;

      if (!mutations || !mutations[title]) {
        return;
      }

      // Convert old style mutations to new style mutations
      if (!Array.isArray(mutations[title])) {
        mutations[title] = [mutations[title]];
      }

      // Apply all mutations to the component
      for (let mut of mutations[title]) {
        this.ToRender = mut(this.ToRender, api);
      }
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
