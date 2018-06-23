# Functional Language Single-Page Application Demos

> Goal: Compare/contrast writing basic SPAs in [Elm](http://elm-lang.org/), [Fable (F#)](http://fable.io), and [ReasonML](https://reasonml.github.io)

## Requirements

- Define pages:
  - Home page:
    - Located at `/`
    - Contains a single `div` element with the text `Home`
  - About page:
    - Located at `/about`
    - Contains a single `div` element with the text `About`
  - 404 page:
    - Located at `/404`
    - Contains a single `div` element with the text `404: Not Found`
- Define a shared layout with:
  - A `nav` menu pointing to Home and About pages
  - A `div` containing the current page's content
- Leverage History API for internal links
  - Should not perform a hard refresh between internal pages
- Handle links to unknown pages/content by showing 404 page
- Pre-render to static HTML
  - Leverage progressive enhancement
  - Navigation between pages should occur with JavaScript disabled

## Implementations

- [Elm](elm-demo)
- [Fable](fable-demo)
- [Reason](reason-demo)

## Structure

Projects are structured to be as similar as possible with the others. The primary portions of the projects are discussed below.

#### `src`

This contains the main project source files, i.e. what gets built into the final application. The modules include:

- `index.html` - HTML wrapper for the page
- `Main` - Entrypoint for the application
- `Components` - Generic/shared components
- `Pages` - Components for each of the pages
- `Routes` - Types and helpers for routing the application

#### `package.json`

Application dependencies from NPM are defined here. Projects use [Yarn](https://yarnpkg.com) as the primary task runner, delegating to other tools when required. Tasks include:

- `yarn build` - Builds the application in production mode
- `yarn clean` - Clean the application workspace
- `yarn start` - Start the application in development mode
- `yarn test` - TODO: Run test suites against the application

##### Notes

The Elm project defines additional dependencies in `elm-project.json` that are pulled from the [Elm Package repository](http://package.elm-lang.org). It is the only project that does not use React as it provides its own virtual DOM library.

The Fable project defines additional dependencies in `src/fable-demo.fsproj` that are pulled from [NuGet](https://www.nuget.org/), the .NET package repository.

#### `webpack.config.js`

[Webpack 4](https://webpack.js.org/) is used to build the projects for production and is leveraged by `webpack-serve` to build and serve the projects for development. `webpack.config.js` holds the configuration for both.

##### Notes

The Elm project's build tools are pulled from NPM and require no external dependencies on the build system.

The Fable project's build tools are pulled from the [.NET Core v2 SDK](https://www.microsoft.com/net), which is required to be installed on the build system.

The Reason project's build tools are pull from NPM and require no external dependencies on the build system.

## Observations

- Build times affect developer experience
- Community age can affect ability to solve problems

#### Elm

##### Pros

- Fast build times
- Smaller bundle size (~ 82 KB)
- Useful compiler feedback on warnings and errors

##### Cons

- Newer community
- Difficult JavaScript interop

#### Fable

##### Pros

- Easy JavaScript interop
- Older community (thanks to .NET/F#)
- Useful compiler feedback on warnings and errors

##### Cons

- Slow build times. Building in watch mode during development seems to help with this some.
- Larger bundle size (~ 138 KB)

#### Reason

##### Pros

- Fast build times
- Easy JavaScript interop

##### Cons

- Larger bundle size (~ 121 KB)
- Newer community. Mitigated some by using BuckleScript/Ocaml under the hood
- Compiler feedback on some errors (e.g. syntax errors) make super errors not so super

## License

Each project is licensed under the MIT License, and this repository itself is licensed under the MIT License as well. See [LICENSE](LICENSE) for details.
