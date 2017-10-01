# react-mutate

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

## Simple Example

`react-mutate` asks you to create a JSON map with `displayNames` or function names as keys and React [Higher Order Components](https://reactjs.org/docs/higher-order-components.html) as values. 
If you haven't seen HOC's before, they're basically just functions that take a React component and then return a different or modified React component.

So for example, we might make something like this:

``` js 
// A function that takes a React component and returns a modified version.
const insideHeader = Component => {
    return props => <h1> <Component {...props}/> </h1>;
};

// The mutations we got from our users
const userMutations = {
    "Text" : insideHeader
}
```

Now, we'll wrap our React component in `mutate` and then any item with the `displayName` or `name` `Text` will render with `<h1>`'s.  

``` js 
// ... other imports
import { mutate } from "react-mutate";

const Text = ({children}) => <p> {children} </p>;

class MyComponent extends React.Component {
    render() {
        return <Text> Hello World! </Text>;
    }
}

export default mutate(MyComponent, userMutations); // Wrapping at the end
```

## Using MutationsProvider

If you maintain a single list of all the mutations (or extensions) that your users have created, it can get tedious to pass that around everywhere, especially if you're not using something like redux. 

So instead, you can use `MutationProvider` which lets you define your mutations at the root of your app and then lets you [magically](https://reactjs.org/docs/context.html) ignore the second argument to `mutate`.

For example:

``` js
// MyComponent.js
const Text = ({children}) => <p> {children} </p>;

class MyComponent extends React.Component {
    render() {
        return <Text> Hello World! </Text>;
    }
}

export default mutate(MyComponent) // userMutations are taken care of by the MutationsProvider
```

``` js 
// index.js
import { MutationsProvider } from 'react-mutate';
import MyComponent from "./MyComponent.js";

class App extends React.Component {
    render() {
        <MutationsProvider mutations={userMutations}>
            <MyComponent />
        </MutationsProvider>
    }
}
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