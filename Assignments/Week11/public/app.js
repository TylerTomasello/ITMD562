var main = function (users) {
    "use strict";

    function buildUserEl(user) {
        var $viewButton = $("<button>").text("view").on("click", function() {
            $.ajax({
                url: '/users/' + user.id,
                type: 'GET',
                success: function(user) {
                    alert("User: " + user.name);
                }
            });
        });
        var $deleteButton = $("<button>").text("X").on("click", function() {
            $.ajax({
                url: '/users/' + user.id,
                type: 'DELETE',
                success: function(result) {
                    $("#user-" + user.id).remove();
                }
            });
        });
        var $listEl = $("<li>")
            .attr("id", "user-" + user.id)
            .text(user.name + " - " + user.email)
            .append($viewButton)
            .append($deleteButton);
        return $listEl;
    }

    var $userList = $("<ul>").attr("id", "name");
    users.forEach(function(user) {
        $userList.append(buildUserEl(user));
    });
    $("#userContainer").html($userList);
    $("#addNewUser").on("click", function() {
        var newName = $("input[name='newName']").val();
        var newEmail = $("input[name='newEmail']").val();
        var newUser = {
            name: newName,
            email: newEmail
        }
        $.ajax({
            url: "/users",
            type: "POST",
            data: JSON.stringify(newUser),
            contentType: "application/json",
            success: function(newUser, status) {
                $itemList.append(buildUserEl(newUser));
            }
        });
    });
};

$(document).ready(function () {
    $.getJSON("/users", function (users) {
        console.log(users);
        main(users);
    });
});
