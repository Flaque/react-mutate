const jetpack = require("fs-jetpack");
const path = require("path");
const {
  MUTATIONS_FOLDER_NAME,
  PACKAGE_JSON,
  PACKAGE_JSON_CONTENT
} = require("./constants.js");
const invariant = require("invariant");

const makeFolderLibraryIfNotExist = enclosingFolder => {
  const here = jetpack.cwd(enclosingFolder);
  here.dir(MUTATIONS_FOLDER_NAME).file(PACKAGE_JSON, {
    content: PACKAGE_JSON_CONTENT
  });
};

const pathToMutations = enclosingFolder =>
  path.resolve(enclosingFolder, MUTATIONS_FOLDER_NAME);

const loadMutationsFromDependencies = (deps, node_modules_path) => {
  const mutations = {};
  Object.keys(deps).forEach(name => {
    const filepath = path.resolve(node_modules_path, name);
    const mut = require(filepath).mutations;
    mutations[name] = mut;
  });

  return mutations;
};

module.exports = {
  makeFolderLibraryIfNotExist,
  pathToMutations,
  loadMutationsFromDependencies
};
