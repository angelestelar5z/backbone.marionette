describe("layout - dynamic regions", function(){
  var template = function(data){
    return "<div id='foo'></div><div id='bar'></div>";
  }

  describe("when adding a region to a layout, after it has been rendered", function(){
    var layout, region, view;

    beforeEach(function(){
      layout = new Marionette.Layout({
        template: template
      });

      layout.render();

      region = layout.addRegion("foo", "#foo");

      var view = new Backbone.View();
      layout.foo.show(view);
    });

    it("should add the region to the layout", function(){
      expect(layout.foo).toBe(region);
    });

    it("should set the parent of the region to the layout", function(){
      expect(region.$el.parent()).toBe(layout.$el[0]);
    });

    it("should be able to show a view in the region", function(){
      expect(layout.foo.$el.children().length).toBe(1);
    });
  });

  describe("when adding a region to a layout, before it has been rendered", function(){
    var layout, region, view;

    beforeEach(function(){
      layout = new Marionette.Layout({
        template: template
      });

      region = layout.addRegion("foo", "#foo");

      layout.render();

      var view = new Backbone.View();
      layout.foo.show(view);
    });

    it("should add the region to the layout after it is rendered", function(){
      expect(layout.foo).toBe(region);
    });

    it("should set the parent of the region to the layout", function(){
      expect(region.$el.parent()).toBe(layout.$el[0]);
    });

    it("should be able to show a view in the region", function(){
      expect(layout.foo.$el.children().length).toBe(1);
    });
  });

  describe("when adding a region to a layout, and re-rendering the layout", function(){
    var layout, region, view;

    beforeEach(function(){
      layout = new Marionette.Layout({
        template: template
      });

      region = layout.addRegion("foo", "#foo");

      layout.render();
      layout.render();

      var view = new Backbone.View();
      layout.foo.show(view);
    });

    it("should re-add the region to the layout after it is re-rendered", function(){
      expect(layout.foo).toBe(region);
    });

    it("should set the parent of the region to the layout", function(){
      expect(region.$el.parent()).toBe(layout.$el[0]);
    });

    it("should be able to show a view in the region", function(){
      expect(layout.foo.$el.children().length).toBe(1);
    });
  });

  xdescribe("when removing a region from a layout", function(){

    it("should close the region", function(){
      throw new Error("not yet implemented");
    });

    it("should remove the region", function(){
      throw new Error("not yet implemented");
    });
  });

  xdescribe("when removing a region and then re-rendering the layout", function(){
    it("should not reset the region", function(){
      throw new Error("not yet implemented");
    });

    it("should not re-attach the region to the layout", function(){
      throw new Error("not yet implemented");
    });
  });

  xdescribe("when adding a region to a layout then closing the layout", function(){
    it("should close the region", function(){
      throw new Error("not yet implemented");
    });
  });

  xdescribe("when adding a region to a layout, closing the layout, then re-rendering the layout", function(){
    it("should reset the region", function(){
      throw new Error("not yet implemented");
    });

    it("should re-attach the region to the layout", function(){
      throw new Error("not yet implemented");
    });
  });

});
