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

const parsePkg = ({ mutations }) => {
  if (!mutations) {
    console.warn(
      `When loading a mutation's package.json file, we found that it didn't have a "mutations" attribute, so we're skipping it.`
    );

    return {};
  }

  return mutations;
};

const requireMutation = filepath => {
  return require(filepath).default;
};

const loadMutationFunctions = (mutationPath, mutations) => {
  return Object.keys(mutations).map(name => {
    const filepath = path.resolve(mutationPath, mutations[name]);
    return requireMutation(filepath);
  });
};

const loadSingleMutation = mutationPath => {
  const pkg = jetpack.cwd(mutationPath).read(PACKAGE_JSON, "json");
  const mutations = parsePkg(pkg);

  return loadMutationFunctions(mutationPath, mutations);
};

const loadMutationsFromDependencies = (deps, node_modules_path) => {
  const mutations = {};
  Object.keys(deps).forEach(name => {
    const filepath = path.resolve(node_modules_path, name);
    const mut = loadSingleMutation(filepath);
    mutations[name] = mut;
  });

  return mutations;
};

export {
  makeFolderLibraryIfNotExist,
  pathToMutations,
  loadSingleMutation,
  loadMutationsFromDependencies
};
