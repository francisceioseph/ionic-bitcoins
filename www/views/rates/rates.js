angular.module('App')
.controller('RatesController', function($scope, $http, $ionicPopover, Currencies){
  $scope.currencies = Currencies;

  $ionicPopover.fromTemplateUrl('views/rates/help_popover.html', {
    scope: $scope,
  }).then(function(popover){
    $scope.popover = popover
  });

  $scope.openHelp = function($event){
    $scope.popover.show($event);
  };

  $scope.$on('$destroy', function(){
    $scope.popover.remove();
  });

  $scope.load = function() {
    $http.get('https://api.bitcoinaverage.com/ticker/all')
    .success(
      function(tickers){
        console.log(tickers);
        angular.forEach($scope.currencies, function(currency){
          currency.ticker = tickers[currency.code];
          console.log(`${currency.code} -> ${currency.ticker}`);
          currency.ticker.timestamp = new Date(currency.ticker.timestamp);
        });
    })
    .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
  };

  $scope.load();
});
