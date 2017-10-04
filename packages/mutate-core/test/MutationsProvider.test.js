import raf from "./tmpReact16Fix.js"; //Remove when React/Enzyme figure their shit out

// Setup Enzyme
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;

import React from "react";
import { MutationsProvider, mutate } from "../src/index.js";

describe("MutationsProvider", () => {
  it("is defined", () => {
    expect(MutationsProvider).toBeDefined();
  });

  it("renders without errors", () => {
    const wrapper = shallow(
      <MutationsProvider mutations={{}}>
        <div> Hello </div>
      </MutationsProvider>
    );
  });

  it("can mutate a child without explicitly passing in mutaitons into mutate", () => {
    // Example basic mutation
    const putInHeader = Component => {
      return props => (
        <h1>
          <Component {...props} />
        </h1>
      );
    };

    // Create some text with some mutations
    const Text = () => <div> Hello There </div>;
    const MutatedText = mutate(Text);

    // Example mutations list
    const mutations = {
      Text: putInHeader
    };

    // Render with Mutations
    const wrapper = mount(
      <MutationsProvider mutations={mutations}>
        <MutatedText />
      </MutationsProvider>
    );

    expect(wrapper.find("h1").length).toBe(1);
  });
});
