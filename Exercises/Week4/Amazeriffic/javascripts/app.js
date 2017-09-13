var main = function (toDoObjects) {
    var toDos = toDoObjects.map(function (toDo) {
      return toDo.description;
    });

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                var tags = [];
                toDoObjects.forEach(function (toDo) {
                  toDo.tags.forEach(function (tag) {
                    if (tags.indexOf(tag) === -1) {
                      tags.push(tag);
                    }
                  });
                });
                console.log(tags);

                var tagObjects = tags.map(function (tag) {
                  var toDosByTag = [];

                  toDoObjects.forEach(function (toDo) {
                    if (toDO.indexOf(tag) !== -1) {
                      toDosByTag.push(toDo.description);
                    }
                  });
                  return { "name": tag, "toDos" : toDosByTag }
                });
                console.log(tagObjects);

                tagObjects.forEach(function (tag) {
                  var $tagName = $("<h3>").text(tag.name);
                  var $content = $("<ul>");

                  tag.toDos.forEach(function (description) {
                    var $li $("<li>").text(description);
                    $content.append($li);
                  });

                  $("main .content").append($tagName);
                  $("main .content").append($content);
                });
            }else if ($element.parent().is(":nth-child(4)")) {
                // input a new to-do
                $input = $("<input>"),
                $button = $("<button>").text("+");

                $button.on("click", function () {
                    if ($input.val() !== "") {
                        toDos.push($input.val());
                        $input.val("");
                    }
                });

                $content = $("<div>").append($input).append($button);
               /* Alternatively append() allows multiple arguments so the above
                can be done with $content = $("<div>").append($input, $button); */
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};



$(document).ready(function () {
  $getJSON("todos.json", function (ToDoObjects) {
    main(toDoObjects);
  });
});
