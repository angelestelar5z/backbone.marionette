describe("module start and stop", function(){

  describe("module start", function(){

    describe("when starting a module", function(){
      var MyApp, myModule, initializer;

      beforeEach(function(){
        initializer = jasmine.createSpy();

        MyApp = new Backbone.Marionette.Application();
        myModule = MyApp.module("MyModule", function(MyMod){
          MyMod.addInitializer(initializer);
        });

        myModule.start();
      });

      it("should run the module initializers", function(){
        expect(initializer).toHaveBeenCalled();
      });
    });

    describe("when providing a module definition and not starting the module", function(){
      var MyApp, definitionFunction

      beforeEach(function(){
        MyApp = new Backbone.Marionette.Application();

        definitionFunction = jasmine.createSpy();

        MyApp.module("MyModule", definitionFunction);
      });

      it("should not run the definition function", function(){
        expect(definitionFunction).not.toHaveBeenCalled();
      });

    });

    describe("when providing a module definition and starting the module", function(){
      var MyApp, moduleArgs, thisArg;

      beforeEach(function(){
        MyApp = new Backbone.Marionette.Application();

        module = MyApp.module("MyModule", function(){
          moduleArgs = arguments;
          thisArg = this;
        });

        module.start();
      });

      it("should run the module definition in the context of the module", function(){
        expect(thisArg).toBe(MyApp.MyModule);
      });

      it("should pass the module object as the first parameter", function(){
        expect(moduleArgs[0]).toBe(MyApp.MyModule);
      });

      it("should pass the application object as the second parameter", function(){
        expect(moduleArgs[1]).toBe(MyApp);
      });

      it("should pass Backbone as the third parameter", function(){
        expect(moduleArgs[2]).toBe(Backbone);
      });

      it("should pass Marionette as the fourth parameter", function(){
        expect(moduleArgs[3]).toBe(Backbone.Marionette);
      });
      
      it("should pass jQuery as the fifth parameter", function(){
        expect(moduleArgs[4]).toBe(jQuery);
      });
      
      it("should pass underscore as the sixth parameter", function(){
        expect(moduleArgs[5]).toBe(_);
      });
    });

  });

  describe("module auto-start with the app.start", function(){

    describe("when starting the app that owns the module", function(){
      var MyApp, myModule, options;

      beforeEach(function(){
        MyApp = new Backbone.Marionette.Application();

        myModule = MyApp.module("MyModule");
        spyOn(myModule, "start");

        options = {};
        MyApp.start(options);
      });

      it("should start the module", function(){
        expect(myModule.start).toHaveBeenCalled();
      });

      it("should pass the options along to the module initializer", function(){
        expect(myModule.start.mostRecentCall.args[0]).toBe(options);
      });

    });

    describe("when loading a module after the app has been started", function(){
      var MyApp, myModule, options;

      beforeEach(function(){
        options = {};
        MyApp = new Backbone.Marionette.Application();
        MyApp.start(options);

        myModule = MyApp.module("MyModule", function(mod){
          mod.started = true;

          mod.addInitializer(function(options){
            mod.capturedOptions = options;
          });
        });
      });

      it("should start the module", function(){
        expect(myModule.started).toBe(true);
      });

      it("should pass the options along to the module initializer", function(){
        expect(myModule.capturedOptions).toBe(options);
      });

    });

    describe("when loading a module after the app has been started, and telling the module not to auto-start with the app", function(){
      var MyApp, myModule, options;

      beforeEach(function(){
        options = {};
        MyApp = new Backbone.Marionette.Application();
        MyApp.start(options);

        myModule = MyApp.module("MyModule", {
          startWithApp: false, 
          define: function(mod){
            mod.started = true;

            mod.addInitializer(function(options){
              mod.capturedOptions = options;
            });
          }
        });

      });

      it("should not start the module", function(){
        expect(myModule.started).toBeFalsy();
      });

      it("should not run the module initializer", function(){
        expect(myModule.capturedOptions).not.toBeDefined();
      });
    });

  });

});
