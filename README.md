<p align="center">
  <img src="https://i.imgur.com/003JozN.png" width="350px" />
</p>

React Mutate is a tool that lets you swap out nodes in React's virtual DOM. The main use case is to allow end-users the ability to write and add extensions (what we call `mutations`) to a React application. 

## Disclaimer

**I have 0 idea if this is actually a good idea.** Take everything with a grain of salt. My team and I are testing this out for [our project, Aurora](https://github.com/tundra-code/aurora).

**This is really early in development** We've really only partially tested this out yet, so I would probably not use it in production yet. 

The API will probably change a lot. This project could be abandoned entirely. North Korea could invade France. We could discover flying pigs in a cave somewhere. 🐷✈️ You never know what's gonna happen. 

## Install

### With yarn

``` sh
yarn add react-mutate
```

### With npm

``` sh
npm install --save react-mutate
```

## Overview

React-Mutate is a series of packages that work with each other to let you do the following:
1. Allow users to create mutations (or extensions/plugins) as [React HOC's](https://reactjs.org/docs/higher-order-components.html).
2. Let them store those mutations as npm modules.
3. Load them in and then apply them to various nodes in your React virtual DOM.

## Building a mutation as a user

You should start by creating a new folder with a node project by running the following commands in your [terminal](http://www.macworld.co.uk/feature/mac-software/how-use-terminal-on-mac-3608274/).

``` sh
mkdir MyAwesomeMutation
cd MyAwesomeMutation
npm init
```

Follow the prompts or just press enter until it stops to go with the defaults. 

### Adding `mutations` to your `package.json`
A basic mutation has two files. The first file, `package.json` was already made for you by `npm init`. 

In that file, you'll add a `mutations` attribute to the JSON like this:

``` js
/* package.json */
{
    /* name, version, description, ect... */
    "mutations": {
        "Text": "./makeBold.js"
    }
}
```

The `mutations` attribute tells the base app what React nodes you want to change and how you want to change them. The key, `"Text"` is the [`displayName`](https://reactjs.org/docs/react-component.html#displayname) or `name` of the React component / functional component that you want to modify. 

### Adding a mutations file

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
