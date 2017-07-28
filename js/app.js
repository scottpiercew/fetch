"use strict";

(function(){

  angular
  .module("petSitter", [
    "ui.router",
    "ngResource",
    "angular.filter",
    "rzModule"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("PetSittersController", [
    "PetSitterFactory",
    PetSittersControllerFunction
  ])
  .controller("PetEditController", [
    "$state",
    "PetFactory",
    "$stateParams",
    PetEditControllerFunc
    ])
  .controller("ShowController", [
    "$stateParams",
    "PetSitterFactory",
    PetSittersShowControllerFunction
  ])
  .controller("PetNewController", [
    "$state",
    "PetFactory",
    "$stateParams",
    PetNewControllerFunction
  ])
  .controller("OwnersController", [
    "PetSitterOwnerFactory",
    PetSittersOwnersControllerFunction
  ])
  .controller("OwnersShowController", [
    "$stateParams",
    "PetSitterOwnerShowFactory",
    PetSittersOwnersShowControllerFunction
  ])
  .factory("PetSitterFactory", [
    "$resource",
    FactoryFunction
  ])
  .factory("PetSitterOwnerFactory", [
    "$resource",
    FactoryOwnerFunction
  ])
  .factory("PetFactory", [
    "$resource",
    FactoryPetFunc
  ])
  .factory("PetSitterOwnerShowFactory", [
    "$resource",
    FactoryOwnerShowFunction
  ])

  function RouterFunction($stateProvider) {
    $stateProvider
    .state("PetSitterHome", {
      url: "/",
      templateUrl: "js/ng-views/home.html",
      controller: "PetSittersController",
      controllerAs: "vm"
    })
    .state("PetSitterOwnerIndex", {
      url: "/owners",
      templateUrl: "js/ng-views/owners/index.html",
      controller: "OwnersController",
      controllerAs: "vm"
    })
    .state("petNew", {
      url: "/owners/:id/pets/new",
      templateUrl: "js/ng-views/pets/new.html",
      controller: "PetNewController",
      controllerAs: "vm"
    })
    .state("petEdit", {
      url: "/owners/:owner_id/pets/:id/edit",
      templateUrl: "js/ng-views/pets/edit.html",
      controller: "PetEditController",
      controllerAs: "vm"
    })
    .state("PetSitterOwnerShow", {
      url: "/owners/:id",
      templateUrl: "js/ng-views/owners/show.html",
      controller: "OwnersShowController",
      controllerAs: "vm"
    })
    .state("PetSitterIndex", {
      url: "/sitters",
      templateUrl: "js/ng-views/sitters/index.html",
      controller: "PetSittersController",
      controllerAs: "vm"
    })
    .state("PetSitterShow", {
      url: "/sitters/:id",
      templateUrl: "js/ng-views/sitters/show.html",
      controller: "ShowController",
      controllerAs: "vm"
    })
  }

  function FactoryFunction($resource) {
      return $resource("https://fetch-backend.herokuapp.com/sitters/:id");
  }

  function FactoryPetFunc($resource) {
    return $resource("https://fetch-backend.herokuapp.com/owners/:owner_id/pets/:id", {}, {
      update: { method: "PUT" }
    });
  }

  function FactoryOwnerFunction($resource) {
    return $resource("https://fetch-backend.herokuapp.com/pets/all_pets");
  }

  function FactoryOwnerShowFunction($resource) {
    return $resource("https://fetch-backend.herokuapp.com/owners/:id");
  }

  function PetSittersControllerFunction(PetSitterFactory) {
    this.sitters = PetSitterFactory.query()
    this.slider = {
      minValue: 10,
      maxValue: 90,
      options: {
          floor: 0,
          ceil: 100,
          step: 1
        }
      }
  }

  function PetEditControllerFunc( $state, PetFactory, $stateParams){
    this.pet = PetFactory.get({owner_id: $stateParams.owner_id, id: $stateParams.id});
    this.update = function(){
      this.pet.$update({owner_id: $stateParams.owner_id, id: $stateParams.id}).then(()=>{
        $state.go("PetSitterOwnerShow", {id: $stateParams.owner_id})
      })
    }
    this.destroy = function(){
      this.pet.$delete({owner_id: $stateParams.owner_id, id: $stateParams.id}).then(()=>{
        $state.go("PetSitterOwnerShow", {id: $stateParams.owner_id})
      })
    }
  }

  function PetSittersShowControllerFunction($stateParams, PetSitterFactory) {
    this.sitter = PetSitterFactory.get({id: $stateParams.id})
  }

  function PetNewControllerFunction($state, PetFactory, $stateParams){
    this.pet = new PetFactory();
    this.create = function(){
      console.log($stateParams)
      this.pet.$save({owner_id: $stateParams.id}).then(()=>{
      $state.go("PetSitterOwnerShow", {id: $stateParams.id})
      console.log($stateParams)
    })
    }
  }

  function PetSittersOwnersControllerFunction(PetSitterOwnerFactory) {
    this.pets = PetSitterOwnerFactory.query()
  }

  function PetSittersOwnersShowControllerFunction($stateParams, PetSitterOwnerShowFactory) {
    this.owner = PetSitterOwnerShowFactory.get({id: $stateParams.id})
    console.log($stateParams)
  }





})();
