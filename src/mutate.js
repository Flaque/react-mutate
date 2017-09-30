import React from "react";

/**
 * A React HOC that returns a component that the user can mutate.
 * @param {React} Component The component we will mutate
 * @param {Object} mutations A map of React displaynames to objects 
 */
function mutate(Component, mutations) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.name = Component.displayName || Component.name;
      this.ToRender = mutations[this.name] ? mutations[this.name] : Component;
    }

    render() {
      const ToRender = this.ToRender;
      return <ToRender {...this.props} />;
    }
  };
}

export default mutate;
