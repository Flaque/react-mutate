const { installMutations, loadMutations } = require("../src/index.js");
const tmp = require("tmp");
const isfunction = require("isfunction");

test("loadMutations exists", () => {
  expect(loadMutations).toBeDefined();
});

test("installMutations doesn't crash if no mutations are passed in", async () => {
  await installMutations([], "i-shouldnt-matter"); // If this completes, then we pass
});

describe("loadMutations", () => {
  const INSTALLED_MODULE = "react-mutate-test-mutation";
  let tmpobj;

  beforeAll(async () => {
    tmpobj = tmp.dirSync();
    await installMutations([INSTALLED_MODULE], tmpobj.name);
  });

  test("it loads installed mutations", async () => {
    const mutes = await loadMutations(tmpobj.name);
    expect(mutes[INSTALLED_MODULE]).toBeDefined();
  });

  test("it loads installed mutations as functions", async () => {
    const mutes = await loadMutations(tmpobj.name);
    const firstKey = Object.keys(mutes[INSTALLED_MODULE])[0];
    const aMutationFunction = mutes[INSTALLED_MODULE][firstKey];

    expect(isfunction(aMutationFunction)).toBe(true);
  });
});
