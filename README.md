<p align="center">
  <img src="https://i.imgur.com/003JozN.png" width="350px" />
</p>

React Mutate is a tool that lets you swap out nodes in React's virtual DOM. The main use case is to allow end-users the ability to write and add extensions to a React application. 

## Disclaimer

**I have 0 idea if this is actually a good idea.** Take everything with a grain of salt. My team and I are testing this out for [our project, Aurora](https://github.com/tundra-code/aurora).

## Install

### With yarn

``` sh
$ yarn add react-mutate
```

### With npm

``` sh
$ npm install --save react-mutate
```

## Overview

React-Mutate is a series of packages that work with each other to let you do the following:
1. Allow users to create extensions as [React HOC's](https://reactjs.org/docs/higher-order-components.html).
2. Let them store those extensions as npm modules.
3. Load them in and then apply them to various nodes in your React virtual DOM.


### Building an extension 

A typical extension that your user will write has two files by default. The first is a `package.json` that includes a `mutations` attribute like this:

``` js
/* package.json */
{
    /* name, version, description, ect... */
    "mutations": {
        "Text": "./makeBold.js"
    }
}
```

This config says what React component the user wants to modify and what file contains the function that does the modifying.

``` js
/* makeBold.js */
export default (Text) => {
  return <b> <Text/> </b>;
}
```

For your users, that's it! 

### Installing user extensions
Next, you'll integrate this into your app with `react-mutate`. 

Then, on your app, you can use `@react-mutate/loader` to install these npm packages for each user. 

``` js
import { installMutations } from "@react-mutate/loader";

// Installs a bunch of extensions in some folder for user data
installMutations(["some", "list", "of", "npm", "modules"], "path/to/save/files"); 
```

### Loading user extensions

Then later, you can load in those modules with `loadMutations` as a JSON object.

``` js
import { loadMutations } from "@react-mutate/loader";

const mutations = await loadMutations("path/to/save/files");
```

### Integrating user extensions into React
You can wrap your app with a `<MutationsProvider />` and put those mutations you got from `loadMutations` in as a prop like so:

``` js
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
Then, inside your `App` you can specify which components you would like to be extendable with `mutate` like so:

``` js
// Text.js 
import { Mutate } from "@react-mutate/core";

// Some React component 
const Text = ({children}) => <p>{children}</p>

export default mutate(Text);
```

## Mutations vs Extensions
We've chosen to call these `mutations` instead of `extensions` because they work differently. With React mutations, a user can write an extension for another extension. 

For example, it's entirely possible to have an extension list that looks like this:

``` js
const userExtension = {
    "Base" : withAlpha,
    "WithAlpha": withBeta,
    "WithBeta": withGamma,
    // and so on...
}
```

Also, mutations don't need to render the existing code. Traditional JS extensions might just add the extension's JS directly onto the existing base, which can lead to slowdown. Mutations will render INSTEAD of the existing code. 

(Though it will still load in the code, so it'll still be larger and less efficient than no extensions)

Mutations also allow you to explicitly say what things are easily mutable and what things are not. This lets you clearly define your API and also incrementally add in extensibility to your applicaiton. 
