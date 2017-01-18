(function () {
'use strict';

angular.module('data')
.component('categories', {
  templateUrl: 'src/menuapp/templates/catlist.template.html',
  bindings: {
    items: '<'
  }
});

})();
