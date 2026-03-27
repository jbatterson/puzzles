# all-ten src/expr

Expressions are handled by code in this directory.

## Data Structures

All of the major data structures are defined in `src/expr/types`. These include:

- `Rational`: Represents a rational number `p/q` as `[p, q]`. Reexported from
  `src/expr/Rational`.

- `ArithmeticOperator`: String, one of `+`, `-`, `*`, `/`. Reexported from
  `src/expr/Operators`.

- `ExpressionOperator`: String, one of `(`, `)` or any `ArithmeticOperator`.
  Reexported from `src/expr/Operators`.

- `ExpressionState`: An object containing all the data about a single
  expression, either completed or in-progress. It also has the numbers and
  rules from the original problem.

  The actual expressions come as the `main` and `interm` properties. `main` is
  an `ExpressionLine` with the top-level or actively-edited piece of the
  expression. `interm` is an array of `ExpressionLine`s, initially empty, with
  finished pieces of the expression, referred to as *intermediates*.

- `ExpressionLine`: An array of objects, each object representing a number or
  operator in an expression. This data structure is independent of the actual
  numbers in the problem and just provides index pointers. Example:
    ```js
    [
      {type: "start", index: 1},
      {type: "op", op: "+"},
      {type: "interm", index: 0},
    ]
    ```
  The above means the second starting number plus the first intermediate. An
  `ExpressionState` object is needed to know what numbers these actually refer
  to.

  All code treats `ExpressionLine` as immutable and clones the array before
  modification.

  Lines may be mathematically unintelligible. Such errors are generally
  detected in the process of turning it into an `ExpressionTree`.

- While not an actual type in `src/expr/types`, `ExpressionLine` has a string
  representation with conversion functions in both directions, which looks much
  closer to an actual expression. This makes it convenient to manually write an
  expression, used by tests, or output a line for debugging.

  The example line above would be equivalent to the string
    ```js
    "s0+i0"
    ```

- `ExpressionTree` is an internal structure that is used as a helper for
  validation and evaluating. It is mostly internal to `src/expr` and not seen
  outside of it. It turns an `ExpressionState` into a grouping-aware tree. The
  tree is a recursive structure with the following variants:

  - `type: "number"` represents any fixed rational number.
  - `type: "concat"` is the concatenation of multiple number nodes into a
    multidigit number. Trees may be built where the number nodes are not valid
    digits. This is only flagged as invalid by the evaluator code.
  - `type: "op"` is a term-operator-term-operator-...-term sequence, with
    exactly one more term than operator. Each term is also a tree. This node
    may mix operators of different precedences, but any parenthesized
    subexpression will become its own term.

  Every node has an optional source property. If set, it gives the starting
  index or intermediate index from which this node came from. Parsing an
  `ExpressionState` means filling in numbers and inserting the contents of each
  intermediate into the appropriate location, so the source field allows the
  tree to still retain which nodes came from where.

## Evaluation

An `ExpressionState` with syntactically valid expressions contains enough
information to produce an evaluated result, which will be a `Rational`. The
process for this is roughly as follows:

- Parse the expression into a tree. See `TreeParse.ts`.
- Check for any significant parsing errors. Stop and return them if any.
- Recursively evaluate the tree and return the result of the root node.
  See `Eval.ts`.
- Check for any evaluation errors.

In general the evaluation result will be null if there are any errors, like a
nonsense expression or a divide-by-zero.

## Error Handling

Functions that need to report errors generally do so by returning a `{value,
errors}` object. `value` is the return without error, which is generally null
when errors prevented any reasonable computation. `errors` is an array of
objects with `code`, `message`, and any other fields with details. All possible
errors and codes are defined in `src/expr/types`.

It is possible for the value to be non-null even with errors. In these cases it
is up to the caller to inspect the errors and determine whether that value has
any validity.

Thrown errors are only used in unexpected situations and indicate a program
bug.

The code has a concept of *partial errors*. These refer to errors that are okay
for an expression-in-progress to have. An example is an unclosed open
parenthesis. The UI only denies inputs when they result in expressions with an
error that is not partial.

## Tests

Code in this directory has fairly thorough tests in `Expressions.test.ts`.
These are functional tests rather than unit tests and aim for coverage of the
directory's major exports, like evaluation and validation.
