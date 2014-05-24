var diavolo = new diavoloJson();
function appraisal(){
    var itemType;
    var tradeType;
    var inputPrice = Number($("input#price").value);

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
    $.each(diavolo.json[test],function(item){
        
    })
}

function priceCheck(json,modifierPrice,itemType){

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
            } else{
                $this.val('');
            }
        }
    }
}

$(function(){
    $("#price").on(numOnly());
})