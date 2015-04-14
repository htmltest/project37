var tv = [];

(function($) {

    $(document).ready(function() {

        $('a .tv').parent().hover(
            function() {
                var curIndex = $('.tv').index($(this).find('.tv'));
                tv[curIndex][3] = true;
            },

            function() {
                var curIndex = $('.tv').index($(this).find('.tv'));
                tv[curIndex][3] = false;
            }
        )

        $('.slider').each(function() {
            $(this).data('itemIndex', 0);
        });

        $('.slider .link-plus').click(function(e) {
            var curIndex = $('.tv').index($('.slider > .tv'));
            tv[curIndex][3] = true;
            $('.slider > .tv').show();

            var itemIndex = $('.slider').data('itemIndex');
            itemIndex++;
            if (itemIndex > $('.slider li').length - 1) {
                itemIndex = 0;
            }
            $('.slider').data('itemIndex', itemIndex);
            $('.slider li').hide();
            $('.slider li').eq(itemIndex).show();

            setTimeout(function() {
                var curIndex = $('.tv').index($('.slider > .tv'));
                tv[curIndex][3] = false;
                $('.slider > .tv').hide();
            }, 1000);

            e.preventDefault();
        });

        $('.contacts-link .link-plus').click(function(e) {
            $('.contacts-social').toggle();
            e.preventDefault();
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.contacts-link').length == 0) {
                $('.contacts-social').hide();
            }
        });

        $('.slider > .tv').each(function() {
            $(this).attr('width', $('.slider').width());
        });

        $('.tv').each(function() {
            var ctx = this.getContext('2d');
            var WIDTH = $(this).width();
            var HEIGHT = $(this).height();
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            ctx.fill();
            var imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
            var pix = imgData.data;
            tv.push([ctx, pix, imgData, false]);
        });

        $('.slider > .tv').each(function() {
            var curIndex = $('.tv').index($(this));
            tv[curIndex][3] = true;
        });

        setInterval(function() {
            for (var j = 0; j < tv.length; j++) {
                if (tv[j][3]) {
                    for (var i = 0; i < tv[j][1].length; i += 4) {
                        var color = (Math.random() * 255) + 50;
                        tv[j][1][i] = color;
                        tv[j][1][i + 1] = color;
                        tv[j][1][i + 2] = color;
                    }
                    tv[j][0].putImageData(tv[j][2], 0, 0);
                }
            }
        }, 30);

    });

    $(window).load(function() {
        setTimeout(function() {
            var curIndex = $('.tv').index($('.slider > .tv'));
            tv[curIndex][3] = false;
            $('.slider > .tv').hide();
        }, 1000);

    });

})(jQuery);