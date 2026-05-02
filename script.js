(function ($) {

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        $articles = $main.children('article');

    var delay = 325;
    var locked = false;

    // Remove preload
    $window.on('load', function () {
        setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // SHOW ARTICLE
    $main._show = function (id) {

        var $article = $articles.filter('#' + id);

        if ($article.length === 0) return;

        if (locked) return;
        locked = true;

        if ($body.hasClass('is-article-visible')) {

            var $current = $articles.filter('.active');
            $current.removeClass('active');

            setTimeout(function () {
                $current.hide();
                $article.show();

                setTimeout(function () {
                    $article.addClass('active');
                    locked = false;
                }, 25);

            }, delay);

        } else {

            $body.addClass('is-article-visible');

            setTimeout(function () {

                $header.hide();
                $footer.hide();

                $main.show();
                $article.show();

                setTimeout(function () {
                    $article.addClass('active');
                    locked = false;
                }, 25);

            }, delay);
        }
    };

    // HIDE ARTICLE
    $main._hide = function () {

        if (! $body.hasClass('is-article-visible')) return;

        if (locked) return;
        locked = true;

        var $article = $articles.filter('.active');

        $article.removeClass('active');

        setTimeout(function () {

            $article.hide();
            $main.hide();

            $footer.show();
            $header.show();

            setTimeout(function () {
                $body.removeClass('is-article-visible');
                locked = false;
            }, 25);

        }, delay);
    };

    // CLOSE BUTTON
    $articles.each(function () {
        $('<div class="close">Close</div>')
            .appendTo($(this))
            .on('click', function () {
                location.hash = '';
            });
    });

    // CLICK OUTSIDE TO CLOSE
    $body.on('click', function () {
        if ($body.hasClass('is-article-visible'))
            $main._hide();
    });

    // ESC KEY
    $window.on('keyup', function (event) {
        if (event.keyCode === 27)
            $main._hide();
    });

    // HASH CHANGE (IMPORTANT)
    $window.on('hashchange', function () {

        if (location.hash === '' || location.hash === '#') {
            $main._hide();
        } else if ($articles.filter(location.hash).length > 0) {
            $main._show(location.hash.substring(1));
        }

    });

    // INIT
    $main.hide();
    $articles.hide();

})(jQuery);
