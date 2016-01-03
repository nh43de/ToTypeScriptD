Welcome to `cstsd`!
====

This is an (almost) complete re-write of ToTypeScriptD. The idea here was to separate
out the code generation and type scanning layers and provide a solution that is 
extensible and maintainable so that it can be adapted to multiple purposes as described 
below. As part of this rewrite I have dropped support for WinMD, events, and async
generation logic. Additionally, I have dropped Mono.Cecil in favor of System.Reflection.
With the rewrite it is now much easier to develop your own type scanner and leave the
TS rendering logic intact now that the rendering and type scanning logic are completely 
decoupled, and implementing a Mono-based type scanner would not be difficult.

In addition, I have added a few additional options that may be useful:

1) TypeScriptExport attribute - this lets you add the [TypeScriptExport] attribute to 
items that you want marked to be dumped to TypeScript. I am also considering codegen injection
into these attributes. TypeScanner Filtering by this attribute can be overriden by adding the -a
flag to the command lines arguments to dump all assembly types to TS.

2) Output to file. Use the -o <filepath> to output the generated TS to a file.


Note: this project is still a work in progress but I welcome any feedback/contributions.

====


You can now generate [TypeScript](http://typescriptlang.org) definition (`*.d.ts`) 
files from either `.Net` or `.winmd` assembly files. Allowing you to leverage these 
libraries in your TypeScript/JavaScript `WinJS` or other client side software 
applications with all the type safety and benefits of [TypeScript](http://typescriptlang.org).

## Can you tell me why I would use this?

I know of two main scenarios where I think this could be useful.

1. If you build a 'Modern' (come on, we still call it Metro) Windows 8 app 
 with `WinJS` and want to leverage `TypeScript`, wouldn't it be nice to get 
 a set of TypeScript Definition files that reflect the native API's you're 
 calling in the platform without manually creating the definition files?
2. Say your building an MVC/WebAPI server application. It would be useful if 
 your C.I./Build system could spit out a set of TypeScript interfaces that 
 were based on the server objects used to render your API. This can provide
 not only useful for client side JavaScript/TypeScript libraries that 
 need to consume these objects, but could also provide a simple way to 
 document the structure of your service API results.

## Install

Install via [Chocolatey](http://chocolatey.org)

> `cinst ToTypeScriptD`

You can see the Chocolatey package here: [ToTypeScriptD package](https://chocolatey.org/packages/ToTypeScriptD)

## How to use?


#### Print the short and sweet command line arguments: 

    ToTypeScriptD --help

#### Generate all types from Windows.winmd file:

    ToTypeScriptD winmd "C:\Program Files (x86)\Windows Kits\8.0\References\CommonConfiguration\Neutral\Windows.winmd"

#### Generate all types from multiple `.winmd` files:

    ToTypeScriptD winmd C:\Windows\System32\WinMetadata\Windows.Foundation.winmd C:\Windows\System32\WinMetadata\Windows.Networking.winmd

#### Include the special types for WinJS apps:

    ToTypeScriptD winmd --specialTypes C:\Windows\System32\WinMetadata\Windows.Foundation.winmd

#### Filter types in a specific namespace

    ToTypeScriptD winmd --specialTypes C:\Windows\System32\WinMetadata\Windows.Foundation.winmd --regexFilter "Windows.Foundation.Collections"

## Roadmap

Checkout the [project milestones](https://github.com/staxmanade/ToTypeScriptD/issues/milestones), suggest a feature, bug etc. Or even better, submit a pull request.

## Contribute

Checkout the [Contribution](CONTRIBUTING.md) guide.

## Thanks to!

Partially sponsored by:  
[![Resgrid logo][2]][1]


## How does the magic happen?

By loading assembly metadata with [Mono.Cecil](http://www.mono-project.com/Cecil) 
which can read any [Ecma 355](http://www.ecma-international.org/publications/standards/Ecma-335.htm) 
Common Language Infrastructure (CLI) file, we can generate a set of TypeScript definition 
files that allow us to project the type system from these assemblies into TypeScript Definition files. Cool eh?



  [1]: http://resgrid.com
  [2]: http://resgrid.com/Images/Resgrid_JustText_small.png (hover text)
