# imp
The Imp - A Minimal Node Import Manager

## Introduction

`imp` lets you organize multiple one-to-many file-import associations for your projects.

No dependencies, no deals with the devil.

## Getting started

### Simple project

Let's say you have a file called `app.js` which needs the following function from the following libraries:

[`sortBy`, `cloneDeep`, `isEqual`] from `lodash`

[`waterfall`, `parallel`] from `async`

In instances such as these, it might be sufficient to simply do:

```js
const { sortBy, cloneDeep, isEqual } = require('lodash');
const { waterfall, parallel } = require('async');
```

If your project is similar to this, and is only comprised of one file that imports a handful of functions, `imp` may not provide much utility to you.

### Larger projects

In larger projects, `imp` is far more useful.

The main purpose of imp, as mentioned above, is to manage function imports - so, in large projects where many modules might import many of the same functions over and over, `imp` shines.

Your project benefits from both improved organization and code readability.

Configuration of `imp` is very straightforward and is done entirely using JSON only. A configuration file, called `imp_conf.json` should live in the root of your module/project.

Here's how you might configure `imp` for a _single file_:

```json
{
	"app.js": {
		"async": [ "waterfall", "parallel" ],
		"lodash": [ "includes", "sample", "isEqual", "shuffle" ],
	}	
}
```
For any additional files, the same format as above can be repeated.

To access the functions you need in `app.js`, simply do:
```
const imp = require("imp")();

// using async.waterfall:
imp.waterfall(...);
```
As you can see, this is very tidy.

## Grouping

In the sample configuration above, it may look as though the "keys" are merely filenames. In fact, they are not. 

Each "key" in the config is a _group name_, which means files across your project can re-use imports without needing to do so explicitly. 

So, if I had a group called `utils` that uses functions from various packages that I want to re-use across files, I would simply do:

`const imp = require("imp")("utils")`.

If you wanted to use more than one group at once, simply include additional arguments (e.g `("utils", "auth-helpers", ...)`)

### Notes

Group names ending in `.js` will be treated as file-specific. If no arguments are provided, `imp` will default to the group with the same name as the file where `imp` is initialized. Even if arguments are provided, `imp` will implicitly include any functions in the default group - so delete the group if you would rather not have this behavior occur.

`imp` *can* be initialized more than once per file (in case you need more _imps_).

If no suitable groups are found, nothing will be imported.

## The "Why"

There's typically two sides to the "imports" coin:

1) Require()/import the entire package, then do `package.function()`, or

2) destructure the specific functions per package you need in each file

I typically prefer to use the second method (unless I'm using the REPL or something), but there are times where a project I may be working on re-uses imports so much, that it starts to feel like "mandatory clutter".

In fairness, `imp` does not totally end that clutter, but it does reduce and organize it in a pleasant manner. The simple trade-off is not being able to see which functions/libraries a file uses immediately (you would have to instead read the imp config).

## Troubleshooting

If you come upon a weird bug or problem, feel free to create an issue and I'll take a look. Or, feel free to dive into the code if you're feeling adventurous and PR your fixes.

## Disclaimer

`imp` is a very new package and is in a rough state. While it may seem cool, `imp` may not work correctly, and as of right is *not* recommended for use in production. I assume no liability for any negative impacts `imp` may have on your projects.
