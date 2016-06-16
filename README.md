redux-mediaquery
===

Intro
---
This is an ActionCreator for Redux that makes CSS mediaqueries (and more) available in the store. This allows you to declaratively make responsive layouts.

It is very small, without any dependencies, except that the reducer requires Object.assign().

Use Cases
---
* Complement CSS, rendering fully different components depending on screen size instead of just showing/hiding parts of the application
* Update measuring components when screen size changes
* responsive images
* flag server-side rendering
* TODO code examples

How to use
---
* add reducer or use own
* configure queries
  * write them so falsy is the default, for server side rendering or in case matchMedia doesn't exist
* connect components to store
* sit back and relax 🏝

Browser Support
---
For innerWidth/innerHeight, IE9 is sufficient. For the mediaqueries, this relies on matchMedia() support in the browser, and thus requires Internet Explorer 10+.

<table>
<tr><th>Chrome<th>Firefox (Gecko)<th>Internet Explorer<th>Opera<th>Safari
<tr><td>9<td>6.0 (6.0)<td>10<td>12.1<td>5.1
<tr><th>Android <th>Firefox Mobile (Gecko) <th>IE Mobile <th>Opera Mobile<th>Safari Mobile
<tr><td>3.0<td>6.0 (6.0)<td>No support<td>12.1<td>5
</table>

**Object.assign() needs to be polyfilled if missing**. (It is probably already available, through your JSX build)

Ideas for future development
---
* uglify build
* unlisten call
* tests, thoughts on how to test this would be appreciated
* stable API once more feedback from community
* allow use without redux-thunk?
* other special measurements? e.g. "is actual phone", "has touch", …
* a collection of breakpoints/queries?
* server side helpers for converting from user agent string to redux actions
* demo page
