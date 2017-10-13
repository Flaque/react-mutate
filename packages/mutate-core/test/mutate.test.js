import raf from "./tmpReact16Fix.js"; //Remove when React/Enzyme figure their shit out

// Setup Enzyme
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;

import React from "react";
import { mutate, MutationsProvider } from "../src/index.js";

const FakeComponent = () => <h1>test</h1>;

describe("mutate", () => {
  it("will return the original component if there doesn't exist any mutations", () => {
    const Component = mutate(FakeComponent);
    const wrapper = shallow(
      <MutationsProvider>
        <Component />
      </MutationsProvider>
    );
    expect(wrapper.html()).toBe("<h1>test</h1>");
  });

  it("will return the original component if there isn't a matching mutation", () => {
    const NonMatchingMutationFunction = () => {};
    const mutations = {
      I_DONT_MATCH_YO_FACE: NonMatchingMutationFunction
    };

    const MutatedComponent = mutate(FakeComponent, "FakeComponent");
    const wrapper = mount(
      <MutationsProvider mutations={mutations}>
        <MutatedComponent />
      </MutationsProvider>
    );

    expect(wrapper.html()).toBe("<h1>test</h1>");
  });

  it("will return a different component if that's available", () => {
    const MutationFunction = () => {
      return () => <p>mutate</p>;
    };
    const mutations = {
      FakeComponent: MutationFunction
    };

    const MutatedComponent = mutate(FakeComponent, "FakeComponent");
    const wrapper = mount(
      <MutationsProvider mutations={mutations}>
        <MutatedComponent />
      </MutationsProvider>
    );

    expect(wrapper.html()).toBe("<p>mutate</p>");
  });
});
