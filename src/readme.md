# Umbrella JS

> Note: this documentation is autogenerated from the files in src/


Find nodes from the HTML with a CSS selector:

```js
u('ul li')
u(document.getElementById('demo'))
u(document.getElementsByClassName('demo'))
u([ document.getElementById('demo'), document.getElementById('test') ])
u('li', context)
```



### Parameters

The first parameter can be:

- A text CSS selector
- A single HTML Node. This is specially useful in events where you can just pass `this`
- A NodeList or other similar objects that can be converted to an array
- An array of nodes
- Nothing

The second parameter is only for the CSS selector, which indicates a portion of the DOM where the selector is applied. For example, with `u('li', u('ul').first())` it will find all of the `li` from the first `ul`.


### Return

An instance of Umbrella JS so you can chain it to any of the other methods.



### Examples

Select all of the list elements that are children of `ul`

```js
var lis = u('ul > li');    // Same as u('ul').children('li');
```

Find all of the headers from the page to create a Table of Contents:

```js
var headers = u('h1, h2, h3, h4, h5, h6');
```

It plays well with other libraries, including jquery. For example, with [pagex.js](http://github.com/franciscop/pagex):

```js
// When we are on the page "/login"
page(/^login/, function(){
  
  function done(err, res){
    if (err) return alert("There was an error");
    window.location.href = "/user/" + res.id;
  };
  
  // Find the form and handle it through ajax when it's submitted
  u("form.login").ajax(done);
});
```


### Native methods

> This section is inspired by [Bliss.js' vanilla methods](http://blissfuljs.com/docs.html#vanilla)

There are many native methods and properties that you can use. These can be called straight in the `.first()` or `.last()` elements, a `.nodes` element or you can loop every element to call them. For example:

```js
// Single element from .nodes
u('h1').nodes[0].classList.add('vanilla');

// Single element
u('h1').first().classList.add('vanilla', 'test');

// Multiple elements
u('h2').each(function(el){
  el.classList.add('vanilla', 'test');
});
```

And for the arrays it's similar, you can call any array method on `u().nodes` since this is literally an array:

```js
u('h2').nodes.forEach();
var mapped = u('h2').nodes.map();
var filtered = u('h2').nodes.filter();
var good = u('h2').nodes.some();
```

However, there are also some advantages of using Umbrella's methods instead of native methods. For example, with `.addClass()` vs native `classList.add()`:

- **error prevention**: if nodes.length = 0, the single-element way will fail in the above implementation (since first() and nodes[0] are null)
- **cross-browser**: the classList.add() with multiple elements [is not compatible with IE10-11 & Android 4.3-](http://caniuse.com/#search=classList)
- **more flexibility**: there are many ways to specify multiple classes with addClass, and only one way to specify them on the native way. Imagine that you have an array of classes, with the native method this becomes a nightmare. This is what it means to be flexible:

```js
u('h2').addClass('vanilla', 'test');     // It accepts multiple parameters
u('h2').addClass(['vanilla', 'test']);   // Also accept an array
u('h2').addClass(['vanilla'], ['test']); // Or multiple arrays
u('h2').addClass('vanilla, test');       // Strings with space and/or comma
u('h2').addClass('vanilla', ['test'], 'one, more' }); // Or just whatever
```

So it's convenient that you know these limitations and act accordingly. Try to use native methods where it makes sense, then Umbrella's methods where it's better suited or then crete your own methods when you need it.



### .length

You can check how many elements are matched with `.length`:

```js
// Check how many <a> are in the page
alert(u('a').length);
```