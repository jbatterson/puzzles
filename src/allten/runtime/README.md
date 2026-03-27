# All Ten

Client for the All Ten game by Art of Problem Solving.

Initial coding and foundations were done by Palmer.

## Install and build

Make sure you have node installed on your machine. Version 16+ is recommended.

Clone the repo and run

```
npm install
```

To build the project,

```
npm run build
```

This will output `public/dist/bundle_allten.js`. Include this on a page to get
an `AllTenClient` global.

## How the app runs

With `bundle_allten.js` loaded, call `AllTenClient.render(containerElement, props)`
to put the game on the page. NOTE: in BA production, we don't supply the props
because we're using the defaults.

- `containerElement` is the DOM element to hold the game. React will take over
  this element, so do not modify it.
- `props` is an object (currently only used for development) with
  - `start`: Array of numbers giving the starting numbers for the game.
  - `targets`: Optional array of target numbers. Default to 1, 2, ..., 10.
  - `rules`: Optional object with special problem rules. These rules are
    available:
    - `forbidOps`: Array subset of `["+", "-", "*", "/"]` giving the operations
      not allowed in this problem.
    - `forbidParens`: True to forbid parentheses and intermediates.
    - `forbidConcat`: True to forbid concatenation, aka multidigit numbers.
    - `singleOps`: True to allow one copy of each operation per expression.
    - `opLimit`: Number limiting the total operations per expression. Setting
      this to `start.length - 2` means at least one use of concatenation is
      required in each expression.
    - `impossible`: Number giving the amount of targets that are impossible to
      obtain. The game will end in victory after all but this many targets
      are reached.

## Deploying to live

After running a build in this repo (`npm run build-prod`), you'll need to go to the
ba repo and follow the instructions in the All Ten README there to finish the
deployment.

Alternatively, copy the `/public/dist/bundle_allten.js` file that is created from the build and copy it into BA's `/assets/js` folder. The production build on BA should take care of the rest.

### Run in development

Initial testing of changes should be done with Jest and Storybook. See the
Develop section.

For testing new changes with the built client, `public` has index.html
and samples.html. Both can be visited in a browser even on `file:` URLs.

- index.html has an example of shell code to run `AllTenClient.render` with
  various options passed via query string.
- samples.html is a list of sample problems that link to index.html with
  various query strings.

For showing previews to others, Palmer ran the following script on a computer
with an aops test server configured:

```
# Below two lines needed for aup to work in a script.
shopt -s expand_aliases
source ~/.bash_profile

npm run build
mkdir -p ~/dev/aops/aops/m/sandbox/allten
cp -R public/ ~/dev/aops/aops/m/sandbox/allten
aup
```

This made the game available for others at the URLs
`https://pmaopstest.com/sandbox/allten/index.html` and
`https://pmaopstest.com/sandbox/allten/samples.html`.

## Develop

All source code to be built lives in `src`. The project uses React, MobX, and
Stitches. The development environment uses Typescript, Storybook, Webpack,
ESLint, Prettier, and Jest.

To run static analysis and tests, use

- `npm run check` to run all of these at once,
- `npm run lint` to run ESLint,
- `npm run pretty-all` to run Prettier,
- `npm run ts-check` to do type checking, and
- `npm test` to run Jest.

Storybook is used for developing views and manual testing. Run it with

```
npm run storybook
```

You are encouraged to update `public/index.html` and `public/samples.html`
if you make any changes that affect the usage of `AllTenClient.render`.

See [src/README](src/README.md) for more about the source code.
