# huent
![Travis](https://api.travis-ci.com/dmonizer/huent.svg?branch=main)(https://travis-ci.com/github/dmonizer/huent) [![npm version](https://badge.fury.io/js/huent.svg)](https://badge.fury.io/js/huent)

A simple library for accessing (subset of) HTMLElement properties in a fluent fashion.

Sample usage:

~~~~

  const h = require('huent')
  h("p")
    .classes("tesing")
    .innerHtml("currently testing Huent lib")
    .insertToElementBeginning(h("body"));
  
  h
    .find("#uniqId")
    .onclick(()=>console.log("element with #uniqId was clicked"));
~~~~

