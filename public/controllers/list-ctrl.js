/global angular/


var app = angular.module("app");

app.controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("ListCtrl initialized");
    $scope.url = "/api/v1/deceaseds";

    refresh();

    function refresh() {
        console.log("Requesting earnings inter stats to <" + $scope.url + ">...");
        $http.get($scope.url).then(function(response) {
            console.log("Data received: " + JSON.stringify(response.data, null, 2));
            $scope.deceaseds = response.data;
        });
    }

    $scope.loadInitialData = function() {
        $http.get($scope.url + "/" + "loadInitialData").then(function(response) {
            alert("Base de datos inicializada.");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.statusInfo = JSON.stringify(response.status, null, 2);
            refresh();
        }).catch(function(response) {
            $scope.statusInfo = JSON.stringify(response.status, null, 2);
            if (response.status == 409) {
                alert("Error: Los datos iniciales ya existen.");
            }
        });

    };

    $scope.addDeceased = function() {
        var newDeceased = $scope.newDeceased;
        console.log("Adding a new earning inter stat: " + JSON.stringify(newDeceased, null, 2));
        $http.post($scope.url, newDeceased).then(function(response) {
            alert("El dato  " + JSON.stringify(newDeceased.province, null, 2) + " se ha añadido correctamente.");
            console.log("POST Response: " + response.status + " " + response.data);
            refresh();
        }, function(error) {
            if (error.status == 400) {
                alert("Error: Debe rellenar todos los campos.");
            }
            else if (error.status == 409) {
                alert("Error: El dato " + JSON.stringify(newDeceased.province, null, 2) + " ya existe.");
            }
        });
    };

    $scope.deleteDeceased = function(province) {
        console.log("Deleting deceaseds with province: " + province);
        $http.delete($scope.url + "/" + province).then(function(response) {
            alert("El dato se ha eliminado correctamente.");
            console.log("DELETE Response: " + response.status + " " + response.data);
            refresh();
        });
    };

    $scope.deleteDeceaseds = function() {
        console.log("Deleting all deceaseds");
        $http.delete($scope.url).then(function(response) {
            alert("Todas los datos se han eliminado correctamente.");
            $scope.data = "";
            console.log("DELETE ALL Response: " + response.status + " " + response.data);
            refresh();
        });
    };
    
    

    $scope.busqueda = function() {
        console.log($scope.url + "?" + $scope.atributo + "=" + $scope.valor);
        $http.get($scope.url + "?" + $scope.atributo + "=" + $scope.valor).then(function(response) {
            if(response.data.length == 0) {
               alert("No se ha encontrado ninguna dato.");
            }else if(response.data.length == 1){
                alert("Se ha encontrado 1 dato.");
            }else{
                alert("Se han encontrado " + response.data.length + " dato.");
            }
            $scope.deceaseds = response.data;
            console.log("Búsqueda Response: " + response.status + " " + JSON.stringify(response.data,null,2));
        });
    };

    

    $scope.paginacion = function() {
        console.log($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset);
        $http.get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            alert("Paginación realizada correctamente.");
            $scope.deceaseds = response.data;
            console.log("Paginación Response: " + response.status + " " + JSON.stringify(response.data, null, 2));
        });
    };

    $scope.paginaAnterior = function() {
        $scope.offset = $scope.offset - $scope.limit;
        $http.get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            $scope.deceaseds = response.data;
        });
    };

    $scope.paginaSiguiente = function() {
        $scope.offset = $scope.offset + $scope.limit;
        $http.get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            $scope.deceaseds = response.data;
            $scope.error = "";
        });
    };


}]);
