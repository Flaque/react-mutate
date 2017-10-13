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
});
