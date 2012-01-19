/**
 * jQuery Simple Router Plugin 1.0.1
 * http://www.lfbittencourt.com/jquery-simple-router-plugin
 *
 * Copyright (c) 2011 Luís Fernando Bittencourt
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Take this one as a lightweight SugarSkull:
 * https://github.com/hij1nx/SugarSkull
 */

(function($) {

    // Default settings
    var settings = {
        checkInterval: 50,
        isCaseInsensitive: false,
        routes: null
    };

    var hash = null;

    $.simpleRouter = function(options) {

        if (options) {
            $.extend(settings, options);
        }

        if (jQuery.isPlainObject(settings.routes)) {
            window.setInterval(function() {
                var currentHash = document.location.hash;

                if (currentHash != hash) {
                    hash = currentHash;

                    for (var i in settings.routes) {
                        if (jQuery.isFunction(settings.routes[i])) {
                            var regExp = new RegExp(i, settings.isCaseInsensitive ? 'i' : '');

                            if (regExp.test(hash)) {
                                var matches = hash.match(regExp);

                                // Remove the entire input from the matches
                                matches.shift();

                                // Call the function passing matches as arguments
                                settings.routes[i].apply(null, matches);

                                break;
                            }
                        }
                    }
                }
            }, settings.checkInterval);
        }

    };

})(jQuery);