# all-ten src

The entry point of the project is `src/main.ts`.

## Tests

Jest tests appear in this directory as `.test.ts` files. Storybook stories
appear in this directory as `.stories.tsx` files. Jest snapshot data is stored
in `__snapshots__` directories.

## expr

The expr directory contains utility functions for dealing with All Ten's
expressions. This includes validation, parsing, syntax, evaluation, and some
reformatting.

Since this is the brains of the project, it has its own [README](./expr/README.md).

## state

The state directory contains the MobX classes and some other model-level code.

## view

The view directory contains the React components used to render the page.

This has very few comments for two reasons. One is that the current view layer
is much more of a prototype than the rest of the code here. The other is that
Storybook better explains the code than comments could.

## util

The util directory contains miscellaneous utility functions without a better
home.
