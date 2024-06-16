# On.JS (WIP, **NOT USABLE**)

tips: *This is the experimental repo for On.js*

## What is On.JS?

this is a static-page renderer, which reads jsons to render HTML pages.

## it SHOULD support (todo list)

- [ ] Render Page via JSON
- [ ] Directly read JSON to build Shadow DOM
- [ ] internal i18n pre-render
- [ ] built-in front-end router
- [ ] dual-binded value-reading from in-json js variable <sup>?</sup>
- [ ] import components from specified HTML file (binded with file-name and id)
- [ ] include ordinary HTML file (iframe / render)

## What's shinning?

- Essentials built-in, like i18n(read json list, replace i18n-key with matched stuff, after this render the page.)
- As easy as we can,  to build a page easily that content-oriented.

## Anything not fit?

you can use this anywhere since this can be mounted anywhere but you should turn internal router before using it in a partial place of your site.

If you use On.JS to build your introducing page or anything else, this is quite fit. Maybe it also can be used to build a  documentation page, but this should not used for a business app that requires high page efficiency and security.

