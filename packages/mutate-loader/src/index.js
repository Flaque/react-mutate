const npm = require("npm-programmatic");
const jetpack = require("fs-jetpack");
const {
  MUTATIONS_FOLDER_NAME,
  PACKAGE_JSON,
  NODE_MODULES,
  PACKAGE_JSON_CONTENT
} = require("./constants.js");
const {
  makeFolderLibraryIfNotExist,
  pathToMutations,
  loadSingleMutation,
  loadMutationsFromDependencies
} = require("./util.js");
const path = require("path");
const errorIf = require("@flaque/error-if");

/**
 * Installs a list of npm modules as "mutations" in a folder called
 * "mutations" using `npm`.
 * @param {Array} modules 
 * @param {String} enclosingFolder 
 * @return {Promise}
 */
function installMutations(modules, enclosingFolder) {
  if (modules.length === 0) {
    return new Promise(resolve => resolve({}));
  }

  makeFolderLibraryIfNotExist(enclosingFolder);
  return npm.install(modules, {
    cwd: pathToMutations(enclosingFolder),
    save: true
  });
}

/**
 * Loads mutations from a folder inside the `enclosingFolder` called "mutations".
 * @param {String} enclosingFolder 
 * @return {JSON} a map of the mutation name to the mutation's export.
 */
function loadMutations(enclosingFolder) {
  const here = jetpack.cwd(pathToMutations(enclosingFolder));

  const pkg = here.read(PACKAGE_JSON, "json");
  errorIf(
    !pkg,
    `There doesn't seem to be a package.json file. 
Did you create one at the enclosing folder? 
FYI: installMutations creates one for you if you don't have one. `
  );

  const node_modules_path = here.dir(NODE_MODULES).cwd();

  return new Promise((resolve, reject) => {
    // Load in mutations from dependencies
    const mutations = loadMutationsFromDependencies(
      pkg.dependencies,
      node_modules_path
    );
    resolve(mutations);
  });
}

module.exports = { installMutations, loadMutations };
