;(function($,doc,win){
  "use strict";

/**
 * $('form :first').appform();
 * $('form :first').data('widget-appform').showErrors({globals: ['test1','test2'], fields: [{'input-one': 'Error 1'}]});
**/


  var name = "widget-appform";

  function AppForm(el, options) {
    this.$el = $(el);
    this.$el.data(name, this);
    this.options = options;

    //form should have a .global-errors within a .control-group
    this.$geEle = this.$el.find('.global-errors');
    this.$geGroupEle = this.$geEle.parents('.control-group');

    this.init();
  }

  AppForm.prototype.init = function() {
      this.clearErrors();
      return this;
  };

  AppForm.prototype.show = function() {
      return this;
  };

  AppForm.prototype.destroy = function() {
    this.$el.off('.' + name);
    this.$el.find('*').off('.'+name);
    this.$el.removeData(name);
    this.$el = null;
  };

  AppForm.prototype.clearErrors = function() {
    this.$geEle.html('');
    this.$geGroupEle.hide();  
    this.$el.find('.control-group').removeClass('error');
    this.$el.find('.el-error').remove();
    return this;
  };

  AppForm.prototype.showErrors = function(errors) {
		var self = this;
		self.clearErrors();
		var list = $('<ul/>');
		for (var key in errors.globals){
			list.append($('<li>'+errors.globals[key]+'</li>'));
		}

		//show field specific errors in field
		//highlight field in red
		$.each(errors.fields, function (idx,obj){
			var elList = $('<ul class="el-error"/>');
			$.each(obj, function(key,obj){
				var el = self.$el.find('#'+key);
				if (el){
					elList.append($('<li>' + obj + '</li>'));
					el.parents('.control-group').addClass('error');
					el.parents('.control-group').append(elList);
				}
			});
		});

		self.$geEle.html(list);
		self.$geGroupEle.addClass('error');
		self.$geGroupEle.show();

		return this;
  };

  $.fn.appform = function(options){
    return this.each(function() {
      new AppForm(this, options);
    });
  };

})( jQuery, document, window );
