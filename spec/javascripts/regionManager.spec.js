describe("region manager", function(){

  describe("when adding a region with a name and selector", function(){
    var region, regionManager, addHandler;

    beforeEach(function(){
      addHandler = jasmine.createSpy("region:add handler");

      regionManager = new Marionette.RegionManager();
      regionManager.on("region:add", addHandler);

      region = regionManager.addRegion("foo", "#foo");
    });

    it("should create the region", function(){
      expect(region).not.toBeUndefined();
    });

    it("should store the region by name", function(){
      expect(regionManager.get("foo")).toBe(region);
    });

    it("should trigger a 'region:add' event/method", function(){
      expect(addHandler).toHaveBeenCalledWith("foo", region);
    });

    it("should increment the length", function(){
      expect(regionManager.length).toBe(1);
    });
  });

  describe("when adding a region and supplying a parent element", function(){
    var region, regionManager, addHandler, context;

    beforeEach(function(){
      context = $("<div><div id='foo'></div><div id='bar'></div></div>");
      regionManager = new Marionette.RegionManager();
      region = regionManager.addRegion("foo", {
        selector: "#foo",
        parentEl: context
      });

      region.show(new Backbone.View());
    });

    it("should set the region's selector within the supplied jQuery selector object", function(){
      expect(region.$el.parent()).toBe(context);
    });
  });

  describe("when adding a region and supplying a parent element as a function", function(){
    var region, regionManager, addHandler, context;

    beforeEach(function(){
      context = $("<div><div id='foo'></div><div id='bar'></div></div>");
      regionManager = new Marionette.RegionManager();
      region = regionManager.addRegion("foo", {
        selector: "#foo",
        parentEl: function(){ return context; }
      });

      region.show(new Backbone.View());
    });

    it("should set the region's selector within the supplied jQuery selector object", function(){
      expect(region.$el.parent()).toBe(context);
    });
  });

  describe("when adding multiple regions", function(){
    var regions, regionManager;

    beforeEach(function(){
      regionManager = new Marionette.RegionManager();

      regions = regionManager.addRegions({
        foo: "#bar",
        baz: "#quux"
      });
    });

    it("should add all specified regions", function(){
      expect(regionManager.get("foo")).not.toBeUndefined();
      expect(regionManager.get("baz")).not.toBeUndefined();
    });

    it("should return an object literal containing all named region instances", function(){
      expect(regions.foo).toBe(regionManager.get("foo"));
      expect(regions.baz).toBe(regionManager.get("baz"));
    });
  });

  describe("when removing a region by name", function(){
    var region, regionManager, closeHandler, removeHandler;

    beforeEach(function(){
      closeHandler = jasmine.createSpy("close handler");
      removeHandler = jasmine.createSpy("remove handler");

      regionManager = new Marionette.RegionManager();
      region = regionManager.addRegion("foo", "#foo");
      region.show(new Backbone.View());

      region.on("close", closeHandler);
      regionManager.on("region:remove", removeHandler);

      regionManager.remove("foo");
    });

    it("should close the region", function(){
      expect(closeHandler).toHaveBeenCalled();
    });

    it("should remove the region", function(){
      expect(regionManager.get("foo")).toBeUndefined();
    });

    it("should trigger a 'region:remove' event/method", function(){
      expect(removeHandler).toHaveBeenCalledWith("foo", region);
    });
  });

  describe("when closing the region manager", function(){
    var region, regionManager, closeHandler, closeManagerHandler;

    beforeEach(function(){
      closeHandler = jasmine.createSpy("close region handler");
      closeManagerHandler = jasmine.createSpy("close manager handler");

      regionManager = new Marionette.RegionManager();
      region = regionManager.addRegion("foo", "#foo");
      region.show(new Backbone.View());

      region.on("close", closeHandler);
      regionManager.on("close", closeManagerHandler);

      regionManager.close();
    });

    it("should close all regions", function(){
      expect(closeHandler).toHaveBeenCalled();
    });

    it("should remove all regions", function(){
      expect(regionManager.get("foo")).toBeUndefined();
    });

    it("should trigger a 'close' event/method", function(){
      expect(closeManagerHandler).toHaveBeenCalled();
    });
  });

});
