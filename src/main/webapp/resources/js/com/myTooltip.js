/*
 * myTooltip: javascript plugin for jQuery
 * 1.3.1
 *
 * By M.Ulyanov
 * Source: https://github.com/M-Ulyanov/myTooltip
 * Example https://m-ulyanov.github.io/myTooltip/
 */


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    var tooltipsStorage = {};
    var tooltipsSettingsStorage = {};
    var tooltipId = 0;
    var tooltipLastShowId = false;

    var tooltipClasses = {
        'base'   : 'system-mytooltip--base',
        'item'   : 'system-mytooltip--item',
        'hover'  : 'system-mytooltip--hover',
        'backing': 'system-mytooltip--backing',
        'help'   : 'mytooltip--cursor-help',
        'close'  : 'js-mytooltip-close'
    };

    var directionClasses = {
        'top'   : 'mytooltip--top',
        'right' : 'mytooltip--right',
        'bottom': 'mytooltip--bottom',
        'left'  : 'mytooltip--left'
    };

    var eventsNames = {
        'showBefore'  : 'show-before',
        'showComplete': 'show-complete',
        'hideBefore'  : 'hide-before',
        'hideComplete': 'hide-complete'
    };


    /**
     * Set global events
     */
    $(document).on('mouseleave', '.' + tooltipClasses.hover, function () {
        methods.hide();
    });

    $(document).on('click', function (event) {
        var $target = $(event.target);
        if($target.hasClass(tooltipClasses.base) ||
            ($target.closest('.' + tooltipClasses.item).length && !$target.hasClass(tooltipClasses.close)))
            return;

        tooltipLastShowId = false;
        methods.hide();



    });

    // Add support trim method
    if (!String.prototype.trim) {
        (function() {
            String.prototype.trim = function() {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            };
        })();
    }

    var methods = {

        /**
         * Main method
         * @param options - object user options
         */
        init: function (options) {

            var self = $(this);

            if(self.attr('data-mytooltip-id')) return;

            var id = tooltipId;
            tooltipId++;
            self.attr('data-mytooltip-id', id);

            var userOptions = $.extend(true, {}, options, methods.getAttrOptions(self));
            var currentOptions = $.extend(true, {}, methods.getDefaultOptions(), userOptions);

            if(methods.stringToBoolean(currentOptions.fromTitle)) {
                var selfTitle = self.attr('title');
                currentOptions.content = selfTitle ? selfTitle : currentOptions.content;
            }
            else {
                var html = methods.getHtmlTemplate(currentOptions.content, currentOptions);
                if(html !== false) currentOptions.content = html;
            }

            if(currentOptions.content == '') return;


            tooltipsStorage[id] = {
                'id': id,
                'current': self,
                'options': currentOptions
            };

            self.addClass(tooltipClasses.base);
            if(currentOptions.cursorHelp) {
                self.addClass(tooltipClasses.help);
            }
            methods.setEvents(tooltipsStorage[id]);

        },

        /**
         * Create current tooltip
         * @param data - tooltipsStorage[id]
         */
        create: function (data) {

            var id = data.id;
            var current = $(data.current);
            if (!methods.isEmptyObjectProperty(id) || current.hasClass(data.options.ignoreClass)) return;

            if (tooltipLastShowId === id) {
                methods.hide();
                methods.resetLastShow();
                return;
            }
            tooltipLastShowId = id;

            methods.callEvents(data.current, eventsNames.showBefore);

            var options = data.options;
            var direction = directionClasses[options.direction];
            var content = options.content;
            var html = null;

            if(options.dinamicContent) {
                content = current.attr('data-mytooltip-content');
                html = methods.getHtmlTemplate(content, options);
                content = html !== false ? html : content;
            }

            var tooltip = $('<div style="display: none;" data-mytooltip-id="' + id + '" class="mytooltip system-mytooltip--' +
                options.action + ' ' + tooltipClasses.item + ' ' + direction + ' ' + options.customClass + '">' + content + '</div>');

            if(!methods.stringToBoolean(options.showArrow)) {
                tooltip.addClass('mytooltip-noshow-arrow');
            }

            if (options.theme) {
                tooltip.addClass('mytooltip-theme-' + options.theme);
            }

            if (options.hoverTooltip) {
                tooltip.append('<div class="mytooltip-backing ' + tooltipClasses.backing + '">');
            }

            methods.hide(tooltip, options);
            $('.fieldpassword').append(tooltip);
            methods.setPosition(tooltip, data);

        },

        /**
         * getHtmlTemplate
         * @param string - selector
         * @param options - current options
         * @returns {*} - HTML content or string
         */
        getHtmlTemplate: function (string, options) {

            try {
                var selector = string.trim();
                if ($(selector).length && !~string.indexOf('<')) {
                    return $(selector).html();
                }
                return false;
            }
            catch (err) {
                if (methods.stringToBoolean(options.debug)) {
                    methods.error('Attention! ' + err);
                }
                return false;
            }
        },

        /**
         * Reset last ID
         */
        resetLastShow: function () {

            tooltipLastShowId = false;

        },

        /**
         * String "true" and "false" to Boolean type
         * @param string
         * @returns {boolean}
         */
        stringToBoolean: function(string) {

            if(typeof string === 'boolean') return string;
            return string === 'true';

        },

        /**
         * Show current tooltip
         * @param tooltip - DOM object tooltip
         * @param data - tooltipsStorage[id]
         * @returns {boolean} - default case - return false and call error message
         */
        show: function (tooltip, data) {

            var options = data.options;
            var duration = parseInt(options.animateDuration);

            tooltip.fadeIn({
                queue: false,
                duration: duration
            });

            // Variants
            switch (options.direction) {
                case 'top':
                    tooltip.animate({
                        'top': parseInt(tooltip.css('top')) + options.animateOffsetPx
                    }, duration);
                    break;
                case 'right':
                    tooltip.animate({
                        'left': parseInt(tooltip.css('left')) - options.animateOffsetPx
                    }, duration);
                    break;
                case 'bottom':
                    tooltip.animate({
                        'top': parseInt(tooltip.css('top')) - options.animateOffsetPx
                    }, duration);
                    break;
                case 'left':
                    tooltip.animate({
                        'left': parseInt(tooltip.css('left')) + options.animateOffsetPx
                    }, duration);
                    break;
                default :
                    if (methods.stringToBoolean(options.debug)) {
                        methods.error('Direction: ' + options.direction + ' not found!');
                    }
                    return false;
            }

            setTimeout(function() {
                methods.callEvents(data.current, eventsNames.showComplete);
                if(options.hideTime) {
                    methods.hideTimer(tooltip, options);
                }
            }, options.animateDuration);

        },

        /**
         * Hide current tooltip timer
         * @param tooltip - DOM object tooltip
         * @param options - current options tooltipsStorage[id].options
         */
        hideTimer: function(tooltip, options) {

            var delay = parseInt(options.hideTime);
            if(!delay || delay < 0) delay = 0;

            setTimeout(function() {
                if(tooltip.is(':visible')) {
                    methods.hide(tooltip, options);
                }
            }, delay);

        },

        /**
         * Hide current tooltip
         * @param tooltip - DOM object tooltip
         * @param options - current options tooltipsStorage[id].options
         */
        hide: function (tooltip, options) {

            var duration;
            var item = $('.' + tooltipClasses.item);
            var id = item.data('mytooltip-id');

            if (!methods.isEmptyObjectProperty(id)) return;

            if (options) {
                duration = options.animateDuration;
            }
            else if (id !== undefined) {
                duration = tooltipsStorage[+id].options.animateDuration;
            }

            var base = $('.' + tooltipClasses.base + "[data-mytooltip-id='" + id + "']");
            methods.callEvents(base, eventsNames.hideBefore);

            item.stop().fadeOut(duration, function () {
                methods.remove(tooltip, id, base);
            });

        },

        /**
         *
         * @param tooltip - DOM object tooltip
         * @param id - current tooltip ID
         * @param base - base DOM element
         */
        remove: function (tooltip, id, base) {

            if (tooltip) {
                $('.' + tooltipClasses.item).each(function () {
                    if (tooltip[0] != $(this)[0]) {
                        $(this).remove();
                    }
                })
            }
            else {
                $('.' + tooltipClasses.item).remove();
            }

            if(tooltipsStorage[id].options.disposable) {
                methods.destroy({'id':id});
            }

            methods.callEvents(base, eventsNames.hideComplete);

        },

        /**
         * Set position current tooltip
         * @param data - tooltipsStorage[id]
         * @param tooltip - DOM object tooltip
         * @returns {boolean} - default case - return false and call error message
         */
        setPosition: function (tooltip, data) {

            var current = $(data.current);
            var position = current.offset();
            var options = data.options;
            var image = tooltip.find('img');
            var animateOffsetPx = options.animateOffsetPx ? parseInt(options.animateOffsetPx) : 0;
            var backing = tooltip.find('.mytooltip-backing');
            var sizeBacking = 0;
            var sizeElement = {
                height: current.outerHeight(),
                width: current.outerWidth()
            };
            var sizeTooltip = {};

            if (image.length > 0) {
                image.load(function () {
                    setSizeTooltip();
                });
            }
            else {
                setSizeTooltip();
            }

            function setSizeTooltip() {
                sizeTooltip.height = tooltip.outerHeight();
                sizeTooltip.width = options.widthOfParent ? (sizeElement.width / 100 * parseInt(options.widthOfParent)) : tooltip.outerWidth();
                callSwith();
            }

            function callSwith() {

                var offsetHorizontalBorder = 0;
                var offsetVerticalBorder = 0;
                if(options.border === 'far') {
                    offsetHorizontalBorder = sizeElement.width;
                    offsetVerticalBorder = sizeElement.height;
                }

                if(options.widthOfParent) {
                    tooltip.css('width',  sizeTooltip.width)
                }

                switch (options.direction) {

                    case 'top':
                        tooltip.css({
                            'left': position.left + (sizeElement.width / 2) - (sizeTooltip.width / 2),
                            'top': position.top - sizeTooltip.height - +options.offset - animateOffsetPx + +offsetVerticalBorder
                        });
                        sizeBacking = position.top - parseInt(tooltip.css('top')) - sizeTooltip.height - animateOffsetPx;
                        backing.css({
                            'height': sizeBacking,
                            'bottom': -sizeBacking,
                            'left': 0
                        });
                        break;

                    case 'right':
                        tooltip.css({
                            'left': position.left + sizeElement.width + +options.offset + animateOffsetPx - +offsetHorizontalBorder,
                            'top': position.top - (sizeTooltip.height / 2) + (sizeElement.height / 2)
                        });
                        sizeBacking = parseInt(tooltip.css('left')) - position.left - sizeElement.width - animateOffsetPx;
                        backing.css({
                            'height': sizeTooltip.height,
                            'width': sizeBacking,
                            'top': 0,
                            'left': -sizeBacking
                        });
                        break;

                    case 'bottom':
                        tooltip.css({
                            'left': position.left + (sizeElement.width / 2) - (sizeTooltip.width / 2),
                            'top': position.top + sizeElement.height + +options.offset + animateOffsetPx - +offsetVerticalBorder
                        });
                        sizeBacking = parseInt(tooltip.css('top')) - position.top - sizeElement.height - animateOffsetPx;
                        backing.css({
                            'height': sizeBacking,
                            'top': -sizeBacking,
                            'left': 0
                        });
                        break;

                    case 'left':
                        tooltip.css({
                            'left': position.left - sizeTooltip.width - +options.offset - animateOffsetPx + +offsetHorizontalBorder,
                            'top': position.top - (sizeTooltip.height / 2) + (sizeElement.height / 2)
                        });
                        sizeBacking = position.left - parseInt(tooltip.css('left')) - sizeTooltip.width - animateOffsetPx;
                        backing.css({
                            'height': sizeTooltip.height,
                            'width': sizeBacking,
                            'top': 0,
                            'right': -sizeBacking
                        });
                        break;

                    default:
                        if (methods.stringToBoolean(options.debug)) {
                            methods.error('Direction: ' + options.direction + ' not found!');
                        }
                        return false;
                }

                methods.show(tooltip, data);

            }
        },

        /**
         *
         * @param data - tooltipsStorage[id]
         * @returns {boolean} - default case - return false and call error message
         */
        setEvents: function (data) {

            var action = data.options.action;
            var current = data.current;
            var options = data.options;

            switch (action) {
                case 'click':
                    current.on(action, function (event) {
                        if (!methods.isEmptyObjectProperty(data.id)) return;
                        event.preventDefault();
                        methods.create(data);
                    });
                    break;
                case 'hover':
                case 'focus':
                    if (!methods.isEmptyObjectProperty(data.id)) return;
                    var actionGet;
                    var actionLose;
                    if (action === 'hover') {
                        actionGet = 'mouseenter';
                        actionLose = 'mouseleave';
                    }
                    else if (action === 'focus') {
                        actionGet = 'focus';
                        actionLose = 'blur';
                    }
                    current.on(actionGet, function (event) {
                        if (!$(event.relatedTarget).is('.' + tooltipClasses.item + ',' + '.' + tooltipClasses.backing)) {
                            methods.create(data);
                        }
                    });
                    current.on(actionLose, function (event) {
                        methods.resetLastShow();

                        if (!options.hoverTooltip || !methods.stringToBoolean(options.hoverTooltip) ) {
                            methods.hide();
                        }
                        else if (!$(event.relatedTarget).is('.' + tooltipClasses.item + ',' + '.' + tooltipClasses.backing)) {
                            methods.hide();
                        }
                    });
                    break;
                default:
                    if (methods.stringToBoolean(options.debug)) {
                        methods.error('Action: ' + options.action + ' not found!');
                    }
                    return false;
            }

        },

        /**
         * Get options data-* attributes
         * @param current - current DOM element
         * @returns {{}} - object options data-* attributes
         */
        getAttrOptions: function (current) {

            var defaultOptions = this.getDefaultOptions();
            var dataOptions = {};

            for (var option in defaultOptions) {
                var symbolArray = option.split('');
                var currentAttrName = '';
                symbolArray.forEach(function (item) {
                    var itemToLowerCase = item.toLocaleLowerCase();
                    if (item !== itemToLowerCase) {
                        currentAttrName += '-';
                    }
                    currentAttrName += itemToLowerCase;
                });

                var dataAttrValue = $(current).attr('data-mytooltip-' + currentAttrName);

                if (dataAttrValue !== undefined) {
                    dataOptions[option] = dataAttrValue;
                }
            }

            return dataOptions;

        },

        /**
         *
         * @returns {{direction: string, offset: number, customClass: string, content: null, action: string, theme: string, cursorHelp: boolean, hoverTooltip: boolean, animateOffsetPx: number, animateDuration: number}}
         */
        getDefaultOptions: function () {

            return {
                'direction'       : 'top',
                'offset'          : 10,
                'border'          : 'closer',
                'customClass'     : '',
                'content'         : '',
                'dinamicContent'  : false,
                'action'          : 'hover',
                'theme'           : 'default',
                'ignoreClass'     : 'js-mytooltip-ignore',
                'widthOfParent'   : false,
                'showArrow'       : true,
                'disposable'      : false,
                'fromTitle'       : false,
                'cursorHelp'      : false,
                'hideTime'        : false,
                'hoverTooltip'    : true,
                'animateOffsetPx' : 15,
                'animateDuration' : 200,
                'debug'           : false
            }

        },


        /**
         * Call plugin events
         * @param current - DOM element
         * @param event - Event name property eventsNames
         */
        callEvents: function (current, event) {

            var content = null;
            var id = $(current).data('mytooltip-id');
            if (id >= 0) {
                content = $('.' + tooltipClasses.item + '[data-mytooltip-id="' + id + '"]');
            }
            $(current).trigger(event, content);

        },

        /**
         * Check property in tooltipsStorage
         * @param id - ID
         * @returns {boolean} - false or true
         */
        isEmptyObjectProperty: function(id) {

            return tooltipsStorage[id] !== undefined;

        },

        /**
         *
         * @param params
         */
        call: function(params) {

            var current = $(params.selector);
            var id = current.data('mytooltip-id');

            if(id >= 0) {
                methods.create(tooltipsStorage[id]);
            }
            else {
                methods.error('Method Call: ID not found!');
            }

        },

        /**
         * Reinit plugin by dinamic elements
         * @param params - object options
         */
        update: function(params) {

            $(this).myTooltip(tooltipsSettingsStorage[params.selector]);

        },

        /**
         * Update content
         * @param params - object options
         */
        updateContent: function(params) {

            $(this).attr('data-mytooltip-content', params.args[1]);

        },

        /**
         * Delete item from the plugin
         * @param params - object options
         */
        destroy: function (params) {

            var $self;
            var id = params.id;
            if (id !== undefined) {
                $self = $('.' + tooltipClasses.base + '[data-mytooltip-id="' + id + '"]');
                delete tooltipsStorage[id];
                removeData($self);
            }
            else {
                $self = $(this);
                for (var block in tooltipsStorage) {
                    if (tooltipsStorage.hasOwnProperty(block)) {
                        if ($self.data('mytooltip-id') === $(tooltipsStorage[block].current).data('mytooltip-id')) {
                            delete tooltipsStorage[block];
                            removeData($self);
                        }
                    }
                }
            }

            function removeData(self) {
                self.removeClass(tooltipClasses.base);
                var attributes = $.extend({}, self.get(0).attributes);
                $.each(attributes, function (i, attr) {
                    var name = attr.name;
                    if (~name.indexOf('data-mytooltip')) {
                        self.removeAttr(name);
                    }
                });
            }

        },

        /**
         * Report error
         * @param message - Message to console.error
         */
        error: function (message) {

            console.error(message);

        }

    };

    /**
     * Add new function to jQuery.fn
     * @param method - String name method or user settings
     * @returns {*}
     */
    $.fn.myTooltip = function (method) {

        var args = arguments;
        var selector = this.selector;

        if ($(this).length === 0) {
            methods.error('Element: ' + selector + ' not found!');
            return;
        }

        return this.each(function () {
            if (methods[method]) {
                return methods[method].apply(this, [{
                    'args': args,
                    'selector': selector
                }]);
            }
            else if (typeof method === 'object' || !method) {
                tooltipsSettingsStorage[selector] = args[0];
                return methods.init.apply(this, args);
            }
            else {
                methods.error('Method ' + method + ' not found!');
            }
        });

    };
}));

