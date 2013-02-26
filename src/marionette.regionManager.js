// Marionette.RegionManager
// ------------------------
//
// Manage one or more related `Marionette.Region` objects.
Marionette.RegionManager = Marionette.Controller.extend({

  constructor: function(options){
    this._regions = {};
    Marionette.Controller.prototype.constructor.call(this, options);
  },

  // Add multiple regions using an object literal, where
  // each key becomes the region name, and each value is
  // the region defintion.
  addRegions: function(regionDefinitions){
    var regions = {};

    _.each(regionDefinitions, function(definition, name){
      var region = this.addRegion(name, definition);
      regions[name] = region;
    }, this);

    return regions;
  },

  // Add an individual region to the region manager,
  // and return the region instance
  addRegion: function(name, definition){
    var region = Marionette.Region.buildRegion(definition, Marionette.Region);
    this._regions[name] = region;
    this.triggerMethod("region:add", name, region);
    return region;
  },

  // Get a region by name
  get: function(name){
    return this._regions[name];
  },

  // Remove a region by name
  remove: function(name){
    var region = this._regions[name];
    this._remove(name, region);
  },

  // Close the region manager, all regions in the region manager, and
  // remove them
  close: function(){
    _.each(this._regions, function(region, name){
      this._remove(name, region);
    }, this);

    var args = Array.prototype.slice.call(arguments);
    Marionette.Controller.prototype.close.apply(this, args);
  },

  // internal method to remove a region
  _remove: function(name, region){
    region.close();
    delete this._regions[name];
    this.triggerMethod("region:remove", name, region);
  }

});
