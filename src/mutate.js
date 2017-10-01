import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

/**
 * A React HOC that returns a component that the user can mutate.
 * @param {React} Component The component we will mutate
 * @param {Object} mutations A map of React displaynames to objects 
 */
function mutate(Component, mutations) {
  class Mutated extends React.Component {
    constructor(props, context) {
      super(props);

      mutations = mutations || context.mutations;

      invariant(
        mutations,
        `mutate() did not find any mutations. 
          You're recieving this error either because you called mutate() in a component 
          that wasn't wrapped in a <MutationsProvider/> or because you only gave a single 
          argument to mutate().`
      );

      this.name = Component.displayName || Component.name;
      this.ToRender = mutations[this.name]
        ? mutations[this.name](Component) // Apply HOC function
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
