describe("composite view - itemViewContainer", function(){

  describe("when rendering a collection in a composite view with an `itemViewContainer` specified", function(){
    var Model = Backbone.Model.extend({});

    var Collection = Backbone.Collection.extend({
      model: Model
    });
    
    var ItemView = Backbone.Marionette.ItemView.extend({
      tagName: "li",
      render: function(){
        this.$el.html(this.model.get("foo"));
      }
    });

    var CompositeView = Backbone.Marionette.CompositeView.extend({
      itemView: ItemView,
      itemViewContainer: "ul",
      template: "#composite-child-container-template"
    });

    var compositeView;
    var order;
    var deferredResolved;

    beforeEach(function(){
      order = [];
      loadFixtures("compositeChildContainerTemplate.html");

      var m1 = new Model({foo: "bar"});
      var m2 = new Model({foo: "baz"});
      var collection = new Collection([m1, m2]);

      compositeView = new CompositeView({
        collection: collection
      });

      compositeView.render();
    });

    it("should render the items in to the specified container", function(){
      expect(compositeView.$("ul")).toHaveText(/bar/);
      expect(compositeView.$("ul")).toHaveText(/baz/);
    });
  });

});
