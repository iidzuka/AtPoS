var diavolo = new diavoloJson();
function appraisal(){
    $("#result").empty();
    var itemType;
    var tradeType;
    var inputPrice = Number($("input#price").val());

    var list = new Array();
    $.each($("input.itemType"),function(){
        if(this.checked){
            itemType = this.value;
        }
    })
    $.each($("input.tradeType"),function(){
        if(this.checked){
            tradeType = this.value;
        }
    })
    $.each(diavolo.json[itemType],function(index,item){
        list.push(priceCheck(item,tradeType,itemType,inputPrice,0));
    })
    list = $.grep(list, function(e){return e;});
    $.each(list,function(index,item){
        var writeText = item.name;
        if(itemType == "equipment"){
            writeText = writeText + " 登場部:" + item.part.join(",");
            if(item.curse){
                writeText = writeText +" 呪"
            }
        }
         $('<div class="result">')
            .appendTo("#result")
            .html(writeText);
    })
}

function priceCheck(item,tradeType,itemType,price,count){
    var modifire = 0;
    var itemObject;
    if(itemType == "equipment"){
        modifire = diavolo.json.setting.plusModifierPrice * count;
    }else if(itemType == "container"){
        modifire = diavolo.json.setting.capacityPrice * count;
    }
    if(item[tradeType]+modifire == price){
        itemObject = $.extend(true,{},item);
        if(count > 0){
            itemObject.name = itemObject.name +" +"+count;
        }
    }else if(count < 3 && itemType == "equipment" && !(item.curse)){
        itemObject = priceCheck(item,tradeType,itemType,price,count+1);
    }else if(count < 9 && itemType == "container" && !(item.fixation)){
        itemObject = priceCheck(item,tradeType,itemType,price,count+1);
    }
    return itemObject
}

function numOnly(){
    return {
        'paste': function(e) {
            e.preventDefault();
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

$(function(){
    $("#price").on(numOnly());
})