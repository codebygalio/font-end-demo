$(function() {
    $('#fullpage').fullpage({
        afterRender : function () {
            $('.animate__animated').each(function(index , item){
              $(this).removeClass($(this).data('enter')).addClass($(this).data('leave'))
            })
        },
        afterLoad : function (origin, destination) {
            if(destination.index !== 5){
                $('.sidebar li').removeClass('cur').eq(destination.index).addClass('cur')
                $(origin.item).find('.animate__animated').each(function(index, item) {
                    $(item).removeClass($(item).data('enter')).addClass($(item).data('leave'))
                 })
                 $(destination.item).find('.animate__animated').each(function(index, item) {
                    $(item).removeClass($(item).data('leave')).addClass($(item).data('enter'))
                 })
            }
            if(destination.index === 0) {
                $('.sidebar').addClass('hidden')
            }else{
                $('.sidebar').removeClass('hidden')
            }
        },
        beforeLeave: function (origin, destination) {
            if(destination.index === 0) {
                $('.sidebar').addClass('hidden')
            }else{
                $('.sidebar').removeClass('hidden')
            }
            if(destination.index !== 5){
                $('.sidebar li').removeClass('cur').eq(destination.index).addClass('cur')
            }
        }
    })

    $('.nav').find('a').each(function (index, item) {
        $(item).on("click", function () {
            $.fn.fullpage.moveTo(index+2)
        })
    })

    $('.sidebar').find('a').each(function(index, item){
        if (index === 5) return
        $(item).on('click', function () {
            $.fn.fullpage.moveTo(index+1)
        })
        console.log('index=',index)
        console.log('item=',item)
    })
    $('.sao_down').hover(function () {
        $(this).find('img').toggleClass('hidden')
    })
})