isNull = function (object) {
	  try {
	    if (typeof object == "boolean") {
	      return false;
	    } else {
	      return (object == null || typeof object == "undefined" || object === "" || object == "undefined");
	    }
	  } catch (e) {
	    alert("isNull: " + object + "::" + e.message);
	    WebSquare.exception.printStackTrace(e);
	  }
	}; 

	function getPwContent(key) {
	var pwd = key;
	var passed = validatePassword(pwd);
	return passed;
	};

	function validatePassword(pw, options) {
	  var o = {
	    length: [6, 16],
	    lower: 1,
	    upper: 1,
	    alpha: 1,
	    numeric: 1,
	    special: 1,
	    custom: [],
	    badWords: [],
	    badSequenceLength: 5,
	    noQwertySequences: true,
	    spaceChk: true,
	    noSequential: false
	  };

	  if (o.spaceChk && /\s/g.test(pw)) {
	    return "<p style='line-height:200%;'><span style='color:#EE2460; font-weight:bold;'>사용불가</span> : 비밀번호 재작성 필요" + "<br/>" 
	      + "<span style='color:#999; font-weight:bold;'>영문 대소문자, 숫자 및 특수문자 사용</span></p>"; 
	    } 

	  if (pw.length < o.length[0]) return "<p style='line-height:200%;'><span style='color:#EE2460; font-weight:bold;'>사용불가</span>" 
	    + "<br/>" 
	    + "<span style='color:#999; font-weight:bold;'>비밀번호는 " + o.length[0] 
	    + "자 이상 입력하셔야 합니다.</span></p>"; 
	  if (pw.length > o.length[1]) 
	    return "<p style='line-height:200%;'><span style='color:#22C781; font-weight:bold;'>사용불가</span>" 
	      + "<br/>" 
	      + "<span style='color:#999;'>비밀번호는 " + o.length[1] + "자 이내로 입력하셔야 합니다.</span></p>"; 
	  if (o.badSequenceLength && pw.length >= o.length[0]) { 
	    var lower = "abcdefghijklmnopqrstuvwxyz", 
	        upper = lower.toUpperCase(),
	        numbers = "0123456789",
	        qwerty = "qwertyuiopasdfghjklzxcvbnm", 
	        start = o.badSequenceLength - 1, 
	        seq = "_" + pw.slice(0, start); 
	    for (i = start; i < pw.length; i++) {
	      seq = seq.slice(1) + pw.charAt(i);
	      if ( lower.indexOf(seq) > -1 || upper.indexOf(seq) > -1 || numbers.indexOf(seq) > -1 || (o.noQwertySequences && qwerty.indexOf(seq) > -1) ) {
	    	  return "<p style='line-height:200%;'>비밀번호 안전도 <span style='color:#E5E5E5'>|</span> <span style='color:#E3691E; font-weight:bold;'>낮음</span> " 
		      + "<span style='color:#00B68E; font-weight:bold; font-size:20px; position: relative; top: 1.5px;'>―</span>"
		      + "<span style='color:#E5E5E5; font-weight:bold; font-size:20px; position: relative; top: 1.5px;''>―</span>"
		      + "<span style='color:#E5E5E5; font-weight:bold; font-size:20px; position: relative; top: 1.5px;''>―</span>"
		      + "<br/>"
		      + "<span style='color:#999; font-weight:bold;'>안전도가 높은 비밀번호를 권장합니다.</span></p>";
	      }
	    }
	  }

	  var re = { 
	    lower: /[a-z]/g, 
	    upper: /[A-Z]/g, 
	    alpha: /[A-Z]/gi, 
	    numeric: /[0-9]/g, 
	    special: /[\W_]/g 
	    }, 
	    rule, i; 
	    var lower = (pw.match(re['lower']) || []).length > 0 ? 1 : 0; 
	    var upper = (pw.match(re['upper']) || []).length > 0 ? 1 : 0; 
	    var numeric = (pw.match(re['numeric']) || []).length > 0 ? 1 : 0; 
	    var special = (pw.match(re['special']) || []).length > 0 ? 1 : 0;

	    if ((pw.match(re['numeric']) || []).length == pw.length) {
		      return "<p style='line-height:200%;'><span style='color:#EE2460; font-weight:bold;'>사용불가</span> : 비밀번호 재작성 필요"
		      + "<br/>" 
		      + "<span style='color:#999; font-weight:bold;'>영문 대소문자, 숫자 및 특수문자 사용</span></p>";
		    }
		    else if (lower + upper + numeric + special <= 2) {
		      return "<p style='line-height:200%;'>비밀번호 안전도 <span style='color:#E5E5E5'>|</span> <span style='color:#E3691E; font-weight:bold;'>낮음</span> " 
		      + "<span style='color:#00B68E; font-weight:bold; font-size:20px; position: relative; top: 1.5px;'>―</span>"
		      + "<span style='color:#E5E5E5; font-weight:bold; font-size:20px; position: relative; top: 1.5px;''>―</span>"
		      + "<span style='color:#E5E5E5; font-weight:bold; font-size:20px; position: relative; top: 1.5px;''>―</span>"
		      + "<br/>"
		      + "<span style='color:#999; font-weight:bold;'>안전도가 높은 비밀번호를 권장합니다.</span></p>";
		    }
		    else if (lower + upper + numeric + special <= 3) {
		      return "<p style='line-height:200%;'>비밀번호 안전도 <span style='color:#E5E5E5'>|</span> <span style='color:#F9D421; font-weight:bold;'>적정</span> "
		      + "<span style='color:#00B68E; font-weight:bold; font-size:20px; position: relative; top: 1.5px;'>―</span>"
		      + "<span style='color:#00939D; font-weight:bold; font-size:20px; position: relative; top: 1.5px;''>―</span>"
		      + "<span style='color:#E5E5E5; font-weight:bold; font-size:20px; position: relative; top: 1.5px;''>―</span>"
		      + "<br/>"
		      + "<span style='color:#999; font-weight:bold;'>안전하게 사용하실 수 있는 비밀번호 입니다.</span></p>";
		    }
		    else {
		      return "<p style='line-height:200%;'>비밀번호 안전도 <span style='color:#212528'>|</span> <span style='color:#45D9FD; font-weight:bold;'>높음</span> "
		      + "<span style='color:#00B68E; font-weight:bold; font-size:20px; position: relative; top: 1.5px;'>―</span>" 
		      + "<span style='color:#00939D; font-weight:bold; font-size:20px; position: relative; top: 1.5px;''>―</span>"
		      + "<span style='color:#006D99; font-weight:bold; font-size:20px; position: relative; top: 1.5px;''>―</span>"
		      + "<br/>"
		      + "<span style='color:#999; font-weight:bold;'>예측하기 힘든 비밀번호로 더욱 안전합니다.</span></p>";
		    }
	  if (o.noSequential && /([\S\s])\1/.test(pw)) {
	    return "no sequential";
	  }
	  for (i = 0; i < o.badWords.length; i++) {
	    if (pw.toLowerCase().indexOf(o.badWords[i].toLowerCase()) > -1) return "bad word";
	  }
	  for (i = 0; i < o.custom.length; i++) {
	    rule = o.custom[i]; if (rule instanceof RegExp) {
	      if (!rule.test(pw)) return "custom";
	    } else if (rule instanceof Function) {
	      if (!rule(pw)) return "custom";
	    }
	  }
	};

