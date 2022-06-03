function ContactsCtrl($scope) {
    $scope.contacts = [{
        name: "Thembani",
        email: "thembani@something.com",
        deleted: false,
        edit: false
    }];

    $scope.addContact = function () {
        $scope.contacts.push({
            name: $scope.cName,
            email: $scope.cEmail,
            deleted: false,
            edit: false
        });
        $scope.cName = "";
        $scope.cEmail = "";
    };

    $scope.deleteContact = function (index) {
        $scope.contacts[index].deleted = true;
    };

    $scope.editContact = function (index) {
        $scope.contacts[index].edit = true;
    };

    $scope.saveContact = function (index) {
        $scope.contacts[index].edit = false;
    }


}