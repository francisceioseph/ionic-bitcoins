angular.module('App')
.controller('DetailController', function ($scope, $stateParams, $state, Currencies) {

  //searches for the requested currency
  angular.forEach(Currencies, function(currency) {
    if (currency.code == $stateParams.currency) {
      $scope.currency = currency;
    }
  });

  //if ticker is not set, go back to rates tab
  if (angular.isUndefined($scope.currency.ticker)) {
    $state.go('tabs.rates');
  }
});
