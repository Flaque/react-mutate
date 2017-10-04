const { installMutations, loadMutations } = require("../src/index.js");
const tmp = require("tmp");

describe("loadMutations", () => {
  test("it exists", () => {
    expect(loadMutations).toBeDefined();
  });

  test("it loads installed mutations", async () => {
    const tmpobj = tmp.dirSync();
    const INSTALLED_MODULE = "react-mutate-test-mutation";
    await installMutations([INSTALLED_MODULE], tmpobj.name);

    const mutes = await loadMutations(tmpobj.name);
    expect(mutes[INSTALLED_MODULE]).toBeDefined();
  });
});
