describe("view event triggers", function(){

  describe("when DOM events are configured to trigger a view event, and the DOM events are fired", function(){
    var View = Backbone.Marionette.ItemView.extend({
      triggers: {
        "click .foo": "do:foo",
        "click .bar": "what:ever"
      },

      render: function(){
        this.$el.html("<button class='foo'></button><a href='#' class='bar'>asdf</a>");
      }
    });

    var view;

    beforeEach(function(){
      view = new View();
      view.render();

      spyOn(view, "trigger").andCallThrough();

      view.$(".foo").trigger("click");
      view.$(".bar").trigger("click");
    });

    it("should trigger the first view event", function(){
      expect(view.trigger).toHaveBeenCalledWith("do:foo");
    });

    it("should trigger the second view event", function(){
      expect(view.trigger).toHaveBeenCalledWith("what:ever");
    });
  });

  describe("when triggers are configured with a function", function(){
    var View = Backbone.Marionette.ItemView.extend({
      triggers: function(){
        return {
          "click .foo": "do:foo",
          "click .bar": "what:ever"
        };
      },

      render: function(){
        this.$el.html("<button class='foo'></button><a href='#' class='bar'>asdf</a>");
      }
    });

    var view;

    beforeEach(function(){
      view = new View();
      view.render();

      spyOn(view, "trigger").andCallThrough();

      view.$(".foo").trigger("click");
      view.$(".bar").trigger("click");
    });

    it("should trigger the first view event", function(){
      expect(view.trigger).toHaveBeenCalledWith("do:foo");
    });

    it("should trigger the second view event", function(){
      expect(view.trigger).toHaveBeenCalledWith("what:ever");
    });
  });

});
