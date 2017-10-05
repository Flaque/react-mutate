import raf from "./tmpReact16Fix.js"; //Remove when React/Enzyme figure their shit out

// Setup Enzyme
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
const { shallow } = Enzyme;

import React from "react";
import { mutate } from "../src/index.js";

const FakeComponent = () => <h1>test</h1>;

describe("mutate", () => {
  it("will return the original component if there doesn't exist a mutation", () => {
    const Component = mutate(FakeComponent, {});
    const wrapper = shallow(<Component />);
    expect(wrapper.html()).toBe("<h1>test</h1>");
  });

  it("will throw an error if mutate is undefined", () => {
    expect(() => {
      const Component = mutate(FakeComponent, undefined);
      shallow(<Component />);
    }).toThrow();
  });

  it("will return a different component if that's available", () => {
    const MutatedComponent = () => {
      return () => <p>mutate</p>;
    };
    const Component = mutate(FakeComponent, {
      FakeComponent: MutatedComponent
    });

    const wrapper = shallow(<Component />);
    expect(wrapper.html()).toBe("<p>mutate</p>");
  });

  it("can mutate a mutated component", () => {
    const Base = ({ children }) => <p>{children}</p>;
    const withMutation = Component => {
      return class extends React.Component {
        render() {
          return <Component>hi</Component>;
        }
      };
    };

    const Component = mutate(Base, {
      Base: withMutation
    });
    const wrapper = shallow(<Component />);

    expect(wrapper.html()).toBe("<p>hi</p>");
  });

  it("will throw an error if there's no mutations", () => {
    expect(() => {
      const Component = mutate(<div> hi </div>);
      shallow(<Component />);
    }).toThrowError();
  });
});
