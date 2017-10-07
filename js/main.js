$(function () {

    $("#add-item").click(function () {
        addItem($('#new-item-name').val());
    });

    $(".itemName").click(function () {
        var v = $(this).text();
        $(this).css("display", "none");
        $(this).parent().find('.hidden-input').attr("value", v);
        $(this).parent().find('.hidden-input').css("display", 'inline-block');
        $(this).parent().find('.hidden-input').focus();
    });

    $(".hidden-input").focusout(function () {
        var text = $(this).val();
        $(this).parent().find(".itemName").text(text);
        $(this).parent().find(".itemName").css("display", "inline-block");
        $(this).css('display', 'none');

        var t = $(this).parent().index();
        var counter = 1, res = 0;
        $('.leftColumn').children(".otherLeftLines").each(function () {
            if (counter == t) return false;
            if (!$(this).hasClass(".is-bought")) res++;
            counter++;
        });
        var el = $(this).parent().parent().parent().parent().find("#to-buy-elements-line").children().get(res);
        $(el).find(".rightColumnElementName").text(text);
    });

    $(".increaseItemAmountButton").click(function () {
        var i = $(this).parent().find(".itemAmountCounter").text();
        i++;
        $(this).parent().find(".itemAmountCounter").fadeOut(250, function () {
            $(this).text(i);
            $(this).fadeIn(250);
        });
        if (i == 2) {
            $(this).parent().find(".reduceItemAmountButton").removeAttr('disabled');
            $(this).parent().find(".reduceItemAmountButton").addClass("tooltip");
            $(this).parent().find(".reduceItemAmountButton").css('opacity', 1);
        }

        var t = $(this).parent().parent().index();
        var counter = 1, res = 0;
        $('.leftColumn').children(".otherLeftLines").each(function () {
            if (counter == t) return false;
            if (!$(this).hasClass(".is-bought")) res++;
            counter++;
        });
        var el = $(this).parent().parent().parent().parent().find("#to-buy-elements-line").children().get(res);
        $(el).find(".rightColumnElementAmount").text(i);
    });

    $(".reduceItemAmountButton").click(function () {
        var i = $(this).parent().find(".itemAmountCounter").text();
        i--;
        $(this).parent().find(".itemAmountCounter").fadeOut(250, function () {
            $(this).text(i);
            $(this).fadeIn(250);
        });
        if (i == 1) {
            $(this).prop('disabled', true);
            $(this).removeClass("tooltip");
            $(this).css('opacity', 0.5);
        }

        var t = $(this).parent().parent().index();
        var counter = 1, res = 0;
        $('.leftColumn').children(".otherLeftLines").each(function () {
            if (counter == t) return false;
            if (!($(this).hasClass(".is-bought"))) res++;
            counter++;
        });
        var el = $(this).parent().parent().parent().parent().find("#to-buy-elements-line").children().get(res);
        $(el).find(".rightColumnElementAmount").text(i);
    });

    $(".boughtButton").click(function () {
        var row = $(this).parent().parent();
        row.addClass(".is-bought");
        row.find(".itemName").css('text-decoration', "line-through");
        row.find(".reduceItemAmountButton").css('display', 'none');
        row.find(".increaseItemAmountButton").css('display', 'none');
        row.find(".removeButton").css('display', 'none');
        row.find(".boughtButton").css('display', 'none');
        row.find(".unbuy-button").css('display', 'inline-block');
        resetRightColumn();
    });

    $(".unbuy-button").click(function () {
        var row = $(this).parent().parent();
        row.removeClass(".is-bought");
        row.find(".itemName").css('text-decoration', "none");
        row.find(".reduceItemAmountButton").css('display', 'inline-block');
        row.find(".increaseItemAmountButton").css('display', 'inline-block');
        row.find(".removeButton").css('display', 'inline-block');
        row.find(".boughtButton").css('display', 'inline-block');
        row.find(".unbuy-button").css('display', 'none');
        resetRightColumn();
    });

    $(".removeButton").click(function () {
        var row = $(this).parent().parent();
        var t = row.index();
        var counter = 1, res = 0;
        $('.leftColumn').children(".otherLeftLines").each(function () {
            if (counter == t) return false;
            if (!($(this).hasClass(".is-bought"))) res++;
            counter++;
        });
        row.remove();

        var el = $($("#to-buy-elements-line").children().get(res));
        el.remove();
    });

    function resetRightColumn() {
        $("#to-buy-elements-line").children().each(function () {
            $(this).remove();
        });
        $("#bought-elements-line").children().each(function () {
            $(this).remove();
        })
        $(".leftColumn").children(".otherLeftLines").each(function () {
            if (!($(this).hasClass(".is-bought"))) {
                var elementTemplate = $($("#element-template").html());
                elementTemplate.find(".rightColumnElementName").text($(this).find(".itemName").text());
                elementTemplate.find(".rightColumnElementAmount").text($(this).find(".itemAmountCounter").text());
                $("#to-buy-elements-line").append(elementTemplate);
            } else {
                var elementTemplate = $($("#element-template").html());
                $(elementTemplate).css("text-decoration", "line-through");
                elementTemplate.find(".rightColumnElementName").text($(this).find(".itemName").text());
                elementTemplate.find(".rightColumnElementAmount").text($(this).find(".itemAmountCounter").text());
                $("#bought-elements-line").append(elementTemplate);
            }
        });
    };

    function addItem(name) {
        var rowTemplate = $($("#row-template").html());
        rowTemplate.find(".itemName").text(name);
        $(".leftColumn").append(rowTemplate);

        rowTemplate.find(".itemName").click(function () {
            var v = $(this).text();
            $(this).css("display", "none");
            $(this).parent().find('.hidden-input').attr("value", v);
            $(this).parent().find('.hidden-input').css("display", 'inline-block');
            $(this).parent().find('.hidden-input').focus();
        });
        rowTemplate.find(".hidden-input").focusout(function () {
            var text = $(this).val();
            $(this).parent().find(".itemName").text(text);
            $(this).parent().find(".itemName").css("display", "inline-block");
            $(this).css('display', 'none');

            var t = $(this).parent().index();
            var counter = 1, res = 0;
            $('.leftColumn').children(".otherLeftLines").each(function () {
                if (counter == t) return false;
                if (!$(this).hasClass(".is-bought")) res++;
                counter++;
            });
            var el = $(this).parent().parent().parent().parent().find("#to-buy-elements-line").children().get(res);
            $(el).find(".rightColumnElementName").text(text);
        });
        rowTemplate.find(".increaseItemAmountButton").click(function () {
            var i = $(this).parent().find(".itemAmountCounter").text();
            i++;
            $(this).parent().find(".itemAmountCounter").fadeOut(250, function () {
                $(this).text(i);
                $(this).fadeIn(250);
            });
            if (i == 2) {
                $(this).parent().find(".reduceItemAmountButton").removeAttr('disabled');
                $(this).parent().find(".reduceItemAmountButton").addClass("tooltip");
                $(this).parent().find(".reduceItemAmountButton").css('opacity', 1);
            }
            var t = $(this).parent().parent().index();
            var counter = 1, res = 0;
            $('.leftColumn').children(".otherLeftLines").each(function () {
                if (counter == t) return false;
                if (!$(this).hasClass(".is-bought")) res++;
                counter++;
            });
            var el = $(this).parent().parent().parent().parent().find("#to-buy-elements-line").children().get(res);
            $(el).find(".rightColumnElementAmount").text(i);
        });
        rowTemplate.find(".reduceItemAmountButton").click(function () {
            var i = $(this).parent().find(".itemAmountCounter").text();
            i--;
            $(this).parent().find(".itemAmountCounter").fadeOut(250, function () {
                $(this).text(i);
                $(this).fadeIn(250);
            });
            if (i == 1) {
                $(this).prop('disabled', true);
                $(this).removeClass("tooltip");
                $(this).css('opacity', 0.5);
            }

            var t = $(this).parent().parent().index();
            var counter = 1, res = 0;
            $('.leftColumn').children(".otherLeftLines").each(function () {
                if (counter == t) return false;
                if (!($(this).hasClass(".is-bought"))) res++;
                counter++;
            });
            var el = $(this).parent().parent().parent().parent().find("#to-buy-elements-line").children().get(res);
            $(el).find(".rightColumnElementAmount").text(i);
        });
        rowTemplate.find(".boughtButton").click(function () {
            var row = $(this).parent().parent();
            row.addClass(".is-bought");
            row.find(".itemName").css('text-decoration', "line-through");
            row.find(".reduceItemAmountButton").css('display', 'none');
            row.find(".increaseItemAmountButton").css('display', 'none');
            row.find(".removeButton").css('display', 'none');
            row.find(".boughtButton").css('display', 'none');
            row.find(".unbuy-button").css('display', 'inline-block');
            resetRightColumn();
        });
        rowTemplate.find(".unbuy-button").click(function () {
            var row = $(this).parent().parent();
            row.removeClass(".is-bought");
            row.find(".itemName").css('text-decoration', "none");
            row.find(".reduceItemAmountButton").css('display', 'inline-block');
            row.find(".increaseItemAmountButton").css('display', 'inline-block');
            row.find(".removeButton").css('display', 'inline-block');
            row.find(".boughtButton").css('display', 'inline-block');
            row.find(".unbuy-button").css('display', 'none');
            resetRightColumn();
        });
        rowTemplate.find(".removeButton").click(function () {
            var row = $(this).parent().parent();
            var t = row.index();
            var counter = 1, res = 0;
            $('.leftColumn').children(".otherLeftLines").each(function () {
                if (counter == t) return false;
                if (!($(this).hasClass(".is-bought"))) res++;
                counter++;
            });
            row.remove();

            var el = $($("#to-buy-elements-line").children().get(res));
            el.remove();
        });

        var elementTemplate = $($("#element-template").html());
        elementTemplate.find(".rightColumnElementName").text(name);
        $("#to-buy-elements-line").append(elementTemplate);
        $("#new-item-name").prop('value', "");
    };

    var names = $("#new-item-name").val().split(" ");
    $("#new-item-name").prop('value', "");
    for(var i = 0; i<names.length; i++){
        addItem(names[i]);
    }

});



