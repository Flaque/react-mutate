<p align="center">
  <img src="https://i.imgur.com/003JozN.png" width="350px" />
</p>

React Mutate is a tool that lets you swap out nodes in React's virtual DOM. The
main use case is to allow end-users the ability to write and add extensions
(what we call `mutations`) to a React application.

## Disclaimer

**I have 0 idea if this is actually a good idea.** Take everything with a grain
of salt. My team and I are testing this out for
[our project, Aurora](https://github.com/tundra-code/aurora).

**This is really early in development** We've really only partially tested this
out yet, so I would probably not use it in production yet.

The API will probably change a lot. This project could be abandoned entirely.
North Korea could invade France. We could discover flying pigs in a cave
somewhere. 🐷✈️ You never know what's gonna happen.

### Double Disclaimer

A lot of the recent strategies for implementing this have been heavily inspired
by how [Hyper](https://github.com/zeit/hyper) does it's extensions (since they
also use HOC's as an extension strategy). Hyper is super cool and you should
really check it out!

## Install

### With yarn

```sh
yarn add @react-mutate/core @react-mutate/loader
```

### With npm

```sh
npm install --save @react-mutate/core @react-mutate/loader
```

## Overview

React-Mutate is a series of packages that work with each other to let you do the
following:

1. Allow users to create mutations (or extensions/plugins) as
   [React HOC's](https://reactjs.org/docs/higher-order-components.html).
2. Let them store those mutations as npm modules.
3. Load them in and then apply them to various nodes in your React virtual DOM.

### Building an extension

A typical extension that your user will write can be just one code file. You
should name it `index.js` or you can create
[a node project with a package.json](https://docs.npmjs.com/cli/init) and then
point the [main](https://docs.npmjs.com/files/package.json#main) attribute to be
the name of your file.

Your file should export a "mutations" attribute that is an object where the keys
are the components you would like to modify and the values are React HOC
functions that modify their keys.

For example, here, I want to make all the `<Text />` in this application bold.
So I'll write an `index.js` file that has a `Text` function that will take in a
component and return it wrapped in bold tags.

```js
/* index.js */
module.exports.mutations = {
  Text: Component => (
    <b>
      {" "}
      <Component />{" "}
    </b>
  )
};
```

Then, once I'm done, I can go and upload it to NPM with `npm publish`.
`@react-mutate/loader` can help project owners easily install and load in npm
projects as mutations.

### Installing user extensions

Next, you'll integrate this into your app with `react-mutate`.

Then, on your app, you can use `@react-mutate/loader` to install these npm
packages for each user.

```js
import { installMutations } from "@react-mutate/loader";

// Installs a bunch of extensions in some folder for user data
installMutations(
  ["some", "list", "of", "npm", "modules"],
  "path/to/save/files"
);
```

### Loading user extensions

Then later, you can load in those modules with `loadMutations` as a JSON object.

```js
import { loadMutations } from "@react-mutate/loader";

const mutations = await loadMutations("path/to/save/files");
```

### Integrating user extensions into React

You can wrap your app with a `<MutationsProvider />` and put those mutations you
got from `loadMutations` in as a prop like so:

```js
import { MutationsProvider } from "@react-mutate/core";

/* ... Somewhere inside your root level React component **/
render() {
    return (
        <MutationsProvider mutations={mutations}>
            <App/>
        </MutationsProvider>
    )
}
```

### Specifying which items can be extended

Then, inside your `App` you can specify which components you would like to be
extendable with `mutate` like so:

```js
// Text.js
import { Mutate } from "@react-mutate/core";

// Some React component
const Text = ({ children }) => <p>{children}</p>;

export default mutate(Text, "Text");
```

### Passing in an API

If you would like to pass in some functions, you can use the third optional
parameter of `mutate`:

```js
const API = () => {
  Foo: () => {
    console.log("Hello I am a function");
  };
};

const Text = ({ children }) => <p>{children}</p>;

export default mutate(Text, "Text", API);
```

#### If you're using redux, you may not need this.

With redux, you can just pass functions via `mapDispatchToProps`, which may help
you give specific components access only to certain apis.

```js
import { doFoo } from "./actions";

const Text = ({ children }) => <p>{children}</p>;

const mapDispatchToProps = dispatch => {
  return {
    Foo: () => dispatch(doFoo)
  };
};

export default connect(null, mapDispatchToProps)(mutate(Text, "Text"));
```

## Mutations vs Extensions

We've chosen to call these `mutations` instead of `extensions` because they work
differently. With React mutations, a user can write an extension for another
extension.

For example, it's entirely possible to have an extension list that looks like
this:

```js
const userExtension = {
  Base: withAlpha,
  WithAlpha: withBeta,
  WithBeta: withGamma
  // and so on...
};
```

Also, mutations don't need to render the existing code. Traditional JS
extensions might just add the extension's JS directly onto the existing base,
which can lead to slowdown. Mutations will render INSTEAD of the existing code.

(Though it will still load in the code, so it'll still be larger and less
efficient than no extensions)

Mutations also allow you to explicitly say what things are easily mutable and
what things are not. This lets you clearly define your API and also
incrementally add in extensibility to your applicaiton.
