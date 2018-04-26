var app = {

    init: function(){
        core.init();
        core.sidebarToggle();
        core.devMode();
        core.popups();
        core.datePicker();
    },

    logIn: function(){
        core.logInTabs();
        core.logInValidate();
    },

    panel: function(){
        core.sidebarToggleMenu();
        core.calculateTableHeight();
        core.floatingThead();
        core.innerTables();
        core.boxTabs();
        core.hideTableRows();
        core.clearTableSelection();
    }

};

var $tableFloat;
var $tableFloatInner;

var core = {

    init: function(){
        
    },

    devMode: function() {

        $('.js-dev-mode').on('click', function(){
            document.designMode = "on";
        });
        
    },

    sidebarToggleMenu: function(){

        // 2nd Level Nav
        $('.sidebar-menu-toggle').on('click', function(){

            if ($(this).next('.sidebar-subcat').length > 0) {
                $(this).parents('li').toggleClass('active');
            }

        });

    },

    logInTabs: function(){

        $('.js-log-in-tabs li').on('click', function(){

            var tabID = $(this).attr('data-tab');

            $('.js-log-in-tabs li').removeClass('active');
            $('.log-in-tab').removeClass('active');

            $(this).addClass('active');
            $("#" + tabID).addClass('active');

        });

        $('.log-in-form-field').on('click', function(){

            $('.log-in-form-field')
                .removeClass('active');

            $(this) 
                .addClass('active');

        });

    },

    logInValidate: function(){

        $('.log-in-submit').click(function() {

            event.preventDefault();

            var validEmail = $('#log-in-user').val() === 'qh';
            var validPassword = $('#log-in-password').val() === 'qh2017';

            if (validEmail === true && validPassword === true) {
                window.location = "panel-index.html";
            } else {
                $('.log-in-input')
                    .addClass('error');
            }
            
        });

    },

    sidebarToggle: function(){

        var sidebarToggle = $('.js-sidebar-toggle');
        var sidebar = $('.sidebar');

        sidebarToggle.on('click', function(){

            $('body')
                .toggleClass('sidebar-hidden');

            $(this)
                .toggleClass('active');

            if ($tableFloat) {

                setTimeout(function(){
                    $tableFloat.trigger('reflow');
                }, 450);
                
            }

        });

    },

    customScrollbars: function(){

        $('.js-scrollbar').perfectScrollbar();

    },

    calculateTableHeight: function(){

        var navbarHeight = $('.navbar').outerHeight(true);
        var subNavbarHeight = $('.sub-navbar').outerHeight(true);
        var tableSearchHeight;

        if ($('.table-main-nav').length > 0) {
            tableSearchHeight = $('.table-main-nav').outerHeight(true);
        } else {
            tableSearchHeight = 0;
        }

        var navbarOffset = 30;

        // Calculate total height of both navbars + offset
        var totalTopHeight = navbarHeight + subNavbarHeight + navbarOffset + tableSearchHeight;

        var autoHeightTable = $('.js-table-auto');
        var autoTableContainer = $('.js-table-container');

        autoTableContainer.css('height', 'calc(100vh ' + '- ' + totalTopHeight + 'px)');

    },

    floatingThead: function(){

        $tableFloat = $('.js-table-float');
        $tableFloat.floatThead({
            scrollContainer: true,
            zIndex: 2
        });

    },

    innerTables: function(){

        var tableToggler = $('.js-table-toggler');
        var tableInnerRow = $('.js-inner-table');

        tableToggler.on('click', function(){

            var _this = $(this);
            var parentRow = _this.parents('tr');

            _this.toggleClass('active');

            parentRow
                .next('.js-inner-table')
                .toggleClass('active');

        });

    },

    hideTableRows: function(){

        $('.js-hide-rows').on('click', function(){

            $('.table-row-inner')
                .removeClass('active');

            $('.table-toggler')
                .removeClass('active');

            $('.table-inner-expand')
                .removeClass('active');

        });

    },

    clearTableSelection: function(){

        $('.js-clear-selection').on('click', function(){

            $(".table .js-checkbox").prop('checked', false);

        });

    },

    boxTabs: function(){

        $('.js-tabs li').on('click', function(){

            var _this = $(this);
            var tabNum = $(this).index();
            var nthChild = tabNum + 1;
            var tabContent = $('.js-tab');

            $('.js-tabs li').removeClass('active');

            _this.addClass('active');
            tabContent.removeClass('active');
            $('.js-tab:nth-child(' + nthChild + ')').addClass('active');

        });

    },

    nightMode: function(){

        $('.page-panel').fadeOut(250);

        setTimeout(function() {
            $('head').append('<link rel="stylesheet" href="css/nightmode.css" type="text/css" />');
        }, 200);

        setTimeout(function() {
            $('body').fadeIn(250);
        }, 250);

    },

    popups: function(){

        $('.js-modal-inline').magnificPopup({
            type:'inline',
            midClick: true,
            mainClass: 'mfp-fade',
            showCloseBtn: false
        });

        $('.js-modal-close').on( "click", function() {
            $.magnificPopup.close();
        });

    },

    datePicker: function(){

        $('.js-datepicker').dateDropper();

    }

}

$(document).ready( function(){

    app.init();

})

$(window).on('load',function(){
    
    core.customScrollbars();

});
 
$(window).scroll(function(){
    
    

});

$(window).resize(function(){
    


});