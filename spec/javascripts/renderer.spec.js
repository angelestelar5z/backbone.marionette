describe("renderer", function(){

  describe("when given a template id to render", function(){
    var templateSelector = "#renderer-template";
    var result;

    beforeEach(function(){
      loadFixtures("rendererTemplate.html");
      result = Backbone.Marionette.Renderer.render(templateSelector);

      spyOn(Backbone.Marionette.TemplateCache, "get");
    });

    it("should retrieve the template from the cache", function(){
      expect(Backbone.Marionette.TemplateCache.get).toHaveBeenCalledWith(templateSelector);
    });

    it("should render the template", function(){
      expect(result).toHaveText(/renderer/);
    });
  });

});
