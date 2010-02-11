(function($) {
    var options = {
        timeout: 500
    };
    $.fn.menu = function(opts) {
        opts = opts || {};
        
        $.extend(options, opts);
        return this.each(makeMenu);
    }
     var menuTimer; //timeout id if we set a timeout
     var currMenu; //currentl open menu


    function makeMenu() {
        $("li:has(ul)", this).hover(//first function called when mouseover
                function(e) { showSubmenu(e, this)},
                function(e) {//when hover leaves (mouseout)
                    var self = this;
                    menuTimer = window.setTimeout(function() {
                        hideSubmenu(e, self);
                    }, options.timeout);
                }
            );
    }

    // This function takes a DOM element (ele) and determines if it has a given class (cls)

    // This function is called when the user hovers over the menu
    function showSubmenu(ev, el) {
        var $el = $(el);
        if (currMenu) {            
            animateHide(currMenu);
        }
        animateShow(el);
        if (menuTimer) {
            window.clearTimeout(menuTimer);
        }
        currMenu = el;//set the current open menu
    }
    // this function is called when a mouseout happens
    // it checks that the relatedTarget (where the mouse moved to)
    // is a child of the menu.. If it is not, then we remove the
    // over class, which hides the menu.
    function hideSubmenu(ev, el) {
        var parent = $(ev.relatedTarget).closest(".over")
        if (parent && parent.length > 0)
            return false;

        animateHide(el);
        currMenu = null;
        return true;
    }

    function animateHide(menu) {
        $(menu).removeClass("over").find("ul").hide(350);
    }
    function animateShow(menu) {
        $menu = $(menu);
        var offsetLeft = $menu.get(0).offsetLeft;
        $menu.addClass("over").find("ul").css({"left": offsetLeft + "px"}).show(350);
    }
})(jQuery);