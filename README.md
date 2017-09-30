# react-mutate

React Mutate is a simple little tool to help write extensions (or mutations) for individual react components.

## Install

### With yarn

``` sh
$ yarn add react-mutate
```

### With npm

``` sh
$ npm install --save react-mutate
```

## Example 
The general model looks something like this:

``` js 
import { mutate } from "react-mutate";

const userExtensions = {
    "MyReactNode" : SomeReactComponent,
    "SomeOtherReactNode" : SomeSillyReactComponent
};

const MutatedComponent = mutate(Default, userExtensions);

// Somewhere down the line you render <MutatedComponent />
```