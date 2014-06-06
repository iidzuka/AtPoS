var diavolo = new diavoloJson();
function appraisal(){
    tableHeaderChange();
    var itemType = $("input[name='itemType']:checked").val();
    var tradeType = $("input[name='tradeType']:checked").val();
    var inputPrice = Number($("input#price").val());
    var list = new Array();
    $.each(diavolo.json[itemType],function(index,item){
        list.push(priceCheck(item,tradeType,itemType,inputPrice,0));
    })
    list = $.grep(list, function(e){
        if(e.length != 0){
            return e;
        }
    });
    $.each(list,function(itemIndex,item){
        $('<tr>')
            .appendTo("#result>tbody");
        $.each(item,function(index,data){
            $('<td>')
                .html(data)
                .appendTo("#result>tbody>tr:eq("+itemIndex+")");
        })
    })
}

function priceCheck(item,tradeType,itemType,price,count){
    var modifire = 0;
    var itemObject = new Array();
    if(itemType == "equipment"){
        modifire = diavolo.json.setting.plusModifierPrice * count;
    }else if(itemType == "container"){
        modifire = diavolo.json.setting.capacityPrice * count;
    }
    if(item[tradeType]+modifire == price){
        itemObject.push(item.name);
        if(count > 0){
            itemObject.push("+"+count);
        }else if(count == 0){
            itemObject.push(" ");
        }
        if(itemType == "equipment"){
            itemObject.push(item.part.join(","))
            if(item.curse){
                itemObject.push("確定呪いディスク");
            }else{
                itemObject.push(item.remarks);
            }
        }else if(itemType == "container"){
            itemObject.push(item.part.join(","));
        }
    }else if(count < 3 && itemType == "equipment" && !(item.curse)){
        itemObject = priceCheck(item,tradeType,itemType,price,count+1);
    }else if(count < 10 && itemType == "container" && !(item.fixation)){
        itemObject = priceCheck(item,tradeType,itemType,price,count+1);
    }
    return itemObject;
}

function formRules(){
    return {
        'paste': function(e) {
            e.preventDefault();
        },

        'keydown' : function(e){
            var keyCode = e.keyCode;
            var radioName;
            if(e.shiftKey && keyCode == 9){
                radioName = "tradeType";
            }else if(keyCode == 9){
                radioName = "itemType";
            }
            if(radioName != undefined){
                e.preventDefault();
                var nextRadio = $("input[name='"+radioName+"']:checked").next("."+radioName);
                if(nextRadio.length == 0){
                    nextRadio = $("input[name='"+radioName+"']").first();
                }
                nextRadio.prop('checked', true);
                appraisal();
            }
        },

        'keyup': function () {
            var $this = $(this);
            var s = new Array();
            $.each( $this.val().split(''), function(i, v){
                if( v.match(/[0-9]/gi) ) s.push(v);
            });
            if(s.length > 0){
                $this.val( s.join('') );
                appraisal();
            } else{
                $this.val('');
            }
        }
    }
}

function submitStop(e){
    if (!e) var e = window.event;
 
    if(e.keyCode == 13){
        appraisal();
        return false;
    }
}

function itemTypeChange(){
    return {
        'click':function(){
            appraisal();
        }
    }
}

function tradeTypeChange(){
    return {
        'click':function(){
            appraisal();
        }
    }
}

function tableHeaderChange(){
    var itemType = $("input[name='itemType']:checked").val();
    $("#result").empty();
    $("<thead>")
        .appendTo("#result");
    $("<tbody>")
        .appendTo("#result");
    $("<tr>")
        .appendTo("#result>thead");
    $("<th>")
        .html("アイテム名")
        .appendTo("#result>thead>tr");
    if(itemType == "equipment"){
        $("<th>")
            .html("強化値")
            .appendTo("#result>thead>tr");    
        $("<th>")
            .html("登場部")
            .appendTo("#result>thead>tr");    
        $("<th>")
            .html("備考")
            .appendTo("#result>thead>tr");
    }else if(itemType == "container"){
        $("<th>")
            .html("容量")
            .appendTo("#result>thead>tr");    
        $("<th>")
            .html("登場部")
            .appendTo("#result>thead>tr");    
        $("<th>")
            .html("備考")
            .appendTo("#result>thead>tr");
    }
}

$(function(){
    $("#price").on(formRules());
    $("[name='itemType']").on(itemTypeChange());
    $("[name='tradeType']").on(tradeTypeChange());
    appraisal();
})