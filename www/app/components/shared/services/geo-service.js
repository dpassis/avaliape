var app = angular.module('avaliape.geoService',['ngResource']);



app.factory("GetGeoData",['$resource', function ($resource) {

         return {

            getCountry : $resource('http://api.geonames.org/countryInfoJSON?&username=ksuhiyp',  {}, {query: {method:'GET', isArray: false}}),
            getState   : $resource('http://api.geonames.org/childrenJSON?formatted=true&username=ksuhiyp&style=short&:geonameId',{id: '@id'},{query: {method:'GET', isArray: false}}),
            getCity    : $resource('http://api.geonames.org/childrenJSON?formatted=true&username=ksuhiyp&style=short&:geonameId',{id: '@id'},{query: {method:'GET', isArray: false}})

        }
    }

]);


    
  

