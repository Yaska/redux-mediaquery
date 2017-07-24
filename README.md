redux-mediaquery
===

👉 *[Watch me present this at React Europe 2016](https://www.youtube.com/watch?v=dDclOQNlVKw)* 👈

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
* …

How to use
---

1. `npm install --save redux-mediaquery`
2. In your store creator, import the reducer and action:

  ```jsx
  import {reducer as responsive, mediaQueryTracker} from 'redux-mediaquery'
  ```
3. Add it to the reducers:

  ```jsx
  const reducer = combineReducers({
    responsive,
    ...reducers,
  })
  ```
4. After the store is created, indicate the properties that you are interested in:
  ```jsx
  const unlisten = mediaQueryTracker({
    isPhone: "screen and (max-width: 767px)",
    isTablet: "screen and (max-width: 1024px)",
    innerWidth: true,
    innerHeight: true,
  }, store.dispatch)
  ```

  You can call `unlisten()` when you need to remove the listener it puts on window, for example
  when you are hot reloading.
  
  **Note**: If you want, you can dispatch `mediaQueryTracker(...)` as an action.
  In that case, do not provide the `dispatch` argument. This requires you to use the `redux-thunk` middleware.

5. Connect components to the store and conditionally render things:

  ```jsx
  @connect(({responsive}) => ({
    isPhone: responsive.isPhone,
    innerHeight: responsive.innerHeight,
  }))
  class SomeComponent extends React.Component {
    render() {
      const {isPhone, innerHeight} = this.props
      return (
        <div>
          {isPhone ? (
            <h1>I'm on a phone!</h1>
          ) : (
            <p>Desktop here. My height is {innerHeight}</p>
          )}
        </div>
      )
    }
  ```
6. sit back and relax 🏝

*Pro Tip*: write your media queries so false is the default, for server side rendering or in case matchMedia doesn't exist

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

Server-side rendering
---

If you combine this with a library like https://github.com/hgoebl/mobile-detect.js, you can decide on the server whether to render for a phone or for desktop, or even for search bots.

To do this, derive e.g. `isPhone` and `isBot` from the `user-agent` header. Then initialize the Redux store, and dispatch the `mediaChanged` action:

```js
import {mediaChanged} from 'redux-mediaquery'

// ... create store

store.dispatch(mediaChanged({isServer: true, isPhone, isBot}))
```

Then, in your app, decide what to do with `isServer` and `isBot`. Finally, in the browser build, dispatch `isServer: false` after the first render (use the callback in `React.render(app, element, callback)` for that).

By updating `isServer` only after the first render, you make sure that React can re-use the pre-rendered content.

Changelog
---

* v0.11:
  * remove reliance on redux-thunk (backwards-compatible)
  * unlisten for hot reload etc
  * some tests
* v0.10:
  * change the action type string to have '@@' as a prefix (@moimikey)

Ideas for future development
---

* uglify build
* stable API once more feedback from community
* other special measurements? e.g. "is actual phone", "has touch", …
* a collection of breakpoints/queries?
* server side helpers for converting from user agent string to redux actions
* demo page
