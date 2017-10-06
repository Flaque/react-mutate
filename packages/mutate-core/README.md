# mutate-core

`@react-mutate/core` lets you swap out nodes in React's virtual DOM and contains `mutate` and `MutationsProvider`.


## Using `mutate` 

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

## Using `MutationsProvider`

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