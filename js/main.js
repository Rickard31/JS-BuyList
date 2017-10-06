$(function () {

    /*$("#add-item").click(function () {
        console.log('add');
        var $node = $($(".otherLeftLines").html());
        $node.addClass(".otherLeftLine");
        var q = $node.find(".itemAmountCounter");
        q.text(1);
        $node.find(".itemName").text($node.parent().find($("#new-item-name")).val());
        $(".leftColumn").append($node);
        console.log($node);
    });*/

    $(".increaseItemAmountButton").click(function () {
        var i = $(this).parent().find(".itemAmountCounter").text();
        i++;
        $(this).parent().find(".itemAmountCounter").text(i);
        console.log("increase clicked", i);
        if (i == 2) {
            $(this).parent().find(".reduceItemAmountButton").removeAttr('disabled');
            $(this).parent().find(".reduceItemAmountButton").css('opacity', 1);
        }
        console.log("Index =", $(this).parent().parent().index());

        var t = $(this).parent().parent().index();
        var counter = 1, res = 0;
        $('.leftColumn').children(".otherLeftLines").each(function () {
            if (counter == t) return false;
            if (!$(this).hasClass(".is-bought")) res++;
            counter++;
        });
        console.log(t, counter, res);
        var el = $(this).parent().parent().parent().parent().find("#to-buy-elements-line").children().get(res);
        $(el).find(".rightColumnElementAmount").text(i);
    });

    $(".reduceItemAmountButton").click(function () {
        var i = $(this).parent().find(".itemAmountCounter").text();
        i--;
        $(this).parent().find(".itemAmountCounter").text(i);
        console.log("reduce clicked", i);
        if (i == 1) {
            $(this).parent().find(".reduceItemAmountButton").prop('disabled', true);
            $(this).parent().find(".reduceItemAmountButton").css('opacity', 0.5);
        }

        var t = $(this).parent().parent().index();
        var counter = 1, res = 0;
        $('.leftColumn').children(".otherLeftLines").each(function () {
            if (counter == t) return false;
            if (!($(this).hasClass(".is-bought"))) res++;
            counter++;
        });
        console.log(t, counter, res);
        var el = $(this).parent().parent().parent().parent().find("#to-buy-elements-line").children().get(res);
        $(el).find(".rightColumnElementAmount").text(i);
    });

    $(".itemName").click(function () {
        //console.log('text clicked');
        var v = $(this).text();
        //alert(v);
        $(this).css("display", "none");
        //console.log($(this).css("display"));
        //console.log($(this).parent().find(".hidden-input").css("display"));
        $(this).parent().find('.hidden-input').attr("value", v);
        $(this).parent().find('.hidden-input').css("display", 'inline-block');
        $(this).parent().find('.hidden-input').focus();
    })

    $(".hidden-input").focusout(function () {
        var text = $(this).val();
        console.log(text);
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
        console.log(t, counter, res);
        var el = $(this).parent().parent().parent().parent().find("#to-buy-elements-line").children().get(res);
        $(el).find(".rightColumnElementName").text(text);
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
        console.log(row);

        var t = row.index();
        var counter = 1, res = 0;
        $('.leftColumn').children(".otherLeftLines").each(function () {
            if (counter == t) return false;
            if (!($(this).hasClass(".is-bought"))) res++;
            counter++;
        });
        var el = row.parent().parent().find("#to-buy-elements-line").children().get(res);
        //el.find(".rightColumnElementName").css('text-decoration', "line-through");
        row.parent().parent().find("#bought-elements-line").append(el);
        console.log("el =",el);
        $(el).find(".rightColumnElementName").css('text-decoration', "line-through");
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
        console.log(row);

        var t = row.index();
        var counter = 1, res = 0;
        $('.leftColumn').children(".otherLeftLines").each(function () {
            if (counter == t) return false;
            if ($(this).hasClass(".is-bought")) res++;
            counter++;
        });
        var el = row.parent().parent().find("#bought-elements-line").children().get(res);
        row.parent().parent().find("#to-buy-elements-line").append(el);
        $(el).find(".rightColumnElementName").css('text-decoration', "none");
    });

    $(".removeButton").click(function(){
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
        console.log(el);
        el.remove();
    });
});

