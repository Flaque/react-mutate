# Mutations Loader

The loader in `@react-mutate/loader` is a series of tools to help load in mutations as npm-modules.

You give the loader a path where you want to store user mutations and it will create a mini-node project like this:
```
MyEnclosingFolder
    - mutations
        - package.json
        - node_modules
```

## `installMutations`

You can use `installMutations` to add some extensions to your app. If you don't have a `mutations` folder, it will create one for you. 

### Examples

``` js 
import { installMutations } from "@react-mutate/loader";

installMutations(["some-npm-module-name", "another-one", "another-other-one"], "path/to/save/folder");
```

## `loadMutations`

You can use `loadMutations` to pull from your save folder and get a list of mutations that you can pass into `<MutationsProvider />`.

### Examples

``` js
import { loadMutations } from "@react-mutate/loader";

const mutations = await loadMutations("path/to/save/folder");
const toRender = (
  <MutationsProvider mutations={mutations}>
    <App />
  </MutationsProvider>
);
```