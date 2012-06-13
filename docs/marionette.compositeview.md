# Marionette.CompositeView

A `CompositeView` extends from `CollectionView` to be used as a 
composite view for scenarios where it should represent both a 
branch and leaf in a tree structure, or for scenarios where a
collection needs to be rendered within a wrapper template.

For example, if you're rendering a treeview control, you may 
want to render a collection view with a model and template so 
that it will show a parent item with children in the tree.

You can specify a `modelView` to use for the model. If you don't
specify one, it will default to the `Marionette.ItemView`.

```js
CompositeView = Backbone.Marionette.CompositeView.extend({
  template: "#leaf-branch-template"
});

new CompositeView({
  model: someModel,
  collection: someCollection
});
```

For more examples, see my blog post on 
[using the composite view](http://lostechies.com/derickbailey/2012/04/05/composite-views-tree-structures-tables-and-more/)

## Composite Model Template

When a `CompositeView` is rendered, the `model` will be rendered
with the `template` that the view is configured with. You can
override the template by passing it in as a constructor option:

```js
new MyComp({
  template: "#some-template"
});
```

## Recursive By Default

The default rendering mode for a `CompositeView` assumes a
hierarchical, recursive structure. If you configure a composite
view without specifying an `itemView`, you'll get the same
composite view type rendered for each item in the collection. If
you need to override this, you can specify a `itemView` in the
composite view's definition:

```js
var ItemView = Backbone.Marionette.ItemView.extend({});

var CompView = Backbone.Marionette.CompositeView.extend({
  itemView: ItemView
});
```

## Model And Collection Rendering

The model and collection for the composite view will re-render
themselves under the following conditions:

* When the collection's "reset" event is fired, it will only re-render the collection within the composite, and not the wrapper template
* When the collection has a model added to it (the "add" event is fired), it will render that one item to the rendered list
* When the collection has a model removed (the "remove" event is fired), it will remove that one item from the rendered list

You can also manually re-render either or both of them:

* If you want to re-render everything, call the `.render()` method
* If you want to re-render the model's view, you can call `.renderModel()`
* If you want to re-render the collection's views, you can call `.renderCollection()`

## Events And Callbacks

During the course of rendering a composite, several events will
be triggered:

* "composite:item:rendered" - after the `modelView` has been rendered
* "composite:collection:rendered" - after the collection of models has been rendered
* "render" / "composite:rendered" - after everything has been rendered

Additionally, after the composite view has been rendered, an 
`onRender` method will be called. You can implement this in 
your view to provide custom code for dealing with the view's 
`el` after it has been rendered:

```js
Backbone.Marionette.CompositeView.extend({
  onRender: function(){
    // do stuff here
  }
});
```


