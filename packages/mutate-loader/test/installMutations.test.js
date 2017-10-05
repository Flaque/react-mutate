const { installMutations, loadMutations } = require("../src/index.js");
const tmp = require("tmp");
const fs = require("fs");
const path = require("path");

describe("installMutations", () => {
  it("exists", () => {
    expect(installMutations).toBeDefined();
  });

  it("successfully installs a node_module", async () => {
    const tmpobj = tmp.dirSync();
    const INSTALLED_MODULE = "react-mutate-test-mutation";
    await installMutations([INSTALLED_MODULE], tmpobj.name);

    // tmpDir/mutations
    const mutationsPath = path.resolve(tmpobj.name, "mutations");
    expect(fs.existsSync(mutationsPath)).toBe(true);

    // tmpDir/mutations/node_modules
    const nodeModulesPath = path.resolve(mutationsPath, "node_modules");
    expect(fs.existsSync(nodeModulesPath)).toBe(true);

    // tmpDir/mutations/package.json
    const packageJsonPath = path.resolve(mutationsPath, "package.json");
    expect(fs.existsSync(packageJsonPath)).toBe(true);

    // tmpDir/mutations/node_modules/is-positive
    const isPositivePath = path.resolve(nodeModulesPath, INSTALLED_MODULE);
    expect(fs.existsSync(isPositivePath)).toBe(true);

    tmp.setGracefulCleanup();
  });
});
