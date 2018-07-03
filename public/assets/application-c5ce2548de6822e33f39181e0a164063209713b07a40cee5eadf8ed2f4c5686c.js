/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts
Released under the MIT license
 */

(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, fire, prepareOptions, processResponse;

      CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var response;
          response = processResponse(xhr.response, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if (!(typeof options.beforeSend === "function" ? options.beforeSend(xhr, options) : void 0)) {
          return false;
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        CSRFProtection(xhr);
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name || input.disabled) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = confirm(message);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

    }).call(this);
    (function() {
      var stopEverything;

      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return false;
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.handleMetaClick = function(e) {
        var data, link, metaClick, method;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        if (metaClick && method === 'GET' && !data) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMetaClick, handleMethod, handleRemote, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMetaClick = Rails.handleMetaClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null) && !jQuery.rails) {
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', handleMetaClick);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
(function() {
  var context = this;

  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(context);

  var ActionCable = context.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
/*! jQuery v@1.8.1 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bY(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bW.length;while(e--){b=bW[e]+c;if(b in a)return b}return d}function bZ(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function b$(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bZ(c)&&(e[f]=p._data(c,"olddisplay",cc(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b_(a,b,c){var d=bP.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function ca(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bV[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bV[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bV[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bV[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bV[e]+"Width"))||0));return f}function cb(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0||d==null){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bQ.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+ca(a,b,c||(f?"border":"content"),e)+"px"}function cc(a){if(bS[a])return bS[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bS[a]=c,c}function ci(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||ce.test(a)?d(a,e):ci(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ci(a+"["+e+"]",b[e],c,d);else d(a,b)}function cz(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cA(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cv;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cA(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cA(a,c,d,e,"*",g)),h}function cB(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cC(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cD(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cL(){try{return new a.XMLHttpRequest}catch(b){}}function cM(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cU(){return setTimeout(function(){cN=b},0),cN=p.now()}function cV(a,b){p.each(b,function(b,c){var d=(cT[b]||[]).concat(cT["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cW(a,b,c){var d,e=0,f=0,g=cS.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cN||cU(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cN||cU(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cX(k,j.opts.specialEasing);for(;e<g;e++){d=cS[e].call(j,a,k,j.opts);if(d)return d}return cV(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cX(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cY(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bZ(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cc(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cP.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cZ(a,b,c,d,e){return new cZ.prototype.init(a,b,c,d,e)}function c$(a,b){var c,d={height:a},e=0;b=b?1:0;for(;e<4;e+=2-b)c=bV[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function da(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.1",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o&&!o.call("﻿ ")?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":a.toString().replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||f.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete")setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){var e=p.type(c);e==="function"&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&e!=="string"&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return typeof a=="object"?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length||!d)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||++p.uuid:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")===0&&(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.length,e=c.shift(),f=p._queueHooks(a,b),g=function(){p.dequeue(a,b)};e==="inprogress"&&(e=c.shift(),d--),e&&(b==="fx"&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)d=p._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)~f.indexOf(" "+b[g]+" ")||(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>-1)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,""+d),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,k,l,m,n=(p._data(this,"events")||{})[c.type]||[],o=n.delegateCount,q=[].slice.call(arguments),r=!c.exclusive&&!c.namespace,s=p.event.special[c.type]||{},t=[];q[0]=c,c.delegateTarget=this;if(s.preDispatch&&s.preDispatch.call(this,c)===!1)return;if(o&&(!c.button||c.type!=="click"))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){h={},j=[];for(d=0;d<o;d++)k=n[d],l=k.selector,h[l]===b&&(h[l]=p(l,this).index(f)>=0),h[l]&&j.push(k);j.length&&t.push({elem:f,matches:j})}n.length>o&&t.push({elem:this,matches:n.slice(o)});for(d=0;d<t.length&&!c.isPropagationStopped();d++){i=t[d],c.currentTarget=i.elem;for(e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++){k=i.matches[e];if(r||!c.namespace&&!k.namespace||c.namespace_re&&c.namespace_re.test(k.namespace))c.data=k.data,c.handleObj=k,g=((p.event.special[k.origType]||{}).handle||k.handler).apply(i.elem,q),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation()))}}return s.postDispatch&&s.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),!V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function $(a,b,c,d){c=c||[],b=b||q;var e,f,g,j,k=b.nodeType;if(k!==1&&k!==9)return[];if(!a||typeof a!="string")return c;g=h(b);if(!g&&!d)if(e=L.exec(a))if(j=e[1]){if(k===9){f=b.getElementById(j);if(!f||!f.parentNode)return c;if(f.id===j)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(j))&&i(b,f)&&f.id===j)return c.push(f),c}else{if(e[2])return u.apply(c,t.call(b.getElementsByTagName(a),0)),c;if((j=e[3])&&X&&b.getElementsByClassName)return u.apply(c,t.call(b.getElementsByClassName(j),0)),c}return bk(a,b,c,d,g)}function _(a){return function(b){var c=b.nodeName.toLowerCase();return c==="input"&&b.type===a}}function ba(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}}function bb(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}function bc(a,b,c,d){var e,g,h,i,j,k,l,m,n,p,r=!c&&b!==q,s=(r?"<s>":"")+a.replace(H,"$1<s>"),u=y[o][s];if(u)return d?0:t.call(u,0);j=a,k=[],m=0,n=f.preFilter,p=f.filter;while(j){if(!e||(g=I.exec(j)))g&&(j=j.slice(g[0].length),h.selector=l),k.push(h=[]),l="",r&&(j=" "+j);e=!1;if(g=J.exec(j))l+=g[0],j=j.slice(g[0].length),e=h.push({part:g.pop().replace(H," "),string:g[0],captures:g});for(i in p)(g=S[i].exec(j))&&(!n[i]||(g=n[i](g,b,c)))&&(l+=g[0],j=j.slice(g[0].length),e=h.push({part:i,string:g.shift(),captures:g}));if(!e)break}return l&&(h.selector=l),d?j.length:j?$.error(a):t.call(y(s,k),0)}function bd(a,b,e,f){var g=b.dir,h=s++;return a||(a=function(a){return a===e}),b.first?function(b){while(b=b[g])if(b.nodeType===1)return a(b)&&b}:f?function(b){while(b=b[g])if(b.nodeType===1&&a(b))return b}:function(b){var e,f=h+"."+c,i=f+"."+d;while(b=b[g])if(b.nodeType===1){if((e=b[o])===i)return b.sizset;if(typeof e=="string"&&e.indexOf(f)===0){if(b.sizset)return b}else{b[o]=i;if(a(b))return b.sizset=!0,b;b.sizset=!1}}}}function be(a,b){return a?function(c){var d=b(c);return d&&a(d===!0?c:d)}:b}function bf(a,b,c){var d,e,g=0;for(;d=a[g];g++)f.relative[d.part]?e=bd(e,f.relative[d.part],b,c):e=be(e,f.filter[d.part].apply(null,d.captures.concat(b,c)));return e}function bg(a){return function(b){var c,d=0;for(;c=a[d];d++)if(c(b))return!0;return!1}}function bh(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)$(a,b[e],c,d)}function bi(a,b,c,d,e,g){var h,i=f.setFilters[b.toLowerCase()];return i||$.error(b),(a||!(h=e))&&bh(a||"*",d,h=[],e),h.length>0?i(h,c,g):[]}function bj(a,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s=0,t=a.length,v=S.POS,w=new RegExp("^"+v.source+"(?!"+A+")","i"),x=function(){var a=1,c=arguments.length-2;for(;a<c;a++)arguments[a]===b&&(n[a]=b)};for(;s<t;s++){f=a[s],g="",m=e;for(h=0,i=f.length;h<i;h++){j=f[h],k=j.string;if(j.part==="PSEUDO"){v.exec(""),l=0;while(n=v.exec(k)){o=!0,p=v.lastIndex=n.index+n[0].length;if(p>l){g+=k.slice(l,n.index),l=p,q=[c],J.test(g)&&(m&&(q=m),m=e);if(r=O.test(g))g=g.slice(0,-5).replace(J,"$&*"),l++;n.length>1&&n[0].replace(w,x),m=bi(g,n[1],n[2],q,m,r)}g=""}}o||(g+=k),o=!1}g?J.test(g)?bh(g,m||[c],d,e):$(g,c,d,e?e.concat(m):m):u.apply(d,m)}return t===1?d:$.uniqueSort(d)}function bk(a,b,e,g,h){a=a.replace(H,"$1");var i,k,l,m,n,o,p,q,r,s,v=bc(a,b,h),w=b.nodeType;if(S.POS.test(a))return bj(v,b,e,g);if(g)i=t.call(g,0);else if(v.length===1){if((o=t.call(v[0],0)).length>2&&(p=o[0]).part==="ID"&&w===9&&!h&&f.relative[o[1].part]){b=f.find.ID(p.captures[0].replace(R,""),b,h)[0];if(!b)return e;a=a.slice(o.shift().string.length)}r=(v=N.exec(o[0].string))&&!v.index&&b.parentNode||b,q="";for(n=o.length-1;n>=0;n--){p=o[n],s=p.part,q=p.string+q;if(f.relative[s])break;if(f.order.test(s)){i=f.find[s](p.captures[0].replace(R,""),r,h);if(i==null)continue;a=a.slice(0,a.length-q.length)+q.replace(S[s],""),a||u.apply(e,t.call(i,0));break}}}if(a){k=j(a,b,h),c=k.dirruns++,i==null&&(i=f.find.TAG("*",N.test(a)&&b.parentNode||b));for(n=0;m=i[n];n++)d=k.runs++,k(m)&&e.push(m)}return e}var c,d,e,f,g,h,i,j,k,l,m=!0,n="undefined",o=("sizcache"+Math.random()).replace(".",""),q=a.document,r=q.documentElement,s=0,t=[].slice,u=[].push,v=function(a,b){return a[o]=b||!0,a},w=function(){var a={},b=[];return v(function(c,d){return b.push(c)>f.cacheLength&&delete a[b.shift()],a[c]=d},a)},x=w(),y=w(),z=w(),A="[\\x20\\t\\r\\n\\f]",B="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",C=B.replace("w","w#"),D="([*^$|!~]?=)",E="\\["+A+"*("+B+")"+A+"*(?:"+D+A+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+C+")|)|)"+A+"*\\]",F=":("+B+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+E+")|[^:]|\\\\.)*|.*))\\)|)",G=":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)",H=new RegExp("^"+A+"+|((?:^|[^\\\\])(?:\\\\.)*)"+A+"+$","g"),I=new RegExp("^"+A+"*,"+A+"*"),J=new RegExp("^"+A+"*([\\x20\\t\\r\\n\\f>+~])"+A+"*"),K=new RegExp(F),L=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,M=/^:not/,N=/[\x20\t\r\n\f]*[+~]/,O=/:not\($/,P=/h\d/i,Q=/input|select|textarea|button/i,R=/\\(?!\\)/g,S={ID:new RegExp("^#("+B+")"),CLASS:new RegExp("^\\.("+B+")"),NAME:new RegExp("^\\[name=['\"]?("+B+")['\"]?\\]"),TAG:new RegExp("^("+B.replace("w","w*")+")"),ATTR:new RegExp("^"+E),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+A+"*(even|odd|(([+-]|)(\\d*)n|)"+A+"*(?:([+-]|)"+A+"*(\\d+)|))"+A+"*\\)|)","i"),POS:new RegExp(G,"ig"),needsContext:new RegExp("^"+A+"*[>+~]|"+G,"i")},T=function(a){var b=q.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},U=T(function(a){return a.appendChild(q.createComment("")),!a.getElementsByTagName("*").length}),V=T(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==n&&a.firstChild.getAttribute("href")==="#"}),W=T(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),X=T(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||!a.getElementsByClassName("e").length?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length===2)}),Y=T(function(a){a.id=o+0,a.innerHTML="<a name='"+o+"'></a><div name='"+o+"'></div>",r.insertBefore(a,r.firstChild);var b=q.getElementsByName&&q.getElementsByName(o).length===2+q.getElementsByName(o+0).length;return e=!q.getElementById(o),r.removeChild(a),b});try{t.call(r.childNodes,0)[0].nodeType}catch(Z){t=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}$.matches=function(a,b){return $(a,null,null,b)},$.matchesSelector=function(a,b){return $(b,null,null,[a]).length>0},g=$.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=g(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=g(b);return c},h=$.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},i=$.contains=r.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:r.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},$.attr=function(a,b){var c,d=h(a);return d||(b=b.toLowerCase()),f.attrHandle[b]?f.attrHandle[b](a):W||d?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},f=$.selectors={cacheLength:50,createPseudo:v,match:S,order:new RegExp("ID|TAG"+(Y?"|NAME":"")+(X?"|CLASS":"")),attrHandle:V?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:e?function(a,b,c){if(typeof b.getElementById!==n&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==n&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==n&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:U?function(a,b){if(typeof b.getElementsByTagName!==n)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c},NAME:function(a,b){if(typeof b.getElementsByName!==n)return b.getElementsByName(name)},CLASS:function(a,b,c){if(typeof b.getElementsByClassName!==n&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(R,""),a[3]=(a[4]||a[5]||"").replace(R,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||$.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&$.error(a[0]),a},PSEUDO:function(a,b,c){var d,e;if(S.CHILD.test(a[0]))return null;if(a[3])a[2]=a[3];else if(d=a[4])K.test(d)&&(e=bc(d,b,c,!0))&&(e=d.indexOf(")",d.length-e)-d.length)&&(d=d.slice(0,e),a[0]=a[0].slice(0,e)),a[2]=d;return a.slice(0,3)}},filter:{ID:e?function(a){return a=a.replace(R,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(R,""),function(b){var c=typeof b.getAttributeNode!==n&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(R,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=x[o][a];return b||(b=x(a,new RegExp("(^|"+A+")"+a+"("+A+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==n&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return b?function(d){var e=$.attr(d,a),f=e+"";if(e==null)return b==="!=";switch(b){case"=":return f===c;case"!=":return f!==c;case"^=":return c&&f.indexOf(c)===0;case"*=":return c&&f.indexOf(c)>-1;case"$=":return c&&f.substr(f.length-c.length)===c;case"~=":return(" "+f+" ").indexOf(c)>-1;case"|=":return f===c||f.substr(0,c.length+1)===c+"-"}}:function(b){return $.attr(b,a)!=null}},CHILD:function(a,b,c,d){if(a==="nth"){var e=s++;return function(a){var b,f,g=0,h=a;if(c===1&&d===0)return!0;b=a.parentNode;if(b&&(b[o]!==e||!a.sizset)){for(h=b.firstChild;h;h=h.nextSibling)if(h.nodeType===1){h.sizset=++g;if(h===a)break}b[o]=e}return f=a.sizset-d,c===0?f===0:f%c===0&&f/c>=0}}return function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b,c,d){var e,g=f.pseudos[a]||f.pseudos[a.toLowerCase()];return g||$.error("unsupported pseudo: "+a),g[o]?g(b,c,d):g.length>1?(e=[a,a,"",b],function(a){return g(a,0,e)}):g}},pseudos:{not:v(function(a,b,c){var d=j(a.replace(H,"$1"),b,c);return function(a){return!d(a)}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!f.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},contains:v(function(a){return function(b){return(b.textContent||b.innerText||g(b)).indexOf(a)>-1}}),has:v(function(a){return function(b){return $(a,b).length>0}}),header:function(a){return P.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:_("radio"),checkbox:_("checkbox"),file:_("file"),password:_("password"),image:_("image"),submit:ba("submit"),reset:ba("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return Q.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b,c){return c?a.slice(1):[a[0]]},last:function(a,b,c){var d=a.pop();return c?a:[d]},even:function(a,b,c){var d=[],e=c?1:0,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},odd:function(a,b,c){var d=[],e=c?0:1,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},lt:function(a,b,c){return c?a.slice(+b):a.slice(0,+b)},gt:function(a,b,c){return c?a.slice(0,+b+1):a.slice(+b+1)},eq:function(a,b,c){var d=a.splice(+b,1);return c?a:d}}},k=r.compareDocumentPosition?function(a,b){return a===b?(l=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:function(a,b){if(a===b)return l=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,h=b.parentNode,i=g;if(g===h)return bb(a,b);if(!g)return-1;if(!h)return 1;while(i)e.unshift(i),i=i.parentNode;i=h;while(i)f.unshift(i),i=i.parentNode;c=e.length,d=f.length;for(var j=0;j<c&&j<d;j++)if(e[j]!==f[j])return bb(e[j],f[j]);return j===c?bb(a,f[j],-1):bb(e[j],b,1)},[0,0].sort(k),m=!l,$.uniqueSort=function(a){var b,c=1;l=m,a.sort(k);if(l)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},$.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},j=$.compile=function(a,b,c){var d,e,f,g=z[o][a];if(g&&g.context===b)return g;d=bc(a,b,c);for(e=0,f=d.length;e<f;e++)d[e]=bf(d[e],b,c);return g=z(a,bg(d)),g.context=b,g.runs=g.dirruns=0,g},q.querySelectorAll&&function(){var a,b=bk,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[],f=[":active"],g=r.matchesSelector||r.mozMatchesSelector||r.webkitMatchesSelector||r.oMatchesSelector||r.msMatchesSelector;T(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+A+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),T(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+A+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=e.length&&new RegExp(e.join("|")),bk=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a)))if(d.nodeType===9)try{return u.apply(f,t.call(d.querySelectorAll(a),0)),f}catch(i){}else if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){var j,k,l,m=d.getAttribute("id"),n=m||o,p=N.test(a)&&d.parentNode||d;m?n=n.replace(c,"\\$&"):d.setAttribute("id",n),j=bc(a,d,h),n="[id='"+n+"']";for(k=0,l=j.length;k<l;k++)j[k]=n+j[k].selector;try{return u.apply(f,t.call(p.querySelectorAll(j.join(",")),0)),f}catch(i){}finally{m||d.removeAttribute("id")}}return b(a,d,f,g,h)},g&&(T(function(b){a=g.call(b,"div");try{g.call(b,"[test!='']:sizzle"),f.push(S.PSEUDO.source,S.POS.source,"!=")}catch(c){}}),f=new RegExp(f.join("|")),$.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!h(b)&&!f.test(c)&&(!e||!e.test(c)))try{var i=g.call(b,c);if(i||a||b.document&&b.document.nodeType!==11)return i}catch(j){}return $(c,null,null,[b]).length>0})}(),f.setFilters.nth=f.setFilters.eq,f.filters=f.pseudos,$.attr=p.attr,p.find=$,p.expr=$.selectors,p.expr[":"]=p.expr.pseudos,p.unique=$.uniqueSort,p.text=$.getText,p.isXMLDoc=$.isXML,p.contains=$.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=b===e&&bA,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(f=0;(h=a[f])!=null;f++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{s=s||bk(b),l=b.createElement("div"),s.appendChild(l),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(g=n.length-1;g>=0;--g)p.nodeName(n[g],"tbody")&&!n[g].childNodes.length&&n[g].parentNode.removeChild(n[g])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l.parentNode.removeChild(l)}h.nodeType?t.push(h):p.merge(t,h)}l&&(h=l=s=null);if(!p.support.appendChecked)for(f=0;(h=t[f])!=null;f++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(f=0;(h=t[f])!=null;f++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[f+1,0].concat(r)),f+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^(none|table(?!-c[ea]).+)/,bO=/^margin/,bP=new RegExp("^("+q+")(.*)$","i"),bQ=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bR=new RegExp("^([-+])=("+q+")","i"),bS={},bT={position:"absolute",visibility:"hidden",display:"block"},bU={letterSpacing:0,fontWeight:400},bV=["Top","Right","Bottom","Left"],bW=["Webkit","O","Moz","ms"],bX=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return b$(this,!0)},hide:function(){return b$(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bX.apply(this,arguments):this.each(function(){(c?a:bZ(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bY(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bR.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bY(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bU&&(f=bU[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],d===""&&!p.contains(b.ownerDocument,b)&&(d=p.style(b,c)),bQ.test(d)&&bO.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bQ.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth===0&&bN.test(bH(a,"display"))?p.swap(a,bT,function(){return cb(a,b,d)}):cb(a,b,d)},set:function(a,c,d){return b_(a,c,d?ca(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bQ.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bV[d]+b]=e[d]||e[d-2]||e[0];return f}},bO.test(a)||(p.cssHooks[a+b].set=b_)});var cd=/%20/g,ce=/\[\]$/,cf=/\r?\n/g,cg=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,ch=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ch.test(this.nodeName)||cg.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(cf,"\r\n")}}):{name:b.name,value:c.replace(cf,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ci(d,a[d],c,f);return e.join("&").replace(cd,"+")};var cj,ck,cl=/#.*$/,cm=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,co=/^(?:GET|HEAD)$/,cp=/^\/\//,cq=/\?/,cr=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cs=/([?&])_=[^&]*/,ct=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,cu=p.fn.load,cv={},cw={},cx=["*/"]+["*"];try{cj=f.href}catch(cy){cj=e.createElement("a"),cj.href="",cj=cj.href}ck=ct.exec(cj.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&cu)return cu.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):c&&typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cr,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cB(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cB(a,b),a},ajaxSettings:{url:cj,isLocal:cn.test(ck[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cx},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cz(cv),ajaxTransport:cz(cw),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cC(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cD(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=""+(c||y),k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cm.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(cl,"").replace(cp,ck[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=ct.exec(l.url.toLowerCase()),l.crossDomain=!(!i||i[1]==ck[1]&&i[2]==ck[2]&&(i[3]||(i[1]==="http:"?80:443))==(ck[3]||(ck[1]==="http:"?80:443)))),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cA(cv,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!co.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cq.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cs,"$1_="+z);l.url=A+(A===l.url?(cq.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cx+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cA(cw,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cE=[],cF=/\?/,cG=/(=)\?(?=&|$)|\?\?/,cH=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cE.pop()||p.expando+"_"+cH++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cG.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cG.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cG,"$1"+f):m?c.data=i.replace(cG,"$1"+f):k&&(c.url+=(cF.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cE.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cI,cJ=a.ActiveXObject?function(){for(var a in cI)cI[a](0,1)}:!1,cK=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cL()||cM()}:cL,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cJ&&delete cI[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cK,cJ&&(cI||(cI={},p(a).unload(cJ)),cI[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cN,cO,cP=/^(?:toggle|show|hide)$/,cQ=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cR=/queueHooks$/,cS=[cY],cT={"*":[function(a,b){var c,d,e,f=this.createTween(a,b),g=cQ.exec(b),h=f.cur(),i=+h||0,j=1;if(g){c=+g[2],d=g[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&i){i=p.css(f.elem,a,!0)||c||1;do e=j=j||".5",i=i/j,p.style(f.elem,a,i+d),j=f.cur()/h;while(j!==1&&j!==e)}f.unit=d,f.start=i,f.end=g[1]?i+(g[1]+1)*c:c}return f}]};p.Animation=p.extend(cW,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cT[c]=cT[c]||[],cT[c].unshift(b)},prefilter:function(a,b){b?cS.unshift(a):cS.push(a)}}),p.Tween=cZ,cZ.prototype={constructor:cZ,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cZ.propHooks[this.prop];return a&&a.get?a.get(this):cZ.propHooks._default.get(this)},run:function(a){var b,c=cZ.propHooks[this.prop];return this.options.duration?this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cZ.propHooks._default.set(this),this}},cZ.prototype.init.prototype=cZ.prototype,cZ.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cZ.propHooks.scrollTop=cZ.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(c$(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bZ).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cW(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cR.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:c$("show"),slideUp:c$("hide"),slideToggle:c$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cZ.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cO&&(cO=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cO),cO=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c_=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j,k,l,m=this[0],n=m&&m.ownerDocument;if(!n)return;return(e=n.body)===m?p.offset.bodyOffset(m):(d=n.documentElement,p.contains(d,m)?(c=m.getBoundingClientRect(),f=da(n),g=d.clientTop||e.clientTop||0,h=d.clientLeft||e.clientLeft||0,i=f.pageYOffset||d.scrollTop,j=f.pageXOffset||d.scrollLeft,k=c.top+i-g,l=c.left+j-h,{top:k,left:l}):{top:0,left:0})},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c_.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c_.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=da(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(window);
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE Main Map of Africa------------------------------------*/
var af_config = {
	'default':{
		'borderColor':'#9CA8B6',//country outlines
		'shortNames': '#919191',//color of the shortnames (ZA, NG, etc)
	},
	'af_1':{
		'hover': 'ALGERIA',//hover information in the popup
		'enable':true,//true/false to enable/disable this country
		'upColor':'#EBECED',//country color when page loads
		'overColor':'#99CC00',//country color when mouse hover
		'downColor':'#993366',//country color when mouse clicking
		'zoom':'no',//zoom in to a detailed view 'no' or 'no'
		'url':'http://algeriatimes.info/',//Goto URL
		'target':'new_window',//open link in new window:new_window, open in current window:new_window, or none for nothing.
		'id':'afc-01','iso':'iso_01',//PLEASE DON"T CHANGE THIS
	},
	'af_2':{
		'hover': 'ANGOLA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.angop.ao/angola/en_us/index.html', //http://jornaldeangola.sapo.ao//
		'target':'new_window',
		'id':'afc-02','iso':'iso_02',
	},
	'af_3':{
		'hover': 'BENIN',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.nta.ng/tag/benin/', //https://www.lanationbenin.info/
		'target':'new_window',
		'id':'afc-03','iso':'iso_03',
	},
	'af_4':{
		'hover': 'BOTSWANA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.dailynews.gov.bw/',
		'target':'new_window',
		'id':'afc-04','iso':'iso_04',
	},
	'af_5':{
		'hover': 'BURKINA FASO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.sidwaya.bf/',
		'target':'new_window',
		'id':'afc-05','iso':'iso_05',
	},
	'af_6':{
		'hover': 'BURUNDI',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.iwacu-burundi.org/englishnews/',
		'target':'new_window',
		'id':'afc-06','iso':'iso_06',
	},
	'af_7':{
		'hover': 'CAMEROON',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.journalducameroun.com/en/',
		'target':'new_window',
		'id':'afc-07','iso':'iso_07',
	},
	'af_8':{
		'hover': 'CAPE VERDE',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://expressodasilhas.cv/',
		'target':'new_window',
		'id':'afc-08','iso':'iso_08',
	},
	'af_9':{
		'hover': 'CENTRAL AFRICAN REPUBLIC',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://abangui.com/',
		'target':'new_window',
		'id':'afc-09','iso':'iso_09',
	},
	'af_10':{
		'hover': 'CHAD',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://tchadinfos.com/', // https://www.alwihdainfo.com/
		'target':'new_window',
		'id':'afc-10','iso':'iso_10',
	},
	'af_11':{
		'hover': 'COMOROS',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.alwatwan.net/', // http://www.comores-online.com/Comores-infosweb/
		'target':'new_window',
		'id':'afc-11','iso':'iso_11',
	},
	'af_12':{
		'hover': 'DEMOCRATIC REPUBLIC OF THE CONGO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lepotentielonline.com/', // http://www.lephareonline.net/
		'target':'new_window',
		'id':'afc-12','iso':'iso_12',
	},
	'af_13':{
		'hover': 'REPUBLIC OF THE CONGO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.bizcongo.cd/',
		'target':'new_window',
		'id':'afc-13','iso':'iso_13',
	},
	'af_14':{
		'hover': 'DJIBOUTI',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lanationdj.com/', // https://laprosperiteonline.net/
		'target':'new_window',
		'id':'afc-14','iso':'iso_14',
	},
	'af_15':{
		'hover': 'EGYPT',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.ahram.org.eg/', // https://www.tahrirnews.com/
		'target':'new_window',
		'id':'afc-15','iso':'iso_15',
	},
	'af_16':{
		'hover': 'EQUATORIAL GUINEA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://diariorombe.es/inicio/', // http://www.gacetadeguinea.com/
		'target':'new_window',
		'id':'afc-16','iso':'iso_16',
	},
	'af_17':{
		'hover': 'ERITREA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.caperi.com/', //  http://awate.com/
		'target':'new_window',
		'id':'afc-17','iso':'iso_17',
	},
	'af_18':{
		'hover': 'ETHIOPIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.thereporterethiopia.com/', // http://capitalethiopia.com/
		'target':'new_window',
		'id':'afc-18','iso':'iso_18',
	},
	'af_19':{
		'hover': 'GABON',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.gabonews.com/', // http://www.union.sonapresse.com/
		'target':'new_window',
		'id':'afc-19','iso':'iso_19',
	},
	'af_20':{
		'hover': 'GAMBIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://thepoint.gm/', //  http://foroyaa.gm/
		'target':'new_window',
		'id':'afc-20','iso':'iso_20',
	},
	'af_21':{
		'hover': 'GHANA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.graphic.com.gh/', // http://www.ghanaiantimes.com.gh/
		'target':'new_window',
		'id':'afc-21','iso':'iso_21',
	},
	'af_22':{
		'hover': 'GUINEA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.africaguinee.com/', // http://www.radio-kankan.com/,  https://www.guineenews.org/
		'target':'new_window',
		'id':'afc-22','iso':'iso_22',
	},
	'af_23':{
		'hover': 'GUINEA-BISSAU',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.gbissau.com/', // http://www.lejourguinee.com/index.php?lang=fr
		'target':'new_window',
		'id':'afc-23','iso':'iso_23',
	},
	'af_24':{
		'hover': 'IVORY COAST',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.fratmat.info/', // http://www.lenouveaureveil.com/
		'target':'new_window',
		'id':'afc-24','iso':'iso_24',
	},
	'af_25':{
		'hover': 'KENYA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.nation.co.ke/', // https://www.standardmedia.co.ke/
		'target':'new_window',
		'id':'afc-25','iso':'iso_25',
	},
	'af_26':{
		'hover': 'LESOTHO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lestimes.com/', // http://sundayexpress.co.ls/, http://informativenews.co.ls/
		'target':'new_window',
		'id':'afc-26','iso':'iso_26',
	},
	'af_27':{
		'hover': 'LIBERIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.liberianobserver.com/', // http://www.emansion.gov.lr/, http://www.thenewdawnliberia.com/
		'target':'new_window',
		'id':'afc-27','iso':'iso_27',
	},
	'af_28':{
		'hover': 'LIBYA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://libyanewstoday.com/', // https://www.libyaherald.com/, http://akhbarlibya24.net/
		'target':'new_window',
		'id':'afc-28','iso':'iso_28',
	},
	'af_29':{
		'hover': 'MADAGASCAR',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.lexpressmada.com/', // https://www.madagascar-tribune.com/, http://www.midi-madagasikara.mg/
		'target':'new_window',
		'id':'afc-29','iso':'iso_29',
	},
	'af_30':{
		'hover': 'MALAWI',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://mwnation.com/', // http://www.nyasatimes.com/, http://news.maraviexpress.com/
		'target':'new_window',
		'id':'afc-30','iso':'iso_30',
	},
	'af_31':{
		'hover': 'MALI',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.essor.ml/', // http://www.lesechos.ml/, https://www.maliweb.net/, https://amap.ml/
		'target':'new_window',
		'id':'afc-31','iso':'iso_31',
	},
	'af_32':{
		'hover': 'MAURITANIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lecalame.info/', // https://www.saharamedias.net/, // http://www.alakhbar.info/,  http://www.ani.mr/
		'target':'new_window',
		'id':'afc-32','iso':'iso_32',
	},
	'af_33':{
		'hover': 'MAURITIUS',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.lexpress.mu/', // http://www.lemauricien.com/, http://www.5plus.mu/, https://defimedia.info/
		'target':'new_window',
		'id':'afc-33','iso':'iso_33',
	},
	'af_34':{
		'hover': 'MOROCCO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://lematin.ma/', // https://www.leconomiste.com/, https://lanouvelletribune.info/
		'target':'new_window',
		'id':'afc-34','iso':'iso_34',
	},
	'af_35':{
		'hover': 'MOZAMBIQUE',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.jornalnoticias.co.mz/', // http://opais.sapo.mz/, https://www.mmo.co.mz/
		'target':'new_window',
		'id':'afc-35','iso':'iso_35',
	},
	'af_36':{
		'hover': 'NAMIBIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.newera.com.na/', // https://www.namibian.com.na/, https://economist.com.na/
		'target':'new_window',
		'id':'afc-36','iso':'iso_36',
	},
	'af_37':{
		'hover': 'NIGER',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lesahel.org/', // http://www.news.aniamey.com/, https://www.actuniger.com/, 
		'target':'new_window',
		'id':'afc-37','iso':'iso_37',
	},
	'af_38':{
		'hover': 'NIGERIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.vanguardngr.com/', // http://guardian.ng/, http://punchng.com/, http://thenationonlineng.net/
		'target':'new_window',
		'id':'afc-38','iso':'iso_38',
	},
	'af_39':{
		'hover': 'RWANDA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.therwandan.com/', // http://www.newtimes.co.rw/, http://www.newsofrwanda.com/category/english/, http://imvahonshya.co.rw/, http://www.rba.co.rw/
		'target':'new_window',
		'id':'afc-39','iso':'iso_39',
	},
	'af_40':{
		'hover': 'SÃO TOMÉ AND PRÍNCIPE',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.telanon.info/', // http://www.irinnews.org/afrique/afrique-de-louest/sao-tome-and-principe
		'target':'new_window',
		'id':'afc-40','iso':'iso_40',
	},
	'af_41':{
		'hover': 'SENEGAL',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lequotidien.sn/', // http://www.enqueteplus.com/, https://jollofnews.com/
		'target':'new_window',
		'id':'afc-41','iso':'iso_41',
	},
	'af_42':{
		'hover': 'SEYCHELLES',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.nation.sc/', // http://www.thepeople.sc/, http://www.sbc.sc/
		'target':'new_window',
		'id':'afc-42','iso':'iso_42',
	},
	'af_43':{
		'hover': 'SIERRA LEONE',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://awoko.org/', // http://www.critiqueecho.com/, http://www.expotimesonline.net/, http://www.thepatrioticvanguard.com/
		'target':'new_window',
		'id':'afc-43','iso':'iso_43',
	},
	'af_44':{
		'hover': 'SOMALIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.garoweonline.com/en', // https://www.hiiraan.com/, http://www.simbanews.net/
		'target':'new_window',
		'id':'afc-44','iso':'iso_44',
	},
	'af_45':{
		'hover': 'SOUTH AFRICA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://citizen.co.za/', // https://www.businesslive.co.za/bd/, https://www.dailysun.co.za/, https://city-press.news24.com/
		'target':'new_window',
		'id':'afc-45','iso':'iso_45',
	},
	'af_46':{
		'hover': 'SOUTH SUDAN',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://southsudannewsagency.org/', // http://www.southsudannation.com/, http://www.newsudanvision.com/, 
		'target':'new_window',
		'id':'afc-46','iso':'iso_46',
	},
	'af_47':{
		'hover': 'SUDAN',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.almshaheer.com/', // http://alsadda.net/, http://sudaneseonline.com/
		'target':'new_window',
		'id':'afc-47','iso':'iso_47',
	},
	'af_48':{
		'hover': 'SWAZILAND',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://new.observer.org.sz/', // http://www.times.co.sz/
		'target':'new_window',
		'id':'afc-48','iso':'iso_48',
	},
	'af_49':{
		'hover': 'TANZANIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.thecitizen.co.tz/', // http://www.dailynews.co.tz/, http://www.habarileo.co.tz/, http://www.mwananchi.co.tz/
		'target':'new_window',
		'id':'afc-49','iso':'iso_49',
	},
	'af_50':{
		'hover': 'TOGO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.letogolais.com/', // http://focusinfos.net/, http://togozine.com/
		'target':'new_window',
		'id':'afc-50','iso':'iso_50',
	},
	'af_51':{
		'hover': 'TUNISIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.letemps.com.tn/', // https://www.tap.info.tn/ar, http://www.lapresse.tn/, http://www.essahafa.tn/
		'target':'new_window',
		'id':'afc-51','iso':'iso_51',
	},
	'af_52':{
		'hover': 'UGANDA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.newvision.co.ug/', // http://www.monitor.co.ug/, http://www.observer.ug/, https://www.redpepper.co.ug/
		'target':'new_window',
		'id':'afc-52','iso':'iso_52',
	},
	'af_53':{
		'hover': 'ZAMBIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.daily-mail.co.zm/', // https://www.lusakatimes.com/, http://www.times.co.zm/
		'target':'new_window',
		'id':'afc-53','iso':'iso_53',
	},
	'af_54':{
		'hover': 'ZIMBABWE',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.newsday.co.zw/', // https://www.dailynews.co.zw/, https://www.herald.co.zw/
		'target':'new_window',
		'id':'afc-54','iso':'iso_54',
	},
}
/*---------------- Add pins on the main map of Africa ----------------*/
var af_pins = {
	'default':{
		'pinsShadow':'#808080', //shadow color below the pins
	},
	'pins':[
	{
		'shape':'rectangle',//choose the shape of the pin circle or rectangle
		'hover': '<u><b>Kampala</b></u><br>Example of pin on main map<br>Write any text and load images<br><img src="hover.png" width="196px">',//the content of the hover popup
		'pos_X':448,//location of the pin on X axis
		'pos_Y':325,//location of the pin on Y axis
		'width':16,//width of the pin if rectangle (if circle > use diameter)
		'height':16,//height of the pin if rectangle (if circle > delete this line)
		'outline':'#FFF',//outline color of the pin
		'upColor':'#0000FF',//color of the pin when map loads
		'overColor':'#3399ff',//color of the pin when mouse hover
		'downColor':'#00ffff',//color of the pin when clicked 
		//(trick, if you make this pin un-clickable > make the overColor and downColor the same)
		'url':'http://www.monitor.co.ug/',//URL of this pin
		'target':'new_window',//'new_window' opens URL in new window//'new_window' opens URL in the same window //'none' pin is not clickable
		'enable':true,//true/false to enable/disable this pin
	},
	{
		'shape':'circle',
		'hover': '<u><b>Dakar</b></u><br>Example of pin on main map<br>Write any text and load images',
		'pos_X':99,
		'pos_Y':209,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://www.enqueteplus.com/','target':'new_window',
		'enable':true,
	},
	]
};
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ALGERIA------------------------------------*/
var config_01 = {
	'default':{
		'landColor':'#EBECED', //general country color
		'borderColor':'#9CA8B6', //outline border color
		'shortName':'#d9d9d9', //color of the shortname of this country
		'pinsShadow':'#808080', //shadow color below the pins
	},
	'pins':[
	{
		'shape':'rectangle',//choose the shape of the pin circle or rectangle
		'hover': '<u><b>Algiers</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',//the content of the hover popup
		'pos_X':365,//location of the pin on X axis
		'pos_Y':39,//location of the pin on Y axis
		'width':16,//width of the pin if rectangle (if circle, use diameter)
		'height':16,//height of the pin if rectangle (if circle, delete this line)
		'outline':'#FFF',//outline color of the pin
		'upColor':'#0000FF',//color of the pin when map loads
		'overColor':'#3399ff',//color of the pin when mouse hover
		'downColor':'#00ffff',//color of the pin when clicked 
		//(trick, if you make this pin un-clickable > make the overColor and downColor the same)
		'url':'http://africanews.africa/',//URL of this pin
		'target':'same_window',//'new_window' opens URL in new window//'same_window' opens URL in the same window //'none' pin is not clickable
		'enable':true,//true/false to enable/disable this pin
	},
	{
		'shape':'circle',
		'hover': '<u><b>Oran</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':256,'pos_Y':72,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Timimoun</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':281,'pos_Y':293,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Constantine</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':472,'pos_Y':50,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Batna</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':459,'pos_Y':78,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Chlef</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':314,'pos_Y':58,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tamanrasset</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':439,'pos_Y':499,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ANGOLA------------------------------------*/
var config_02 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Luanda</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':201,'pos_Y':244,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Benguela</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':203,'pos_Y':354,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Menongue</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':328,'pos_Y':414,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Namibe</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':165,'pos_Y':431,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Uíge</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':249,'pos_Y':210,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Luena</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':395,'pos_Y':329,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Lubango</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':202,'pos_Y':422,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE BENIN------------------------------------*/
var config_03 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Porto-Novo</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':339,'pos_Y':376,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE BOTSWANA------------------------------------*/
var config_04 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Gaborone</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':364,'pos_Y':380,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Selebi-Phikwe</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':421,'pos_Y':301,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Francistown</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':412,'pos_Y':273,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE BURKINA FASO------------------------------------*/
var config_05 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Ouagadougou</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':341,'pos_Y':288,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bobo-Dioulasso</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':254,'pos_Y':330,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE BURUNDI------------------------------------*/
var config_06 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Bujumbura</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':319,'pos_Y':302,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE CAMEROON------------------------------------*/
var config_07 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Yaoundé</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':287,'pos_Y':396,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Douala</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':233,'pos_Y':393,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Ebolowa</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':277,'pos_Y':424,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bamenda</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':249,'pos_Y':336,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Garoua</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':343,'pos_Y':239,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bertoua</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':350,'pos_Y':375,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE CAPE VERDE------------------------------------*/
var config_08 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Praia</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':325,'pos_Y':347,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE CENTRAL AFRICAN REPUBLIC------------------------------------*/
var config_09 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Bangui</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':275,'pos_Y':382,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bambari</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':338,'pos_Y':343,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bouar</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':186,'pos_Y':338,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE CHAD------------------------------------*/
var config_10 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>N’Djamena</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':217,'pos_Y':414,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Abéché</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':388,'pos_Y':369,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE COMOROS------------------------------------*/
var config_11 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Moroni</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':274,'pos_Y':286,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE DEMOCRATIC REPUBLIC OF THE CONGO------------------------------------*/
var config_12 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Kinshasa</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':123,'pos_Y':341,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kananga</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':333,'pos_Y':384,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Mbuji-Mayi</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':368,'pos_Y':390,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kisangani</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':416,'pos_Y':196,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kikwit</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':226,'pos_Y':359,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE REPUBLIC OF THE CONGO------------------------------------*/
var config_13 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Brazzaville</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':333,'pos_Y':411,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Pointe Noire</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':233,'pos_Y':424,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Loubomo</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':254,'pos_Y':411,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE DJIBOUTI------------------------------------*/
var config_14 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Djibouti City</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':345,'pos_Y':309,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE EGYPT------------------------------------*/
var config_15 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Cairo</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':350,'pos_Y':195,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Alexandria</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':310,'pos_Y':159,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Suez</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':387,'pos_Y':196,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Asyut</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':349,'pos_Y':289,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Aswan</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':399,'pos_Y':386,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE EQUATORIAL GUINEA------------------------------------*/
var config_16 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Malabo</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':302,'pos_Y':258,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ERITREA------------------------------------*/
var config_17 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Asmara</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':313,'pos_Y':303,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Assab</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':431,'pos_Y':372,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ETHIOPIA------------------------------------*/
var config_18 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Addis Ababa</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':282,'pos_Y':327,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Dire Dawa</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':374,'pos_Y':310,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Gondar</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':245,'pos_Y':219,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE GABON------------------------------------*/
var config_19 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Libreville</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':254,'pos_Y':273,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Port-Gentil</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':238,'pos_Y':310,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE GAMBIA------------------------------------*/
var config_20 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Banjul</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':291,'pos_Y':298,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE GHANA------------------------------------*/
var config_21 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Accra</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':351,'pos_Y':382,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tamale</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':335,'pos_Y':274,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Sekondi-Takoradi</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':306,'pos_Y':400,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE GUINEA------------------------------------*/
var config_22 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Conakry</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':256,'pos_Y':309,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kankan</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':381,'pos_Y':288,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Labé</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':291,'pos_Y':262,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE GUINEA-BISSAU------------------------------------*/
var config_23 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Bissau</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':310,'pos_Y':302,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE IVORY COAST------------------------------------*/
var config_24 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Yamoussoukro</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':331,'pos_Y':325,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Abidjan</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':370,'pos_Y':366,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Korhogo</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':321,'pos_Y':248,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bouna</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':398,'pos_Y':256,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Daloa</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':296,'pos_Y':232,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE KENYA------------------------------------*/
var config_25 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Nairobi</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':300,'pos_Y':364,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Mombasa</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':383,'pos_Y':441,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Nakuru</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':280,'pos_Y':335,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Eldoret</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':256,'pos_Y':313,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kitale</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':247,'pos_Y':300,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE LESOTHO------------------------------------*/
var config_26 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Maseru</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':296,'pos_Y':293,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE LIBERIA------------------------------------*/
var config_27 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Monrovia</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':283,'pos_Y':311,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE LIBYA------------------------------------*/
var config_28 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Tripoli</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':193,'pos_Y':118,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Misrata</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':252,'pos_Y':136,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Benghazi</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':399,'pos_Y':142,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bayda</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':448,'pos_Y':118,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MADAGASCAR------------------------------------*/
var config_29 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Antananarivo</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':348,'pos_Y':318,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Antsirabe</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':335,'pos_Y':347,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Mahajanga</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':316,'pos_Y':224,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Toamasina</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':404,'pos_Y':294,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Toliara</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':241,'pos_Y':456,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MALAWI------------------------------------*/
var config_30 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Lilongwe</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':318,'pos_Y':337,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Blantyre</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':353,'pos_Y':392,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Zomba</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':361,'pos_Y':379,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MALI------------------------------------*/
var config_31 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Bamako</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':210,'pos_Y':460,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Gao</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':445,'pos_Y':352,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tombouctou</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':356,'pos_Y':338,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MAURITANIA------------------------------------*/
var config_32 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Nouakchott</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':175,'pos_Y':404,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MAURITIUS------------------------------------*/
var config_33 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Port Louis</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':327,'pos_Y':302,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MOROCCO------------------------------------*/
var config_34 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Rabat</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':385,'pos_Y':155,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Fez</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':438,'pos_Y':150,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Marrakesh</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':350,'pos_Y':231,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Casablanca</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':359,'pos_Y':167,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tangier</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':413,'pos_Y':90,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MOZAMBIQUE------------------------------------*/
var config_35 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Maputo</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':241,'pos_Y':550,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Nacala</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':484,'pos_Y':198,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Nampula</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':442,'pos_Y':217,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Pemba</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':477,'pos_Y':151,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Beira</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':308,'pos_Y':356,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE NAMIBIA------------------------------------*/
var config_36 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Windhoek</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':277,'pos_Y':308,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Lüderitz</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':222,'pos_Y':436,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Walvis Bay</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':202,'pos_Y':320,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE NIGER------------------------------------*/
var config_37 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Niamey</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':146,'pos_Y':436,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tahoua</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':236,'pos_Y':396,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Zinder</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':347,'pos_Y':428,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Maradi</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':293,'pos_Y':439,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE NIGERIA------------------------------------*/
var config_38 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Abuja</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':307,'pos_Y':340,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Maiduguri</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':476,'pos_Y':253,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Lagos</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':185,'pos_Y':405,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Benin City</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':250,'pos_Y':413,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kano</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':339,'pos_Y':248,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Ibadan</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':202,'pos_Y':380,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Zaria</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':316,'pos_Y':274,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE RWANDA------------------------------------*/
var config_39 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Kigali</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':330,'pos_Y':308,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SÃO TOMÉ AND PRÍNCIPE------------------------------------*/
var config_40 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>São Tomé</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':338,'pos_Y':295,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SENEGAL------------------------------------*/
var config_41 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Dakar</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':243,'pos_Y':292,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kaolack</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':288,'pos_Y':310,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SEYCHELLES------------------------------------*/
var config_42 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Victoria</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':323,'pos_Y':294,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SIERRA LEONE------------------------------------*/
var config_43 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Freetown</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':281,'pos_Y':301,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SOMALIA------------------------------------*/
var config_44 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Mogadishu</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':316,'pos_Y':433,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bosaso</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':435,'pos_Y':171,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Qardho</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':430,'pos_Y':219,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Hargeisa</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':283,'pos_Y':218,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SOUTH AFRICA------------------------------------*/
var config_45 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Bloemfontein</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':377,'pos_Y':335,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Cape Town</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':147,'pos_Y':495,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Pretoria</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':436,'pos_Y':225,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Johannesburg</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':427,'pos_Y':242,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Durban</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':515,'pos_Y':358,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>East London</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':423,'pos_Y':464,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Port Elizabeth</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':353,'pos_Y':490,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SOUTH SUDAN------------------------------------*/
var config_46 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Juba</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':378,'pos_Y':409,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Wau</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':271,'pos_Y':325,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Malakal</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':381,'pos_Y':271,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SUDAN------------------------------------*/
var config_47 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Khartoum</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':395,'pos_Y':310,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Port Sudan</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':530,'pos_Y':185,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Al Fashir</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':182,'pos_Y':366,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SWAZILAND------------------------------------*/
var config_48 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Mbabane</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':325,'pos_Y':293,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE TANZANIA------------------------------------*/
var config_49 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Dodoma</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':355,'pos_Y':332,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Dar es Salaam</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':457,'pos_Y':346,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Mwanza</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':271,'pos_Y':218,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tanga</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':453,'pos_Y':292,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tabora</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':268,'pos_Y':290,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE TOGO------------------------------------*/
var config_50 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Lomé</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':325,'pos_Y':369,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}

/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE TUNISIA------------------------------------*/
var config_51 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Tunis</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':348,'pos_Y':197,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Sfax</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':360,'pos_Y':268,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}

/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE UGANDA------------------------------------*/
var config_52 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Kampala</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':338,'pos_Y':342,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}

/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ZAMBIA------------------------------------*/
var config_53 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Lusaka</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':323,'pos_Y':387,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Chingola</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':308,'pos_Y':303,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kitwe</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':324,'pos_Y':312,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}

/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ZIMBABWE------------------------------------*/
var config_54 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Harare</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':375,'pos_Y':269,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bulawayo</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':300,'pos_Y':341,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Gweru</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':336,'pos_Y':317,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
};
// Page Elements

var engadget = document.getElementById('engadget');
var recode = document.getElementById('recode');
var nextWeb = document.getElementById('nextWeb');
var egypt = document.getElementById('egypt');
var main = document.getElementsByTagName('main')[0];



// News API Data

var apiKey = 'af0f865d44414102884021a59d2e51c4';
var engadgetUrl = 'https://newsapi.org/v2/top-headlines?country=ng&apiKey=af0f865d44414102884021a59d2e51c4';
var recodeUrl = 'https://newsapi.org/v2/top-headlines?country=za&apiKey=af0f865d44414102884021a59d2e51c4';
var nextWebUrl = 'https://newsapi.org/v2/top-headlines?country=ma&apiKey=af0f865d44414102884021a59d2e51c4';
var egyptUrl = 'https://newsapi.org/v2/top-headlines?country=eg&apiKey=af0f865d44414102884021a59d2e51c4';

// Request News Function
var getNews = async(url) => {
     let response = await fetch(url);
     let jsonResponse = await response.json();
  console.log(jsonResponse);
  let articlesArray = jsonResponse.articles.slice(0, 10);
  //console.log(articlesArray);
  return articlesArray;
  
}
// Render Function

function renderNews(articles) {
  articles.map((article, index) => {
  let articleRow =
      '<div class="articlerow">' +
      ' <div class="article">' +
      '   <h2 class="title">' + article.title + '</h2>' +
      '   <h3>By ' + article.author + '</h3>' +
      '   <p> ' + article.description + '</p>' +
      '   <a href="' + article.url + '" target="_blank" class="readmore"><p>Read More</p></a>' +
      ' </div>' +
      ' <div class="share">' +
      '   <img class="storyimage" src="' + article.urlToImage + '" />' +
      '   <a href="https://twitter.com/" target="_blank"><button type="button" class="tweet" id="tweet ' + index + '">' +
      '   <i class="fa fa-twitter" aria-hidden="true"></i>Tweet This</button></a>' +
      ' </div>' +
      '</div>';

    main.innerHTML += articleRow;
  });
  return articles;
}

// Post Tweet Function

function sendTweets(newsObjects) {
  let tweetButtons = document.getElementsByClassName('tweet');
  for (let i = 0; i < tweetButtons.length; i++) {
    tweetButtons[i].addEventListener('click', function() {
      // Call Post Status function here
      Twitter.postStatus(newsObjects[i].url);
      tweetButtons[i].innerHTML = "Tweeted";
    }, false);
  }
}

// Button Event Listeners

engadget.addEventListener('click', function() {
  main.innerHTML = ' ';
  // Call getNews() here
  getNews(engadgetUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);

recode.addEventListener('click', function() {
  main.innerHTML = ' ';
  // Call getNews() here
  getNews(recodeUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);

nextWeb.addEventListener('click', function() {
  main.innerHTML = ' ';
  // Call getNews() here
  getNews(nextWebUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);

egypt.addEventListener('click', function() {
  main.innerHTML = ' ';
  // Call getNews() here
  getNews(egyptUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);
function isTouchEnabled() {
	return (('ontouchstart' in window)
		|| (navigator.MaxTouchPoints > 0)
		|| (navigator.msMaxTouchPoints > 0));
}

$(function(){
	addEvent('af_1');addEvent('af_2');addEvent('af_3');addEvent('af_4');addEvent('af_5');addEvent('af_6');addEvent('af_7');addEvent('af_8');addEvent('af_9');addEvent('af_10');addEvent('af_11');addEvent('af_12');addEvent('af_13');addEvent('af_14');addEvent('af_15');addEvent('af_16');addEvent('af_17');addEvent('af_18');addEvent('af_19');addEvent('af_20');addEvent('af_21');addEvent('af_22');addEvent('af_23');addEvent('af_24');addEvent('af_25');addEvent('af_26');addEvent('af_27');addEvent('af_28');addEvent('af_29');addEvent('af_30');addEvent('af_31');addEvent('af_32');addEvent('af_33');addEvent('af_34');addEvent('af_35');addEvent('af_36');addEvent('af_37');addEvent('af_38');addEvent('af_39');addEvent('af_40');addEvent('af_41');addEvent('af_42');addEvent('af_43');addEvent('af_44');addEvent('af_45');addEvent('af_46');addEvent('af_47');addEvent('af_48');addEvent('af_49');addEvent('af_50');addEvent('af_51');addEvent('af_52');addEvent('af_53');addEvent('af_54');
})
function addEvent(id,relationId){
	var _obj = $('#'+id);
	var _Textobj = $('#'+id+','+'#'+af_config[id]['iso']);

	$('#abbs').attr({'fill':af_config['default']['shortNames']});

	_obj.attr({'fill':af_config[id]['upColor'],'stroke':af_config['default']['borderColor']});
	_Textobj.attr({'cursor':'default'});
	if(af_config[id]['enable'] == true){
		if (isTouchEnabled()) {
			_Textobj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':af_config[id]['downColor']});
				$('#map-tip').show().html(af_config[id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			if(af_config[id]['zoom'] == 'no'){
				_Textobj.mouseup(function(){
					$('#'+id).css({'fill':af_config[id]['overColor']});
					if(af_config[id]['target'] == 'new_window'){
						window.open(af_config[id]['url']);	
					}else if(af_config[id]['target'] == 'same_window'){
						window.parent.location.href=af_config[id]['url'];
					}
				})
			}
		}
		_Textobj.attr({'cursor':'pointer'});
		_Textobj.hover(function(){
			$('#map-tip').show().html(af_config[id]['hover']);
			_obj.css({'fill':af_config[id]['overColor']})
		},function(){
			$('#map-tip').hide();
			$('#'+id).css({'fill':af_config[id]['upColor']});
		})
		_Textobj.mousedown(function(){
			$('#'+id).css({'fill':af_config[id]['downColor']});
		})
		if(af_config[id]['zoom'] == 'no'){
			_Textobj.mouseup(function(){
				$('#'+id).css({'fill':af_config[id]['overColor']});
				if(af_config[id]['target'] == 'new_window'){
					window.open(af_config[id]['url']);	
				}else if(af_config[id]['target'] == 'same_window'){
					window.parent.location.href=af_config[id]['url'];
				}
			})
		} else {
			_Textobj.mouseup(function(){
				$('#'+id).css({'fill':af_config[id]['overColor']});
				$('#afc-01, #afc-02, #afc-03, #afc-04, #afc-05, #afc-06, #afc-07, #afc-08, #afc-09, #afc-10, #afc-11, #afc-12, #afc-13, #afc-14, #afc-15, #afc-16, #afc-17, #afc-18, #afc-19, #afc-20, #afc-21, #afc-22, #afc-23, #afc-24, #afc-25, #afc-26, #afc-27, #afc-28, #afc-29, #afc-30, #afc-31, #afc-32, #afc-33, #afc-34, #afc-35, #afc-36, #afc-37, #afc-38, #afc-39, #afc-40, #afc-41, #afc-42, #afc-43, #afc-44, #afc-45, #afc-46, #afc-47, #afc-48, #afc-49, #afc-50, #afc-51, #afc-52, #afc-53, #afc-54').hide().animate({'opacity':'0'}, 100);
				$('#af-map').hide().animate({'opacity':'0'}, 1000);
				$('#'+af_config[id]['id']).show().animate({'opacity':'1'}, 1000);
			})
		}
		_Textobj.mousemove(function(e){
			var x=e.pageX+10, y=e.pageY+15;
			var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
			x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
			y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
			$('#map-tip').css({left:x, top:y})
		})
	}
}

$(document).ready(function(){
	$('#afc-01, #afc-02, #afc-03, #afc-04, #afc-05, #afc-06, #afc-07, #afc-08, #afc-09, #afc-10, #afc-11, #afc-12, #afc-13, #afc-14, #afc-15, #afc-16, #afc-17, #afc-18, #afc-19, #afc-20, #afc-21, #afc-22, #afc-23, #afc-24, #afc-25, #afc-26, #afc-27, #afc-28, #afc-29, #afc-30, #afc-31, #afc-32, #afc-33, #afc-34, #afc-35, #afc-36, #afc-37, #afc-38, #afc-39, #afc-40, #afc-41, #afc-42, #afc-43, #afc-44, #afc-45, #afc-46, #afc-47, #afc-48, #afc-49, #afc-50, #afc-51, #afc-52, #afc-53, #afc-54').hide().animate({'opacity':'0'}, 1000);
	if (isTouchEnabled()) {
		$('.back_btn').on('touchstart', function(){
			$(this).css({'fill' : '#f00'});
		});
	}
	$('.back_btn').on('click', function(){
		$('#afc-01, #afc-02, #afc-03, #afc-04, #afc-05, #afc-06, #afc-07, #afc-08, #afc-09, #afc-10, #afc-11, #afc-12, #afc-13, #afc-14, #afc-15, #afc-16, #afc-17, #afc-18, #afc-19, #afc-20, #afc-21, #afc-22, #afc-23, #afc-24, #afc-25, #afc-26, #afc-27, #afc-28, #afc-29, #afc-30, #afc-31, #afc-32, #afc-33, #afc-34, #afc-35, #afc-36, #afc-37, #afc-38, #afc-39, #afc-40, #afc-41, #afc-42, #afc-43, #afc-44, #afc-45, #afc-46, #afc-47, #afc-48, #afc-49, #afc-50, #afc-51, #afc-52, #afc-53, #afc-54').hide().animate({'opacity':'0'}, 1000);
		$('#af-map').show().animate({'opacity':'1'}, 1000);
	});
});
/*======================================================================================*/
/*======================================== PINS ========================================*/
/*======================================================================================*/
$(function(){
	var pins_len = af_pins['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("af_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (af_pins['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", af_pins['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", af_pins['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", af_pins['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", af_pins['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'af_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", af_pins['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", af_pins['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", af_pins['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", af_pins['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",af_pins['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'af_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				afDynamicAddEvent(i);
			}
			else if(af_pins['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", af_pins['pins'][i]['pos_X']- af_pins['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", af_pins['pins'][i]['pos_Y']- af_pins['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", af_pins['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", af_pins['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", af_pins['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'af_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", af_pins['pins'][i]['pos_X']- af_pins['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", af_pins['pins'][i]['pos_Y']- af_pins['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", af_pins['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", af_pins['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", af_pins['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",af_pins['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'af_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				afDynamicAddEvent(i);
			}
		}
	}
});

function afDynamicAddEvent(id){
	var obj = $('#af_map_pins_'+id);

	if(af_pins['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':af_pins['pins'][id]['downColor']});
				$('#map-tip').show().html(af_pins['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':af_pins['pins'][id]['upColor']});
				if(af_pins['pins'][id]['target'] == 'new_window'){
					window.open(af_pins['pins'][id]['url']);
				}else if(af_pins['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=af_pins['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(af_pins['pins'][id]['hover']);
			obj.css({'fill':af_pins['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':af_pins['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':af_pins['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':af_pins['pins'][id]['overColor']});
			if(af_pins['pins'][id]['target'] == 'new_window'){
				window.open(af_pins['pins'][id]['url']);
			}else if(af_pins['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=af_pins['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.1 ======================================*/
$(function(){
	$('#afc-01').find('path').attr({'fill':config_01['default']['landColor']}).css({'stroke':config_01['default']['borderColor']});
	$('#afc-01').find('text').attr({'fill':config_01['default']['shortName']});
	var pins_len = config_01['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c01_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_01['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_01['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_01['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_01['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_01['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c01_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_01['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_01['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_01['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_01['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_01['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c01_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c01DynAddE(i);
			}
			else if(config_01['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_01['pins'][i]['pos_X']- config_01['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_01['pins'][i]['pos_Y']- config_01['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_01['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_01['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_01['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c01_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_01['pins'][i]['pos_X']- config_01['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_01['pins'][i]['pos_Y']- config_01['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_01['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_01['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_01['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_01['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c01_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c01DynAddE(i);
			}
		}
	}
});

function c01DynAddE(id){
	var obj = $('#c01_map_pins_'+id);

	if(config_01['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_01['pins'][id]['downColor']});
				$('#map-tip').show().html(config_01['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_01['pins'][id]['upColor']});
				if(config_01['pins'][id]['target'] == 'new_window'){
					window.open(config_01['pins'][id]['url']);
				}else if(config_01['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_01['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_01['pins'][id]['hover']);
			obj.css({'fill':config_01['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_01['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_01['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_01['pins'][id]['overColor']});
			if(config_01['pins'][id]['target'] == 'new_window'){
				window.open(config_01['pins'][id]['url']);
			}else if(config_01['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_01['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.2 ======================================*/
$(function(){
	$('#afc-02').find('path').attr({'fill':config_02['default']['landColor']}).css({'stroke':config_02['default']['borderColor']});
	$('#afc-02').find('text').attr({'fill':config_02['default']['shortName']});
	var pins_len = config_02['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c02_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_02['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_02['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_02['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_02['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_02['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c02_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_02['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_02['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_02['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_02['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_02['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c02_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c02DynAddE(i);
			}
			else if(config_02['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_02['pins'][i]['pos_X']- config_02['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_02['pins'][i]['pos_Y']- config_02['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_02['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_02['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_02['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c02_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_02['pins'][i]['pos_X']- config_02['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_02['pins'][i]['pos_Y']- config_02['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_02['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_02['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_02['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_02['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c02_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c02DynAddE(i);
			}
		}
	}
});

function c02DynAddE(id){
	var obj = $('#c02_map_pins_'+id);

	if(config_02['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_02['pins'][id]['downColor']});
				$('#map-tip').show().html(config_02['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_02['pins'][id]['upColor']});
				if(config_02['pins'][id]['target'] == 'new_window'){
					window.open(config_02['pins'][id]['url']);
				}else if(config_02['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_02['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_02['pins'][id]['hover']);
			obj.css({'fill':config_02['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_02['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_02['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_02['pins'][id]['overColor']});
			if(config_02['pins'][id]['target'] == 'new_window'){
				window.open(config_02['pins'][id]['url']);
			}else if(config_02['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_02['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.3 ======================================*/
$(function(){
	$('#afc-03').find('path').attr({'fill':config_03['default']['landColor']}).css({'stroke':config_03['default']['borderColor']});
	$('#afc-03').find('text').attr({'fill':config_03['default']['shortName']});
	var pins_len = config_03['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c03_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_03['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_03['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_03['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_03['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_03['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c03_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_03['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_03['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_03['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_03['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_03['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c03_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c03DynAddE(i);
			}
			else if(config_03['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_03['pins'][i]['pos_X']- config_03['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_03['pins'][i]['pos_Y']- config_03['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_03['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_03['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_03['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c03_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_03['pins'][i]['pos_X']- config_03['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_03['pins'][i]['pos_Y']- config_03['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_03['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_03['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_03['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_03['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c03_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c03DynAddE(i);
			}
		}
	}
});

function c03DynAddE(id){
	var obj = $('#c03_map_pins_'+id);

	if(config_03['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_03['pins'][id]['downColor']});
				$('#map-tip').show().html(config_03['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_03['pins'][id]['upColor']});
				if(config_03['pins'][id]['target'] == 'new_window'){
					window.open(config_03['pins'][id]['url']);
				}else if(config_03['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_03['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_03['pins'][id]['hover']);
			obj.css({'fill':config_03['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_03['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_03['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_03['pins'][id]['overColor']});
			if(config_03['pins'][id]['target'] == 'new_window'){
				window.open(config_03['pins'][id]['url']);
			}else if(config_03['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_03['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.4 ======================================*/
$(function(){
	$('#afc-04').find('path').attr({'fill':config_04['default']['landColor']}).css({'stroke':config_04['default']['borderColor']});
	$('#afc-04').find('text').attr({'fill':config_04['default']['shortName']});
	var pins_len = config_04['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c04_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_04['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_04['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_04['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_04['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_04['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c04_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_04['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_04['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_04['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_04['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_04['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c04_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c04DynAddE(i);
			}
			else if(config_04['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_04['pins'][i]['pos_X']- config_04['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_04['pins'][i]['pos_Y']- config_04['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_04['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_04['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_04['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c04_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_04['pins'][i]['pos_X']- config_04['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_04['pins'][i]['pos_Y']- config_04['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_04['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_04['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_04['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_04['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c04_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c04DynAddE(i);
			}
		}
	}
});

function c04DynAddE(id){
	var obj = $('#c04_map_pins_'+id);

	if(config_04['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_04['pins'][id]['downColor']});
				$('#map-tip').show().html(config_04['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_04['pins'][id]['upColor']});
				if(config_04['pins'][id]['target'] == 'new_window'){
					window.open(config_04['pins'][id]['url']);
				}else if(config_04['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_04['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_04['pins'][id]['hover']);
			obj.css({'fill':config_04['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_04['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_04['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_04['pins'][id]['overColor']});
			if(config_04['pins'][id]['target'] == 'new_window'){
				window.open(config_04['pins'][id]['url']);
			}else if(config_04['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_04['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.5 ======================================*/
$(function(){
	$('#afc-05').find('path').attr({'fill':config_05['default']['landColor']}).css({'stroke':config_05['default']['borderColor']});
	$('#afc-05').find('text').attr({'fill':config_05['default']['shortName']});
	var pins_len = config_05['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c05_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_05['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_05['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_05['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_05['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_05['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c05_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_05['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_05['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_05['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_05['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_05['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c05_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c05DynAddE(i);
			}
			else if(config_05['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_05['pins'][i]['pos_X']- config_05['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_05['pins'][i]['pos_Y']- config_05['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_05['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_05['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_05['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c05_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_05['pins'][i]['pos_X']- config_05['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_05['pins'][i]['pos_Y']- config_05['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_05['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_05['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_05['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_05['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c05_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c05DynAddE(i);
			}
		}
	}
});

function c05DynAddE(id){
	var obj = $('#c05_map_pins_'+id);

	if(config_05['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_05['pins'][id]['downColor']});
				$('#map-tip').show().html(config_05['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_05['pins'][id]['upColor']});
				if(config_05['pins'][id]['target'] == 'new_window'){
					window.open(config_05['pins'][id]['url']);
				}else if(config_05['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_05['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_05['pins'][id]['hover']);
			obj.css({'fill':config_05['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_05['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_05['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_05['pins'][id]['overColor']});
			if(config_05['pins'][id]['target'] == 'new_window'){
				window.open(config_05['pins'][id]['url']);
			}else if(config_05['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_05['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.6 ======================================*/
$(function(){
	$('#afc-06').find('path').attr({'fill':config_06['default']['landColor']}).css({'stroke':config_06['default']['borderColor']});
	$('#afc-06').find('text').attr({'fill':config_06['default']['shortName']});
	var pins_len = config_06['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c06_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_06['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_06['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_06['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_06['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_06['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c06_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_06['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_06['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_06['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_06['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_06['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c06_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c06DynAddE(i);
			}
			else if(config_06['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_06['pins'][i]['pos_X']- config_06['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_06['pins'][i]['pos_Y']- config_06['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_06['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_06['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_06['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c06_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_06['pins'][i]['pos_X']- config_06['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_06['pins'][i]['pos_Y']- config_06['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_06['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_06['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_06['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_06['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c06_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c06DynAddE(i);
			}
		}
	}
});

function c06DynAddE(id){
	var obj = $('#c06_map_pins_'+id);

	if(config_06['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_06['pins'][id]['downColor']});
				$('#map-tip').show().html(config_06['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_06['pins'][id]['upColor']});
				if(config_06['pins'][id]['target'] == 'new_window'){
					window.open(config_06['pins'][id]['url']);
				}else if(config_06['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_06['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_06['pins'][id]['hover']);
			obj.css({'fill':config_06['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_06['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_06['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_06['pins'][id]['overColor']});
			if(config_06['pins'][id]['target'] == 'new_window'){
				window.open(config_06['pins'][id]['url']);
			}else if(config_06['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_06['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.7 ======================================*/
$(function(){
	$('#afc-07').find('path').attr({'fill':config_07['default']['landColor']}).css({'stroke':config_07['default']['borderColor']});
	$('#afc-07').find('text').attr({'fill':config_07['default']['shortName']});
	var pins_len = config_07['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c07_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_07['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_07['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_07['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_07['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_07['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c07_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_07['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_07['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_07['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_07['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_07['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c07_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c07DynAddE(i);
			}
			else if(config_07['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_07['pins'][i]['pos_X']- config_07['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_07['pins'][i]['pos_Y']- config_07['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_07['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_07['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_07['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c07_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_07['pins'][i]['pos_X']- config_07['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_07['pins'][i]['pos_Y']- config_07['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_07['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_07['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_07['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_07['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c07_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c07DynAddE(i);
			}
		}
	}
});

function c07DynAddE(id){
	var obj = $('#c07_map_pins_'+id);

	if(config_07['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_07['pins'][id]['downColor']});
				$('#map-tip').show().html(config_07['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_07['pins'][id]['upColor']});
				if(config_07['pins'][id]['target'] == 'new_window'){
					window.open(config_07['pins'][id]['url']);
				}else if(config_07['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_07['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_07['pins'][id]['hover']);
			obj.css({'fill':config_07['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_07['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_07['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_07['pins'][id]['overColor']});
			if(config_07['pins'][id]['target'] == 'new_window'){
				window.open(config_07['pins'][id]['url']);
			}else if(config_07['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_07['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.8 ======================================*/
$(function(){
	$('#afc-08').find('path').attr({'fill':config_08['default']['landColor']}).css({'stroke':config_08['default']['borderColor']});
	$('#afc-08').find('text').attr({'fill':config_08['default']['shortName']});
	var pins_len = config_08['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c08_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_08['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_08['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_08['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_08['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_08['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c08_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_08['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_08['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_08['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_08['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_08['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c08_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c08DynAddE(i);
			}
			else if(config_08['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_08['pins'][i]['pos_X']- config_08['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_08['pins'][i]['pos_Y']- config_08['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_08['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_08['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_08['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c08_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_08['pins'][i]['pos_X']- config_08['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_08['pins'][i]['pos_Y']- config_08['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_08['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_08['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_08['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_08['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c08_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c08DynAddE(i);
			}
		}
	}
});

function c08DynAddE(id){
	var obj = $('#c08_map_pins_'+id);

	if(config_08['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_08['pins'][id]['downColor']});
				$('#map-tip').show().html(config_08['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_08['pins'][id]['upColor']});
				if(config_08['pins'][id]['target'] == 'new_window'){
					window.open(config_08['pins'][id]['url']);
				}else if(config_08['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_08['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_08['pins'][id]['hover']);
			obj.css({'fill':config_08['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_08['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_08['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_08['pins'][id]['overColor']});
			if(config_08['pins'][id]['target'] == 'new_window'){
				window.open(config_08['pins'][id]['url']);
			}else if(config_08['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_08['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.9 ======================================*/
$(function(){
	$('#afc-09').find('path').attr({'fill':config_09['default']['landColor']}).css({'stroke':config_09['default']['borderColor']});
	$('#afc-09').find('text').attr({'fill':config_09['default']['shortName']});
	var pins_len = config_09['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c09_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_09['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_09['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_09['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_09['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_09['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c09_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_09['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_09['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_09['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_09['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_09['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c09_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c09DynAddE(i);
			}
			else if(config_09['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_09['pins'][i]['pos_X']- config_09['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_09['pins'][i]['pos_Y']- config_09['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_09['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_09['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_09['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c09_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_09['pins'][i]['pos_X']- config_09['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_09['pins'][i]['pos_Y']- config_09['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_09['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_09['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_09['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_09['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c09_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c09DynAddE(i);
			}
		}
	}
});

function c09DynAddE(id){
	var obj = $('#c09_map_pins_'+id);

	if(config_09['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_09['pins'][id]['downColor']});
				$('#map-tip').show().html(config_09['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_09['pins'][id]['upColor']});
				if(config_09['pins'][id]['target'] == 'new_window'){
					window.open(config_09['pins'][id]['url']);
				}else if(config_09['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_09['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_09['pins'][id]['hover']);
			obj.css({'fill':config_09['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_09['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_09['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_09['pins'][id]['overColor']});
			if(config_09['pins'][id]['target'] == 'new_window'){
				window.open(config_09['pins'][id]['url']);
			}else if(config_09['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_09['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.10 ======================================*/
$(function(){
	$('#afc-10').find('path').attr({'fill':config_10['default']['landColor']}).css({'stroke':config_10['default']['borderColor']});
	$('#afc-10').find('text').attr({'fill':config_10['default']['shortName']});
	var pins_len = config_10['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c10_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_10['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_10['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_10['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_10['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_10['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c10_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_10['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_10['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_10['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_10['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_10['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c10_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c10DynAddE(i);
			}
			else if(config_10['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_10['pins'][i]['pos_X']- config_10['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_10['pins'][i]['pos_Y']- config_10['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_10['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_10['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_10['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c10_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_10['pins'][i]['pos_X']- config_10['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_10['pins'][i]['pos_Y']- config_10['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_10['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_10['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_10['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_10['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c10_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c10DynAddE(i);
			}
		}
	}
});

function c10DynAddE(id){
	var obj = $('#c10_map_pins_'+id);

	if(config_10['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_10['pins'][id]['downColor']});
				$('#map-tip').show().html(config_10['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_10['pins'][id]['upColor']});
				if(config_10['pins'][id]['target'] == 'new_window'){
					window.open(config_10['pins'][id]['url']);
				}else if(config_10['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_10['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_10['pins'][id]['hover']);
			obj.css({'fill':config_10['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_10['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_10['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_10['pins'][id]['overColor']});
			if(config_10['pins'][id]['target'] == 'new_window'){
				window.open(config_10['pins'][id]['url']);
			}else if(config_10['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_10['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.11 ======================================*/
$(function(){
	$('#afc-11').find('path').attr({'fill':config_11['default']['landColor']}).css({'stroke':config_11['default']['borderColor']});
	$('#afc-11').find('text').attr({'fill':config_11['default']['shortName']});
	var pins_len = config_11['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c11_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_11['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_11['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_11['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_11['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_11['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c11_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_11['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_11['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_11['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_11['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_11['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c11_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c11DynAddE(i);
			}
			else if(config_11['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_11['pins'][i]['pos_X']- config_11['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_11['pins'][i]['pos_Y']- config_11['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_11['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_11['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_11['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c11_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_11['pins'][i]['pos_X']- config_11['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_11['pins'][i]['pos_Y']- config_11['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_11['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_11['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_11['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_11['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c11_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c11DynAddE(i);
			}
		}
	}
});

function c11DynAddE(id){
	var obj = $('#c11_map_pins_'+id);

	if(config_11['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_11['pins'][id]['downColor']});
				$('#map-tip').show().html(config_11['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_11['pins'][id]['upColor']});
				if(config_11['pins'][id]['target'] == 'new_window'){
					window.open(config_11['pins'][id]['url']);
				}else if(config_11['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_11['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_11['pins'][id]['hover']);
			obj.css({'fill':config_11['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_11['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_11['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_11['pins'][id]['overColor']});
			if(config_11['pins'][id]['target'] == 'new_window'){
				window.open(config_11['pins'][id]['url']);
			}else if(config_11['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_11['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.12 ======================================*/
$(function(){
	$('#afc-12').find('path').attr({'fill':config_12['default']['landColor']}).css({'stroke':config_12['default']['borderColor']});
	$('#afc-12').find('text').attr({'fill':config_12['default']['shortName']});
	var pins_len = config_12['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c12_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_12['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_12['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_12['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_12['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_12['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c12_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_12['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_12['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_12['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_12['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_12['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c12_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c12DynAddE(i);
			}
			else if(config_12['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_12['pins'][i]['pos_X']- config_12['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_12['pins'][i]['pos_Y']- config_12['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_12['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_12['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_12['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c12_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_12['pins'][i]['pos_X']- config_12['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_12['pins'][i]['pos_Y']- config_12['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_12['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_12['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_12['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_12['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c12_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c12DynAddE(i);
			}
		}
	}
});

function c12DynAddE(id){
	var obj = $('#c12_map_pins_'+id);

	if(config_12['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_12['pins'][id]['downColor']});
				$('#map-tip').show().html(config_12['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_12['pins'][id]['upColor']});
				if(config_12['pins'][id]['target'] == 'new_window'){
					window.open(config_12['pins'][id]['url']);
				}else if(config_12['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_12['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_12['pins'][id]['hover']);
			obj.css({'fill':config_12['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_12['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_12['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_12['pins'][id]['overColor']});
			if(config_12['pins'][id]['target'] == 'new_window'){
				window.open(config_12['pins'][id]['url']);
			}else if(config_12['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_12['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.13 ======================================*/
$(function(){
	$('#afc-13').find('path').attr({'fill':config_13['default']['landColor']}).css({'stroke':config_13['default']['borderColor']});
	$('#afc-13').find('text').attr({'fill':config_13['default']['shortName']});
	var pins_len = config_13['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c13_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_13['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_13['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_13['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_13['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_13['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c13_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_13['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_13['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_13['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_13['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_13['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c13_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c13DynAddE(i);
			}
			else if(config_13['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_13['pins'][i]['pos_X']- config_13['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_13['pins'][i]['pos_Y']- config_13['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_13['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_13['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_13['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c13_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_13['pins'][i]['pos_X']- config_13['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_13['pins'][i]['pos_Y']- config_13['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_13['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_13['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_13['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_13['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c13_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c13DynAddE(i);
			}
		}
	}
});

function c13DynAddE(id){
	var obj = $('#c13_map_pins_'+id);

	if(config_13['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_13['pins'][id]['downColor']});
				$('#map-tip').show().html(config_13['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_13['pins'][id]['upColor']});
				if(config_13['pins'][id]['target'] == 'new_window'){
					window.open(config_13['pins'][id]['url']);
				}else if(config_13['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_13['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_13['pins'][id]['hover']);
			obj.css({'fill':config_13['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_13['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_13['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_13['pins'][id]['overColor']});
			if(config_13['pins'][id]['target'] == 'new_window'){
				window.open(config_13['pins'][id]['url']);
			}else if(config_13['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_13['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.14 ======================================*/
$(function(){
	$('#afc-14').find('path').attr({'fill':config_14['default']['landColor']}).css({'stroke':config_14['default']['borderColor']});
	$('#afc-14').find('text').attr({'fill':config_14['default']['shortName']});
	var pins_len = config_14['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c14_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_14['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_14['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_14['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_14['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_14['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c14_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_14['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_14['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_14['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_14['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_14['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c14_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c14DynAddE(i);
			}
			else if(config_14['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_14['pins'][i]['pos_X']- config_14['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_14['pins'][i]['pos_Y']- config_14['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_14['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_14['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_14['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c14_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_14['pins'][i]['pos_X']- config_14['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_14['pins'][i]['pos_Y']- config_14['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_14['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_14['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_14['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_14['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c14_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c14DynAddE(i);
			}
		}
	}
});

function c14DynAddE(id){
	var obj = $('#c14_map_pins_'+id);

	if(config_14['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_14['pins'][id]['downColor']});
				$('#map-tip').show().html(config_14['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_14['pins'][id]['upColor']});
				if(config_14['pins'][id]['target'] == 'new_window'){
					window.open(config_14['pins'][id]['url']);
				}else if(config_14['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_14['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_14['pins'][id]['hover']);
			obj.css({'fill':config_14['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_14['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_14['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_14['pins'][id]['overColor']});
			if(config_14['pins'][id]['target'] == 'new_window'){
				window.open(config_14['pins'][id]['url']);
			}else if(config_14['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_14['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.15 ======================================*/
$(function(){
	$('#afc-15').find('path').attr({'fill':config_15['default']['landColor']}).css({'stroke':config_15['default']['borderColor']});
	$('#afc-15').find('text').attr({'fill':config_15['default']['shortName']});
	var pins_len = config_15['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c15_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_15['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_15['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_15['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_15['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_15['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c15_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_15['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_15['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_15['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_15['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_15['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c15_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c15DynAddE(i);
			}
			else if(config_15['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_15['pins'][i]['pos_X']- config_15['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_15['pins'][i]['pos_Y']- config_15['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_15['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_15['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_15['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c15_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_15['pins'][i]['pos_X']- config_15['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_15['pins'][i]['pos_Y']- config_15['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_15['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_15['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_15['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_15['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c15_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c15DynAddE(i);
			}
		}
	}
});

function c15DynAddE(id){
	var obj = $('#c15_map_pins_'+id);

	if(config_15['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_15['pins'][id]['downColor']});
				$('#map-tip').show().html(config_15['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_15['pins'][id]['upColor']});
				if(config_15['pins'][id]['target'] == 'new_window'){
					window.open(config_15['pins'][id]['url']);
				}else if(config_15['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_15['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_15['pins'][id]['hover']);
			obj.css({'fill':config_15['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_15['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_15['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_15['pins'][id]['overColor']});
			if(config_15['pins'][id]['target'] == 'new_window'){
				window.open(config_15['pins'][id]['url']);
			}else if(config_15['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_15['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.16 ======================================*/
$(function(){
	$('#afc-16').find('path').attr({'fill':config_16['default']['landColor']}).css({'stroke':config_16['default']['borderColor']});
	$('#afc-16').find('text').attr({'fill':config_16['default']['shortName']});
	var pins_len = config_16['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c16_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_16['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_16['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_16['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_16['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_16['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c16_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_16['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_16['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_16['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_16['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_16['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c16_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c16DynAddE(i);
			}
			else if(config_16['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_16['pins'][i]['pos_X']- config_16['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_16['pins'][i]['pos_Y']- config_16['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_16['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_16['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_16['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c16_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_16['pins'][i]['pos_X']- config_16['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_16['pins'][i]['pos_Y']- config_16['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_16['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_16['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_16['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_16['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c16_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c16DynAddE(i);
			}
		}
	}
});

function c16DynAddE(id){
	var obj = $('#c16_map_pins_'+id);

	if(config_16['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_16['pins'][id]['downColor']});
				$('#map-tip').show().html(config_16['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_16['pins'][id]['upColor']});
				if(config_16['pins'][id]['target'] == 'new_window'){
					window.open(config_16['pins'][id]['url']);
				}else if(config_16['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_16['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_16['pins'][id]['hover']);
			obj.css({'fill':config_16['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_16['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_16['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_16['pins'][id]['overColor']});
			if(config_16['pins'][id]['target'] == 'new_window'){
				window.open(config_16['pins'][id]['url']);
			}else if(config_16['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_16['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.17 ======================================*/
$(function(){
	$('#afc-17').find('path').attr({'fill':config_17['default']['landColor']}).css({'stroke':config_17['default']['borderColor']});
	$('#afc-17').find('text').attr({'fill':config_17['default']['shortName']});
	var pins_len = config_17['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c17_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_17['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_17['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_17['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_17['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_17['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c17_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_17['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_17['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_17['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_17['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_17['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c17_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c17DynAddE(i);
			}
			else if(config_17['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_17['pins'][i]['pos_X']- config_17['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_17['pins'][i]['pos_Y']- config_17['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_17['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_17['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_17['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c17_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_17['pins'][i]['pos_X']- config_17['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_17['pins'][i]['pos_Y']- config_17['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_17['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_17['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_17['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_17['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c17_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c17DynAddE(i);
			}
		}
	}
});

function c17DynAddE(id){
	var obj = $('#c17_map_pins_'+id);

	if(config_17['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_17['pins'][id]['downColor']});
				$('#map-tip').show().html(config_17['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_17['pins'][id]['upColor']});
				if(config_17['pins'][id]['target'] == 'new_window'){
					window.open(config_17['pins'][id]['url']);
				}else if(config_17['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_17['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_17['pins'][id]['hover']);
			obj.css({'fill':config_17['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_17['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_17['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_17['pins'][id]['overColor']});
			if(config_17['pins'][id]['target'] == 'new_window'){
				window.open(config_17['pins'][id]['url']);
			}else if(config_17['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_17['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.18 ======================================*/
$(function(){
	$('#afc-18').find('path').attr({'fill':config_18['default']['landColor']}).css({'stroke':config_18['default']['borderColor']});
	$('#afc-18').find('text').attr({'fill':config_18['default']['shortName']});
	var pins_len = config_18['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c18_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_18['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_18['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_18['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_18['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_18['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c18_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_18['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_18['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_18['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_18['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_18['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c18_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c18DynAddE(i);
			}
			else if(config_18['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_18['pins'][i]['pos_X']- config_18['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_18['pins'][i]['pos_Y']- config_18['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_18['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_18['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_18['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c18_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_18['pins'][i]['pos_X']- config_18['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_18['pins'][i]['pos_Y']- config_18['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_18['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_18['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_18['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_18['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c18_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c18DynAddE(i);
			}
		}
	}
});

function c18DynAddE(id){
	var obj = $('#c18_map_pins_'+id);

	if(config_18['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_18['pins'][id]['downColor']});
				$('#map-tip').show().html(config_18['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_18['pins'][id]['upColor']});
				if(config_18['pins'][id]['target'] == 'new_window'){
					window.open(config_18['pins'][id]['url']);
				}else if(config_18['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_18['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_18['pins'][id]['hover']);
			obj.css({'fill':config_18['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_18['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_18['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_18['pins'][id]['overColor']});
			if(config_18['pins'][id]['target'] == 'new_window'){
				window.open(config_18['pins'][id]['url']);
			}else if(config_18['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_18['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.19 ======================================*/
$(function(){
	$('#afc-19').find('path').attr({'fill':config_19['default']['landColor']}).css({'stroke':config_19['default']['borderColor']});
	$('#afc-19').find('text').attr({'fill':config_19['default']['shortName']});
	var pins_len = config_19['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c19_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_19['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_19['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_19['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_19['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_19['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c19_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_19['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_19['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_19['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_19['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_19['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c19_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c19DynAddE(i);
			}
			else if(config_19['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_19['pins'][i]['pos_X']- config_19['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_19['pins'][i]['pos_Y']- config_19['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_19['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_19['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_19['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c19_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_19['pins'][i]['pos_X']- config_19['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_19['pins'][i]['pos_Y']- config_19['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_19['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_19['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_19['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_19['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c19_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c19DynAddE(i);
			}
		}
	}
});

function c19DynAddE(id){
	var obj = $('#c19_map_pins_'+id);

	if(config_19['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_19['pins'][id]['downColor']});
				$('#map-tip').show().html(config_19['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_19['pins'][id]['upColor']});
				if(config_19['pins'][id]['target'] == 'new_window'){
					window.open(config_19['pins'][id]['url']);
				}else if(config_19['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_19['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_19['pins'][id]['hover']);
			obj.css({'fill':config_19['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_19['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_19['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_19['pins'][id]['overColor']});
			if(config_19['pins'][id]['target'] == 'new_window'){
				window.open(config_19['pins'][id]['url']);
			}else if(config_19['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_19['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.20 ======================================*/
$(function(){
	$('#afc-20').find('path').attr({'fill':config_20['default']['landColor']}).css({'stroke':config_20['default']['borderColor']});
	$('#afc-20').find('text').attr({'fill':config_20['default']['shortName']});
	var pins_len = config_20['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c20_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_20['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_20['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_20['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_20['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_20['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c20_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_20['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_20['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_20['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_20['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_20['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c20_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c20DynAddE(i);
			}
			else if(config_20['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_20['pins'][i]['pos_X']- config_20['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_20['pins'][i]['pos_Y']- config_20['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_20['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_20['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_20['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c20_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_20['pins'][i]['pos_X']- config_20['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_20['pins'][i]['pos_Y']- config_20['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_20['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_20['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_20['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_20['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c20_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c20DynAddE(i);
			}
		}
	}
});

function c20DynAddE(id){
	var obj = $('#c20_map_pins_'+id);

	if(config_20['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_20['pins'][id]['downColor']});
				$('#map-tip').show().html(config_20['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_20['pins'][id]['upColor']});
				if(config_20['pins'][id]['target'] == 'new_window'){
					window.open(config_20['pins'][id]['url']);
				}else if(config_20['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_20['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_20['pins'][id]['hover']);
			obj.css({'fill':config_20['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_20['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_20['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_20['pins'][id]['overColor']});
			if(config_20['pins'][id]['target'] == 'new_window'){
				window.open(config_20['pins'][id]['url']);
			}else if(config_20['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_20['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.21 ======================================*/
$(function(){
	$('#afc-21').find('path').attr({'fill':config_21['default']['landColor']}).css({'stroke':config_21['default']['borderColor']});
	$('#afc-21').find('text').attr({'fill':config_21['default']['shortName']});
	var pins_len = config_21['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c21_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_21['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_21['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_21['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_21['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_21['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c21_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_21['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_21['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_21['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_21['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_21['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c21_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c21DynAddE(i);
			}
			else if(config_21['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_21['pins'][i]['pos_X']- config_21['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_21['pins'][i]['pos_Y']- config_21['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_21['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_21['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_21['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c21_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_21['pins'][i]['pos_X']- config_21['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_21['pins'][i]['pos_Y']- config_21['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_21['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_21['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_21['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_21['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c21_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c21DynAddE(i);
			}
		}
	}
});

function c21DynAddE(id){
	var obj = $('#c21_map_pins_'+id);

	if(config_21['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_21['pins'][id]['downColor']});
				$('#map-tip').show().html(config_21['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_21['pins'][id]['upColor']});
				if(config_21['pins'][id]['target'] == 'new_window'){
					window.open(config_21['pins'][id]['url']);
				}else if(config_21['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_21['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_21['pins'][id]['hover']);
			obj.css({'fill':config_21['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_21['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_21['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_21['pins'][id]['overColor']});
			if(config_21['pins'][id]['target'] == 'new_window'){
				window.open(config_21['pins'][id]['url']);
			}else if(config_21['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_21['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.22 ======================================*/
$(function(){
	$('#afc-22').find('path').attr({'fill':config_22['default']['landColor']}).css({'stroke':config_22['default']['borderColor']});
	$('#afc-22').find('text').attr({'fill':config_22['default']['shortName']});
	var pins_len = config_22['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c22_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_22['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_22['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_22['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_22['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_22['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c22_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_22['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_22['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_22['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_22['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_22['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c22_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c22DynAddE(i);
			}
			else if(config_22['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_22['pins'][i]['pos_X']- config_22['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_22['pins'][i]['pos_Y']- config_22['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_22['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_22['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_22['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c22_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_22['pins'][i]['pos_X']- config_22['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_22['pins'][i]['pos_Y']- config_22['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_22['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_22['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_22['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_22['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c22_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c22DynAddE(i);
			}
		}
	}
});

function c22DynAddE(id){
	var obj = $('#c22_map_pins_'+id);

	if(config_22['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_22['pins'][id]['downColor']});
				$('#map-tip').show().html(config_22['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_22['pins'][id]['upColor']});
				if(config_22['pins'][id]['target'] == 'new_window'){
					window.open(config_22['pins'][id]['url']);
				}else if(config_22['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_22['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_22['pins'][id]['hover']);
			obj.css({'fill':config_22['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_22['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_22['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_22['pins'][id]['overColor']});
			if(config_22['pins'][id]['target'] == 'new_window'){
				window.open(config_22['pins'][id]['url']);
			}else if(config_22['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_22['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.23 ======================================*/
$(function(){
	$('#afc-23').find('path').attr({'fill':config_23['default']['landColor']}).css({'stroke':config_23['default']['borderColor']});
	$('#afc-23').find('text').attr({'fill':config_23['default']['shortName']});
	var pins_len = config_23['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c23_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_23['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_23['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_23['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_23['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_23['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c23_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_23['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_23['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_23['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_23['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_23['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c23_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c23DynAddE(i);
			}
			else if(config_23['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_23['pins'][i]['pos_X']- config_23['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_23['pins'][i]['pos_Y']- config_23['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_23['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_23['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_23['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c23_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_23['pins'][i]['pos_X']- config_23['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_23['pins'][i]['pos_Y']- config_23['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_23['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_23['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_23['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_23['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c23_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c23DynAddE(i);
			}
		}
	}
});

function c23DynAddE(id){
	var obj = $('#c23_map_pins_'+id);

	if(config_23['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_23['pins'][id]['downColor']});
				$('#map-tip').show().html(config_23['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_23['pins'][id]['upColor']});
				if(config_23['pins'][id]['target'] == 'new_window'){
					window.open(config_23['pins'][id]['url']);
				}else if(config_23['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_23['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_23['pins'][id]['hover']);
			obj.css({'fill':config_23['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_23['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_23['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_23['pins'][id]['overColor']});
			if(config_23['pins'][id]['target'] == 'new_window'){
				window.open(config_23['pins'][id]['url']);
			}else if(config_23['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_23['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.24 ======================================*/
$(function(){
	$('#afc-24').find('path').attr({'fill':config_24['default']['landColor']}).css({'stroke':config_24['default']['borderColor']});
	$('#afc-24').find('text').attr({'fill':config_24['default']['shortName']});
	var pins_len = config_24['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c24_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_24['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_24['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_24['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_24['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_24['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c24_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_24['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_24['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_24['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_24['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_24['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c24_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c24DynAddE(i);
			}
			else if(config_24['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_24['pins'][i]['pos_X']- config_24['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_24['pins'][i]['pos_Y']- config_24['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_24['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_24['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_24['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c24_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_24['pins'][i]['pos_X']- config_24['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_24['pins'][i]['pos_Y']- config_24['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_24['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_24['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_24['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_24['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c24_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c24DynAddE(i);
			}
		}
	}
});

function c24DynAddE(id){
	var obj = $('#c24_map_pins_'+id);

	if(config_24['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_24['pins'][id]['downColor']});
				$('#map-tip').show().html(config_24['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_24['pins'][id]['upColor']});
				if(config_24['pins'][id]['target'] == 'new_window'){
					window.open(config_24['pins'][id]['url']);
				}else if(config_24['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_24['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_24['pins'][id]['hover']);
			obj.css({'fill':config_24['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_24['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_24['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_24['pins'][id]['overColor']});
			if(config_24['pins'][id]['target'] == 'new_window'){
				window.open(config_24['pins'][id]['url']);
			}else if(config_24['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_24['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.25 ======================================*/
$(function(){
	$('#afc-25').find('path').attr({'fill':config_25['default']['landColor']}).css({'stroke':config_25['default']['borderColor']});
	$('#afc-25').find('text').attr({'fill':config_25['default']['shortName']});
	var pins_len = config_25['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c25_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_25['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_25['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_25['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_25['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_25['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c25_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_25['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_25['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_25['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_25['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_25['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c25_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c25DynAddE(i);
			}
			else if(config_25['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_25['pins'][i]['pos_X']- config_25['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_25['pins'][i]['pos_Y']- config_25['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_25['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_25['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_25['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c25_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_25['pins'][i]['pos_X']- config_25['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_25['pins'][i]['pos_Y']- config_25['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_25['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_25['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_25['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_25['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c25_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c25DynAddE(i);
			}
		}
	}
});

function c25DynAddE(id){
	var obj = $('#c25_map_pins_'+id);

	if(config_25['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_25['pins'][id]['downColor']});
				$('#map-tip').show().html(config_25['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_25['pins'][id]['upColor']});
				if(config_25['pins'][id]['target'] == 'new_window'){
					window.open(config_25['pins'][id]['url']);
				}else if(config_25['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_25['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_25['pins'][id]['hover']);
			obj.css({'fill':config_25['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_25['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_25['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_25['pins'][id]['overColor']});
			if(config_25['pins'][id]['target'] == 'new_window'){
				window.open(config_25['pins'][id]['url']);
			}else if(config_25['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_25['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.26 ======================================*/
$(function(){
	$('#afc-26').find('path').attr({'fill':config_26['default']['landColor']}).css({'stroke':config_26['default']['borderColor']});
	$('#afc-26').find('text').attr({'fill':config_26['default']['shortName']});
	var pins_len = config_26['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c26_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_26['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_26['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_26['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_26['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_26['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c26_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_26['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_26['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_26['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_26['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_26['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c26_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c26DynAddE(i);
			}
			else if(config_26['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_26['pins'][i]['pos_X']- config_26['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_26['pins'][i]['pos_Y']- config_26['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_26['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_26['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_26['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c26_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_26['pins'][i]['pos_X']- config_26['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_26['pins'][i]['pos_Y']- config_26['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_26['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_26['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_26['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_26['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c26_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c26DynAddE(i);
			}
		}
	}
});

function c26DynAddE(id){
	var obj = $('#c26_map_pins_'+id);

	if(config_26['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_26['pins'][id]['downColor']});
				$('#map-tip').show().html(config_26['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_26['pins'][id]['upColor']});
				if(config_26['pins'][id]['target'] == 'new_window'){
					window.open(config_26['pins'][id]['url']);
				}else if(config_26['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_26['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_26['pins'][id]['hover']);
			obj.css({'fill':config_26['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_26['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_26['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_26['pins'][id]['overColor']});
			if(config_26['pins'][id]['target'] == 'new_window'){
				window.open(config_26['pins'][id]['url']);
			}else if(config_26['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_26['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.27 ======================================*/
$(function(){
	$('#afc-27').find('path').attr({'fill':config_27['default']['landColor']}).css({'stroke':config_27['default']['borderColor']});
	$('#afc-27').find('text').attr({'fill':config_27['default']['shortName']});
	var pins_len = config_27['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c27_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_27['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_27['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_27['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_27['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_27['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c27_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_27['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_27['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_27['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_27['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_27['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c27_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c27DynAddE(i);
			}
			else if(config_27['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_27['pins'][i]['pos_X']- config_27['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_27['pins'][i]['pos_Y']- config_27['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_27['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_27['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_27['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c27_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_27['pins'][i]['pos_X']- config_27['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_27['pins'][i]['pos_Y']- config_27['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_27['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_27['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_27['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_27['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c27_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c27DynAddE(i);
			}
		}
	}
});

function c27DynAddE(id){
	var obj = $('#c27_map_pins_'+id);

	if(config_27['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_27['pins'][id]['downColor']});
				$('#map-tip').show().html(config_27['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_27['pins'][id]['upColor']});
				if(config_27['pins'][id]['target'] == 'new_window'){
					window.open(config_27['pins'][id]['url']);
				}else if(config_27['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_27['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_27['pins'][id]['hover']);
			obj.css({'fill':config_27['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_27['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_27['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_27['pins'][id]['overColor']});
			if(config_27['pins'][id]['target'] == 'new_window'){
				window.open(config_27['pins'][id]['url']);
			}else if(config_27['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_27['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.28 ======================================*/
$(function(){
	$('#afc-28').find('path').attr({'fill':config_28['default']['landColor']}).css({'stroke':config_28['default']['borderColor']});
	$('#afc-28').find('text').attr({'fill':config_28['default']['shortName']});
	var pins_len = config_28['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c28_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_28['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_28['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_28['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_28['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_28['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c28_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_28['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_28['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_28['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_28['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_28['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c28_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c28DynAddE(i);
			}
			else if(config_28['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_28['pins'][i]['pos_X']- config_28['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_28['pins'][i]['pos_Y']- config_28['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_28['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_28['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_28['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c28_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_28['pins'][i]['pos_X']- config_28['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_28['pins'][i]['pos_Y']- config_28['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_28['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_28['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_28['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_28['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c28_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c28DynAddE(i);
			}
		}
	}
});

function c28DynAddE(id){
	var obj = $('#c28_map_pins_'+id);

	if(config_28['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_28['pins'][id]['downColor']});
				$('#map-tip').show().html(config_28['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_28['pins'][id]['upColor']});
				if(config_28['pins'][id]['target'] == 'new_window'){
					window.open(config_28['pins'][id]['url']);
				}else if(config_28['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_28['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_28['pins'][id]['hover']);
			obj.css({'fill':config_28['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_28['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_28['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_28['pins'][id]['overColor']});
			if(config_28['pins'][id]['target'] == 'new_window'){
				window.open(config_28['pins'][id]['url']);
			}else if(config_28['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_28['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.29 ======================================*/
$(function(){
	$('#afc-29').find('path').attr({'fill':config_29['default']['landColor']}).css({'stroke':config_29['default']['borderColor']});
	$('#afc-29').find('text').attr({'fill':config_29['default']['shortName']});
	var pins_len = config_29['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c29_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_29['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_29['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_29['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_29['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_29['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c29_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_29['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_29['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_29['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_29['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_29['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c29_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c29DynAddE(i);
			}
			else if(config_29['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_29['pins'][i]['pos_X']- config_29['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_29['pins'][i]['pos_Y']- config_29['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_29['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_29['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_29['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c29_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_29['pins'][i]['pos_X']- config_29['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_29['pins'][i]['pos_Y']- config_29['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_29['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_29['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_29['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_29['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c29_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c29DynAddE(i);
			}
		}
	}
});

function c29DynAddE(id){
	var obj = $('#c29_map_pins_'+id);

	if(config_29['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_29['pins'][id]['downColor']});
				$('#map-tip').show().html(config_29['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_29['pins'][id]['upColor']});
				if(config_29['pins'][id]['target'] == 'new_window'){
					window.open(config_29['pins'][id]['url']);
				}else if(config_29['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_29['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_29['pins'][id]['hover']);
			obj.css({'fill':config_29['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_29['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_29['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_29['pins'][id]['overColor']});
			if(config_29['pins'][id]['target'] == 'new_window'){
				window.open(config_29['pins'][id]['url']);
			}else if(config_29['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_29['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.30 ======================================*/
$(function(){
	$('#afc-30').find('path').attr({'fill':config_30['default']['landColor']}).css({'stroke':config_30['default']['borderColor']});
	$('#afc-30').find('text').attr({'fill':config_30['default']['shortName']});
	var pins_len = config_30['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c30_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_30['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_30['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_30['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_30['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_30['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c30_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_30['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_30['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_30['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_30['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_30['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c30_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c30DynAddE(i);
			}
			else if(config_30['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_30['pins'][i]['pos_X']- config_30['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_30['pins'][i]['pos_Y']- config_30['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_30['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_30['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_30['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c30_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_30['pins'][i]['pos_X']- config_30['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_30['pins'][i]['pos_Y']- config_30['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_30['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_30['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_30['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_30['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c30_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c30DynAddE(i);
			}
		}
	}
});

function c30DynAddE(id){
	var obj = $('#c30_map_pins_'+id);

	if(config_30['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_30['pins'][id]['downColor']});
				$('#map-tip').show().html(config_30['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_30['pins'][id]['upColor']});
				if(config_30['pins'][id]['target'] == 'new_window'){
					window.open(config_30['pins'][id]['url']);
				}else if(config_30['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_30['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_30['pins'][id]['hover']);
			obj.css({'fill':config_30['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_30['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_30['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_30['pins'][id]['overColor']});
			if(config_30['pins'][id]['target'] == 'new_window'){
				window.open(config_30['pins'][id]['url']);
			}else if(config_30['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_30['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.31 ======================================*/
$(function(){
	$('#afc-31').find('path').attr({'fill':config_31['default']['landColor']}).css({'stroke':config_31['default']['borderColor']});
	$('#afc-31').find('text').attr({'fill':config_31['default']['shortName']});
	var pins_len = config_31['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c31_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_31['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_31['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_31['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_31['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_31['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c31_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_31['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_31['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_31['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_31['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_31['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c31_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c31DynAddE(i);
			}
			else if(config_31['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_31['pins'][i]['pos_X']- config_31['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_31['pins'][i]['pos_Y']- config_31['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_31['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_31['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_31['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c31_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_31['pins'][i]['pos_X']- config_31['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_31['pins'][i]['pos_Y']- config_31['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_31['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_31['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_31['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_31['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c31_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c31DynAddE(i);
			}
		}
	}
});

function c31DynAddE(id){
	var obj = $('#c31_map_pins_'+id);

	if(config_31['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_31['pins'][id]['downColor']});
				$('#map-tip').show().html(config_31['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_31['pins'][id]['upColor']});
				if(config_31['pins'][id]['target'] == 'new_window'){
					window.open(config_31['pins'][id]['url']);
				}else if(config_31['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_31['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_31['pins'][id]['hover']);
			obj.css({'fill':config_31['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_31['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_31['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_31['pins'][id]['overColor']});
			if(config_31['pins'][id]['target'] == 'new_window'){
				window.open(config_31['pins'][id]['url']);
			}else if(config_31['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_31['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.32 ======================================*/
$(function(){
	$('#afc-32').find('path').attr({'fill':config_32['default']['landColor']}).css({'stroke':config_32['default']['borderColor']});
	$('#afc-32').find('text').attr({'fill':config_32['default']['shortName']});
	var pins_len = config_32['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c32_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_32['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_32['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_32['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_32['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_32['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c32_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_32['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_32['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_32['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_32['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_32['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c32_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c32DynAddE(i);
			}
			else if(config_32['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_32['pins'][i]['pos_X']- config_32['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_32['pins'][i]['pos_Y']- config_32['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_32['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_32['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_32['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c32_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_32['pins'][i]['pos_X']- config_32['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_32['pins'][i]['pos_Y']- config_32['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_32['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_32['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_32['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_32['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c32_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c32DynAddE(i);
			}
		}
	}
});

function c32DynAddE(id){
	var obj = $('#c32_map_pins_'+id);

	if(config_32['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_32['pins'][id]['downColor']});
				$('#map-tip').show().html(config_32['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_32['pins'][id]['upColor']});
				if(config_32['pins'][id]['target'] == 'new_window'){
					window.open(config_32['pins'][id]['url']);
				}else if(config_32['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_32['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_32['pins'][id]['hover']);
			obj.css({'fill':config_32['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_32['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_32['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_32['pins'][id]['overColor']});
			if(config_32['pins'][id]['target'] == 'new_window'){
				window.open(config_32['pins'][id]['url']);
			}else if(config_32['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_32['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.33 ======================================*/
$(function(){
	$('#afc-33').find('path').attr({'fill':config_33['default']['landColor']}).css({'stroke':config_33['default']['borderColor']});
	$('#afc-33').find('text').attr({'fill':config_33['default']['shortName']});
	var pins_len = config_33['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c33_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_33['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_33['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_33['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_33['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_33['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c33_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_33['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_33['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_33['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_33['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_33['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c33_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c33DynAddE(i);
			}
			else if(config_33['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_33['pins'][i]['pos_X']- config_33['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_33['pins'][i]['pos_Y']- config_33['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_33['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_33['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_33['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c33_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_33['pins'][i]['pos_X']- config_33['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_33['pins'][i]['pos_Y']- config_33['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_33['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_33['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_33['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_33['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c33_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c33DynAddE(i);
			}
		}
	}
});

function c33DynAddE(id){
	var obj = $('#c33_map_pins_'+id);

	if(config_33['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_33['pins'][id]['downColor']});
				$('#map-tip').show().html(config_33['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_33['pins'][id]['upColor']});
				if(config_33['pins'][id]['target'] == 'new_window'){
					window.open(config_33['pins'][id]['url']);
				}else if(config_33['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_33['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_33['pins'][id]['hover']);
			obj.css({'fill':config_33['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_33['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_33['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_33['pins'][id]['overColor']});
			if(config_33['pins'][id]['target'] == 'new_window'){
				window.open(config_33['pins'][id]['url']);
			}else if(config_33['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_33['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.34 ======================================*/
$(function(){
	$('#afc-34').find('path').attr({'fill':config_34['default']['landColor']}).css({'stroke':config_34['default']['borderColor']});
	$('#afc-34').find('text').attr({'fill':config_34['default']['shortName']});
	var pins_len = config_34['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c34_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_34['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_34['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_34['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_34['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_34['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c34_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_34['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_34['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_34['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_34['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_34['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c34_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c34DynAddE(i);
			}
			else if(config_34['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_34['pins'][i]['pos_X']- config_34['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_34['pins'][i]['pos_Y']- config_34['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_34['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_34['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_34['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c34_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_34['pins'][i]['pos_X']- config_34['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_34['pins'][i]['pos_Y']- config_34['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_34['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_34['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_34['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_34['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c34_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c34DynAddE(i);
			}
		}
	}
});

function c34DynAddE(id){
	var obj = $('#c34_map_pins_'+id);

	if(config_34['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_34['pins'][id]['downColor']});
				$('#map-tip').show().html(config_34['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_34['pins'][id]['upColor']});
				if(config_34['pins'][id]['target'] == 'new_window'){
					window.open(config_34['pins'][id]['url']);
				}else if(config_34['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_34['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_34['pins'][id]['hover']);
			obj.css({'fill':config_34['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_34['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_34['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_34['pins'][id]['overColor']});
			if(config_34['pins'][id]['target'] == 'new_window'){
				window.open(config_34['pins'][id]['url']);
			}else if(config_34['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_34['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.35 ======================================*/
$(function(){
	$('#afc-35').find('path').attr({'fill':config_35['default']['landColor']}).css({'stroke':config_35['default']['borderColor']});
	$('#afc-35').find('text').attr({'fill':config_35['default']['shortName']});
	var pins_len = config_35['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c35_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_35['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_35['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_35['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_35['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_35['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c35_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_35['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_35['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_35['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_35['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_35['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c35_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c35DynAddE(i);
			}
			else if(config_35['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_35['pins'][i]['pos_X']- config_35['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_35['pins'][i]['pos_Y']- config_35['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_35['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_35['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_35['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c35_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_35['pins'][i]['pos_X']- config_35['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_35['pins'][i]['pos_Y']- config_35['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_35['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_35['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_35['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_35['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c35_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c35DynAddE(i);
			}
		}
	}
});

function c35DynAddE(id){
	var obj = $('#c35_map_pins_'+id);

	if(config_35['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_35['pins'][id]['downColor']});
				$('#map-tip').show().html(config_35['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_35['pins'][id]['upColor']});
				if(config_35['pins'][id]['target'] == 'new_window'){
					window.open(config_35['pins'][id]['url']);
				}else if(config_35['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_35['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_35['pins'][id]['hover']);
			obj.css({'fill':config_35['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_35['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_35['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_35['pins'][id]['overColor']});
			if(config_35['pins'][id]['target'] == 'new_window'){
				window.open(config_35['pins'][id]['url']);
			}else if(config_35['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_35['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.36 ======================================*/
$(function(){
	$('#afc-36').find('path').attr({'fill':config_36['default']['landColor']}).css({'stroke':config_36['default']['borderColor']});
	$('#afc-36').find('text').attr({'fill':config_36['default']['shortName']});
	var pins_len = config_36['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c36_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_36['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_36['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_36['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_36['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_36['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c36_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_36['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_36['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_36['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_36['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_36['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c36_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c36DynAddE(i);
			}
			else if(config_36['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_36['pins'][i]['pos_X']- config_36['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_36['pins'][i]['pos_Y']- config_36['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_36['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_36['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_36['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c36_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_36['pins'][i]['pos_X']- config_36['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_36['pins'][i]['pos_Y']- config_36['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_36['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_36['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_36['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_36['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c36_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c36DynAddE(i);
			}
		}
	}
});

function c36DynAddE(id){
	var obj = $('#c36_map_pins_'+id);

	if(config_36['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_36['pins'][id]['downColor']});
				$('#map-tip').show().html(config_36['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_36['pins'][id]['upColor']});
				if(config_36['pins'][id]['target'] == 'new_window'){
					window.open(config_36['pins'][id]['url']);
				}else if(config_36['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_36['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_36['pins'][id]['hover']);
			obj.css({'fill':config_36['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_36['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_36['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_36['pins'][id]['overColor']});
			if(config_36['pins'][id]['target'] == 'new_window'){
				window.open(config_36['pins'][id]['url']);
			}else if(config_36['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_36['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.37 ======================================*/
$(function(){
	$('#afc-37').find('path').attr({'fill':config_37['default']['landColor']}).css({'stroke':config_37['default']['borderColor']});
	$('#afc-37').find('text').attr({'fill':config_37['default']['shortName']});
	var pins_len = config_37['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c37_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_37['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_37['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_37['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_37['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_37['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c37_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_37['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_37['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_37['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_37['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_37['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c37_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c37DynAddE(i);
			}
			else if(config_37['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_37['pins'][i]['pos_X']- config_37['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_37['pins'][i]['pos_Y']- config_37['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_37['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_37['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_37['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c37_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_37['pins'][i]['pos_X']- config_37['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_37['pins'][i]['pos_Y']- config_37['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_37['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_37['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_37['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_37['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c37_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c37DynAddE(i);
			}
		}
	}
});

function c37DynAddE(id){
	var obj = $('#c37_map_pins_'+id);

	if(config_37['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_37['pins'][id]['downColor']});
				$('#map-tip').show().html(config_37['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_37['pins'][id]['upColor']});
				if(config_37['pins'][id]['target'] == 'new_window'){
					window.open(config_37['pins'][id]['url']);
				}else if(config_37['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_37['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_37['pins'][id]['hover']);
			obj.css({'fill':config_37['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_37['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_37['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_37['pins'][id]['overColor']});
			if(config_37['pins'][id]['target'] == 'new_window'){
				window.open(config_37['pins'][id]['url']);
			}else if(config_37['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_37['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.38 ======================================*/
$(function(){
	$('#afc-38').find('path').attr({'fill':config_38['default']['landColor']}).css({'stroke':config_38['default']['borderColor']});
	$('#afc-38').find('text').attr({'fill':config_38['default']['shortName']});
	var pins_len = config_38['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c38_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_38['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_38['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_38['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_38['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_38['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c38_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_38['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_38['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_38['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_38['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_38['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c38_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c38DynAddE(i);
			}
			else if(config_38['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_38['pins'][i]['pos_X']- config_38['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_38['pins'][i]['pos_Y']- config_38['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_38['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_38['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_38['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c38_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_38['pins'][i]['pos_X']- config_38['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_38['pins'][i]['pos_Y']- config_38['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_38['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_38['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_38['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_38['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c38_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c38DynAddE(i);
			}
		}
	}
});

function c38DynAddE(id){
	var obj = $('#c38_map_pins_'+id);

	if(config_38['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_38['pins'][id]['downColor']});
				$('#map-tip').show().html(config_38['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_38['pins'][id]['upColor']});
				if(config_38['pins'][id]['target'] == 'new_window'){
					window.open(config_38['pins'][id]['url']);
				}else if(config_38['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_38['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_38['pins'][id]['hover']);
			obj.css({'fill':config_38['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_38['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_38['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_38['pins'][id]['overColor']});
			if(config_38['pins'][id]['target'] == 'new_window'){
				window.open(config_38['pins'][id]['url']);
			}else if(config_38['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_38['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.39 ======================================*/
$(function(){
	$('#afc-39').find('path').attr({'fill':config_39['default']['landColor']}).css({'stroke':config_39['default']['borderColor']});
	$('#afc-39').find('text').attr({'fill':config_39['default']['shortName']});
	var pins_len = config_39['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c39_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_39['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_39['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_39['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_39['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_39['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c39_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_39['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_39['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_39['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_39['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_39['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c39_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c39DynAddE(i);
			}
			else if(config_39['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_39['pins'][i]['pos_X']- config_39['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_39['pins'][i]['pos_Y']- config_39['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_39['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_39['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_39['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c39_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_39['pins'][i]['pos_X']- config_39['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_39['pins'][i]['pos_Y']- config_39['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_39['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_39['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_39['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_39['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c39_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c39DynAddE(i);
			}
		}
	}
});

function c39DynAddE(id){
	var obj = $('#c39_map_pins_'+id);

	if(config_39['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_39['pins'][id]['downColor']});
				$('#map-tip').show().html(config_39['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_39['pins'][id]['upColor']});
				if(config_39['pins'][id]['target'] == 'new_window'){
					window.open(config_39['pins'][id]['url']);
				}else if(config_39['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_39['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_39['pins'][id]['hover']);
			obj.css({'fill':config_39['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_39['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_39['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_39['pins'][id]['overColor']});
			if(config_39['pins'][id]['target'] == 'new_window'){
				window.open(config_39['pins'][id]['url']);
			}else if(config_39['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_39['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.40 ======================================*/
$(function(){
	$('#afc-40').find('path').attr({'fill':config_40['default']['landColor']}).css({'stroke':config_40['default']['borderColor']});
	$('#afc-40').find('text').attr({'fill':config_40['default']['shortName']});
	var pins_len = config_40['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c40_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_40['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_40['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_40['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_40['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_40['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c40_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_40['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_40['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_40['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_40['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_40['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c40_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c40DynAddE(i);
			}
			else if(config_40['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_40['pins'][i]['pos_X']- config_40['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_40['pins'][i]['pos_Y']- config_40['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_40['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_40['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_40['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c40_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_40['pins'][i]['pos_X']- config_40['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_40['pins'][i]['pos_Y']- config_40['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_40['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_40['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_40['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_40['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c40_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c40DynAddE(i);
			}
		}
	}
});

function c40DynAddE(id){
	var obj = $('#c40_map_pins_'+id);

	if(config_40['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_40['pins'][id]['downColor']});
				$('#map-tip').show().html(config_40['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_40['pins'][id]['upColor']});
				if(config_40['pins'][id]['target'] == 'new_window'){
					window.open(config_40['pins'][id]['url']);
				}else if(config_40['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_40['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_40['pins'][id]['hover']);
			obj.css({'fill':config_40['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_40['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_40['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_40['pins'][id]['overColor']});
			if(config_40['pins'][id]['target'] == 'new_window'){
				window.open(config_40['pins'][id]['url']);
			}else if(config_40['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_40['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.41 ======================================*/
$(function(){
	$('#afc-41').find('path').attr({'fill':config_41['default']['landColor']}).css({'stroke':config_41['default']['borderColor']});
	$('#afc-41').find('text').attr({'fill':config_41['default']['shortName']});
	var pins_len = config_41['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c41_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_41['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_41['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_41['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_41['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_41['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c41_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_41['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_41['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_41['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_41['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_41['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c41_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c41DynAddE(i);
			}
			else if(config_41['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_41['pins'][i]['pos_X']- config_41['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_41['pins'][i]['pos_Y']- config_41['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_41['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_41['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_41['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c41_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_41['pins'][i]['pos_X']- config_41['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_41['pins'][i]['pos_Y']- config_41['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_41['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_41['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_41['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_41['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c41_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c41DynAddE(i);
			}
		}
	}
});

function c41DynAddE(id){
	var obj = $('#c41_map_pins_'+id);

	if(config_41['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_41['pins'][id]['downColor']});
				$('#map-tip').show().html(config_41['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_41['pins'][id]['upColor']});
				if(config_41['pins'][id]['target'] == 'new_window'){
					window.open(config_41['pins'][id]['url']);
				}else if(config_41['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_41['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_41['pins'][id]['hover']);
			obj.css({'fill':config_41['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_41['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_41['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_41['pins'][id]['overColor']});
			if(config_41['pins'][id]['target'] == 'new_window'){
				window.open(config_41['pins'][id]['url']);
			}else if(config_41['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_41['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.42 ======================================*/
$(function(){
	$('#afc-42').find('path').attr({'fill':config_42['default']['landColor']}).css({'stroke':config_42['default']['borderColor']});
	$('#afc-42').find('text').attr({'fill':config_42['default']['shortName']});
	var pins_len = config_42['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c42_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_42['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_42['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_42['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_42['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_42['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c42_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_42['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_42['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_42['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_42['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_42['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c42_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c42DynAddE(i);
			}
			else if(config_42['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_42['pins'][i]['pos_X']- config_42['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_42['pins'][i]['pos_Y']- config_42['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_42['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_42['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_42['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c42_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_42['pins'][i]['pos_X']- config_42['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_42['pins'][i]['pos_Y']- config_42['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_42['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_42['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_42['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_42['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c42_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c42DynAddE(i);
			}
		}
	}
});

function c42DynAddE(id){
	var obj = $('#c42_map_pins_'+id);

	if(config_42['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_42['pins'][id]['downColor']});
				$('#map-tip').show().html(config_42['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_42['pins'][id]['upColor']});
				if(config_42['pins'][id]['target'] == 'new_window'){
					window.open(config_42['pins'][id]['url']);
				}else if(config_42['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_42['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_42['pins'][id]['hover']);
			obj.css({'fill':config_42['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_42['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_42['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_42['pins'][id]['overColor']});
			if(config_42['pins'][id]['target'] == 'new_window'){
				window.open(config_42['pins'][id]['url']);
			}else if(config_42['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_42['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.43 ======================================*/
$(function(){
	$('#afc-43').find('path').attr({'fill':config_43['default']['landColor']}).css({'stroke':config_43['default']['borderColor']});
	$('#afc-43').find('text').attr({'fill':config_43['default']['shortName']});
	var pins_len = config_43['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c43_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_43['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_43['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_43['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_43['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_43['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c43_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_43['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_43['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_43['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_43['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_43['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c43_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c43DynAddE(i);
			}
			else if(config_43['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_43['pins'][i]['pos_X']- config_43['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_43['pins'][i]['pos_Y']- config_43['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_43['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_43['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_43['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c43_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_43['pins'][i]['pos_X']- config_43['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_43['pins'][i]['pos_Y']- config_43['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_43['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_43['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_43['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_43['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c43_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c43DynAddE(i);
			}
		}
	}
});

function c43DynAddE(id){
	var obj = $('#c43_map_pins_'+id);

	if(config_43['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_43['pins'][id]['downColor']});
				$('#map-tip').show().html(config_43['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_43['pins'][id]['upColor']});
				if(config_43['pins'][id]['target'] == 'new_window'){
					window.open(config_43['pins'][id]['url']);
				}else if(config_43['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_43['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_43['pins'][id]['hover']);
			obj.css({'fill':config_43['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_43['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_43['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_43['pins'][id]['overColor']});
			if(config_43['pins'][id]['target'] == 'new_window'){
				window.open(config_43['pins'][id]['url']);
			}else if(config_43['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_43['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.44 ======================================*/
$(function(){
	$('#afc-44').find('path').attr({'fill':config_44['default']['landColor']}).css({'stroke':config_44['default']['borderColor']});
	$('#afc-44').find('text').attr({'fill':config_44['default']['shortName']});
	var pins_len = config_44['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c44_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_44['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_44['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_44['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_44['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_44['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c44_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_44['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_44['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_44['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_44['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_44['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c44_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c44DynAddE(i);
			}
			else if(config_44['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_44['pins'][i]['pos_X']- config_44['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_44['pins'][i]['pos_Y']- config_44['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_44['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_44['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_44['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c44_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_44['pins'][i]['pos_X']- config_44['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_44['pins'][i]['pos_Y']- config_44['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_44['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_44['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_44['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_44['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c44_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c44DynAddE(i);
			}
		}
	}
});

function c44DynAddE(id){
	var obj = $('#c44_map_pins_'+id);

	if(config_44['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_44['pins'][id]['downColor']});
				$('#map-tip').show().html(config_44['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_44['pins'][id]['upColor']});
				if(config_44['pins'][id]['target'] == 'new_window'){
					window.open(config_44['pins'][id]['url']);
				}else if(config_44['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_44['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_44['pins'][id]['hover']);
			obj.css({'fill':config_44['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_44['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_44['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_44['pins'][id]['overColor']});
			if(config_44['pins'][id]['target'] == 'new_window'){
				window.open(config_44['pins'][id]['url']);
			}else if(config_44['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_44['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.45 ======================================*/
$(function(){
	$('#afc-45').find('path').attr({'fill':config_45['default']['landColor']}).css({'stroke':config_45['default']['borderColor']});
	$('#afc-45').find('text').attr({'fill':config_45['default']['shortName']});
	var pins_len = config_45['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c45_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_45['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_45['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_45['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_45['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_45['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c45_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_45['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_45['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_45['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_45['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_45['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c45_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c45DynAddE(i);
			}
			else if(config_45['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_45['pins'][i]['pos_X']- config_45['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_45['pins'][i]['pos_Y']- config_45['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_45['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_45['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_45['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c45_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_45['pins'][i]['pos_X']- config_45['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_45['pins'][i]['pos_Y']- config_45['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_45['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_45['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_45['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_45['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c45_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c45DynAddE(i);
			}
		}
	}
});

function c45DynAddE(id){
	var obj = $('#c45_map_pins_'+id);

	if(config_45['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_45['pins'][id]['downColor']});
				$('#map-tip').show().html(config_45['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_45['pins'][id]['upColor']});
				if(config_45['pins'][id]['target'] == 'new_window'){
					window.open(config_45['pins'][id]['url']);
				}else if(config_45['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_45['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_45['pins'][id]['hover']);
			obj.css({'fill':config_45['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_45['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_45['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_45['pins'][id]['overColor']});
			if(config_45['pins'][id]['target'] == 'new_window'){
				window.open(config_45['pins'][id]['url']);
			}else if(config_45['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_45['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.46 ======================================*/
$(function(){
	$('#afc-46').find('path').attr({'fill':config_46['default']['landColor']}).css({'stroke':config_46['default']['borderColor']});
	$('#afc-46').find('text').attr({'fill':config_46['default']['shortName']});
	var pins_len = config_46['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c46_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_46['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_46['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_46['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_46['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_46['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c46_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_46['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_46['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_46['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_46['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_46['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c46_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c46DynAddE(i);
			}
			else if(config_46['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_46['pins'][i]['pos_X']- config_46['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_46['pins'][i]['pos_Y']- config_46['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_46['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_46['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_46['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c46_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_46['pins'][i]['pos_X']- config_46['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_46['pins'][i]['pos_Y']- config_46['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_46['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_46['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_46['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_46['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c46_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c46DynAddE(i);
			}
		}
	}
});

function c46DynAddE(id){
	var obj = $('#c46_map_pins_'+id);

	if(config_46['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_46['pins'][id]['downColor']});
				$('#map-tip').show().html(config_46['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_46['pins'][id]['upColor']});
				if(config_46['pins'][id]['target'] == 'new_window'){
					window.open(config_46['pins'][id]['url']);
				}else if(config_46['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_46['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_46['pins'][id]['hover']);
			obj.css({'fill':config_46['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_46['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_46['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_46['pins'][id]['overColor']});
			if(config_46['pins'][id]['target'] == 'new_window'){
				window.open(config_46['pins'][id]['url']);
			}else if(config_46['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_46['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.47 ======================================*/
$(function(){
	$('#afc-47').find('path').attr({'fill':config_47['default']['landColor']}).css({'stroke':config_47['default']['borderColor']});
	$('#afc-47').find('text').attr({'fill':config_47['default']['shortName']});
	var pins_len = config_47['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c47_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_47['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_47['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_47['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_47['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_47['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c47_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_47['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_47['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_47['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_47['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_47['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c47_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c47DynAddE(i);
			}
			else if(config_47['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_47['pins'][i]['pos_X']- config_47['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_47['pins'][i]['pos_Y']- config_47['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_47['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_47['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_47['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c47_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_47['pins'][i]['pos_X']- config_47['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_47['pins'][i]['pos_Y']- config_47['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_47['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_47['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_47['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_47['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c47_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c47DynAddE(i);
			}
		}
	}
});

function c47DynAddE(id){
	var obj = $('#c47_map_pins_'+id);

	if(config_47['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_47['pins'][id]['downColor']});
				$('#map-tip').show().html(config_47['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_47['pins'][id]['upColor']});
				if(config_47['pins'][id]['target'] == 'new_window'){
					window.open(config_47['pins'][id]['url']);
				}else if(config_47['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_47['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_47['pins'][id]['hover']);
			obj.css({'fill':config_47['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_47['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_47['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_47['pins'][id]['overColor']});
			if(config_47['pins'][id]['target'] == 'new_window'){
				window.open(config_47['pins'][id]['url']);
			}else if(config_47['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_47['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.48 ======================================*/
$(function(){
	$('#afc-48').find('path').attr({'fill':config_48['default']['landColor']}).css({'stroke':config_48['default']['borderColor']});
	$('#afc-48').find('text').attr({'fill':config_48['default']['shortName']});
	var pins_len = config_48['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c48_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_48['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_48['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_48['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_48['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_48['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c48_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_48['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_48['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_48['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_48['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_48['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c48_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c48DynAddE(i);
			}
			else if(config_48['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_48['pins'][i]['pos_X']- config_48['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_48['pins'][i]['pos_Y']- config_48['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_48['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_48['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_48['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c48_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_48['pins'][i]['pos_X']- config_48['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_48['pins'][i]['pos_Y']- config_48['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_48['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_48['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_48['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_48['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c48_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c48DynAddE(i);
			}
		}
	}
});

function c48DynAddE(id){
	var obj = $('#c48_map_pins_'+id);

	if(config_48['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_48['pins'][id]['downColor']});
				$('#map-tip').show().html(config_48['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_48['pins'][id]['upColor']});
				if(config_48['pins'][id]['target'] == 'new_window'){
					window.open(config_48['pins'][id]['url']);
				}else if(config_48['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_48['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_48['pins'][id]['hover']);
			obj.css({'fill':config_48['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_48['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_48['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_48['pins'][id]['overColor']});
			if(config_48['pins'][id]['target'] == 'new_window'){
				window.open(config_48['pins'][id]['url']);
			}else if(config_48['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_48['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.49 ======================================*/
$(function(){
	$('#afc-49').find('path').attr({'fill':config_49['default']['landColor']}).css({'stroke':config_49['default']['borderColor']});
	$('#afc-49').find('text').attr({'fill':config_49['default']['shortName']});
	var pins_len = config_49['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c49_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_49['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_49['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_49['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_49['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_49['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c49_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_49['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_49['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_49['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_49['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_49['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c49_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c49DynAddE(i);
			}
			else if(config_49['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_49['pins'][i]['pos_X']- config_49['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_49['pins'][i]['pos_Y']- config_49['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_49['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_49['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_49['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c49_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_49['pins'][i]['pos_X']- config_49['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_49['pins'][i]['pos_Y']- config_49['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_49['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_49['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_49['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_49['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c49_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c49DynAddE(i);
			}
		}
	}
});

function c49DynAddE(id){
	var obj = $('#c49_map_pins_'+id);

	if(config_49['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_49['pins'][id]['downColor']});
				$('#map-tip').show().html(config_49['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_49['pins'][id]['upColor']});
				if(config_49['pins'][id]['target'] == 'new_window'){
					window.open(config_49['pins'][id]['url']);
				}else if(config_49['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_49['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_49['pins'][id]['hover']);
			obj.css({'fill':config_49['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_49['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_49['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_49['pins'][id]['overColor']});
			if(config_49['pins'][id]['target'] == 'new_window'){
				window.open(config_49['pins'][id]['url']);
			}else if(config_49['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_49['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.50 ======================================*/
$(function(){
	$('#afc-50').find('path').attr({'fill':config_50['default']['landColor']}).css({'stroke':config_50['default']['borderColor']});
	$('#afc-50').find('text').attr({'fill':config_50['default']['shortName']});
	var pins_len = config_50['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c50_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_50['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_50['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_50['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_50['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_50['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c50_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_50['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_50['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_50['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_50['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_50['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c50_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c50DynAddE(i);
			}
			else if(config_50['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_50['pins'][i]['pos_X']- config_50['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_50['pins'][i]['pos_Y']- config_50['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_50['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_50['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_50['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c50_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_50['pins'][i]['pos_X']- config_50['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_50['pins'][i]['pos_Y']- config_50['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_50['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_50['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_50['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_50['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c50_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c50DynAddE(i);
			}
		}
	}
});

function c50DynAddE(id){
	var obj = $('#c50_map_pins_'+id);

	if(config_50['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_50['pins'][id]['downColor']});
				$('#map-tip').show().html(config_50['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_50['pins'][id]['upColor']});
				if(config_50['pins'][id]['target'] == 'new_window'){
					window.open(config_50['pins'][id]['url']);
				}else if(config_50['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_50['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_50['pins'][id]['hover']);
			obj.css({'fill':config_50['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_50['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_50['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_50['pins'][id]['overColor']});
			if(config_50['pins'][id]['target'] == 'new_window'){
				window.open(config_50['pins'][id]['url']);
			}else if(config_50['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_50['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.51 ======================================*/
$(function(){
	$('#afc-51').find('path').attr({'fill':config_51['default']['landColor']}).css({'stroke':config_51['default']['borderColor']});
	$('#afc-51').find('text').attr({'fill':config_51['default']['shortName']});
	var pins_len = config_51['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c51_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_51['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_51['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_51['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_51['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_51['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c51_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_51['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_51['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_51['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_51['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_51['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c51_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c51DynAddE(i);
			}
			else if(config_51['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_51['pins'][i]['pos_X']- config_51['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_51['pins'][i]['pos_Y']- config_51['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_51['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_51['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_51['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c51_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_51['pins'][i]['pos_X']- config_51['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_51['pins'][i]['pos_Y']- config_51['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_51['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_51['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_51['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_51['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c51_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c51DynAddE(i);
			}
		}
	}
});

function c51DynAddE(id){
	var obj = $('#c51_map_pins_'+id);

	if(config_51['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_51['pins'][id]['downColor']});
				$('#map-tip').show().html(config_51['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_51['pins'][id]['upColor']});
				if(config_51['pins'][id]['target'] == 'new_window'){
					window.open(config_51['pins'][id]['url']);
				}else if(config_51['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_51['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_51['pins'][id]['hover']);
			obj.css({'fill':config_51['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_51['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_51['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_51['pins'][id]['overColor']});
			if(config_51['pins'][id]['target'] == 'new_window'){
				window.open(config_51['pins'][id]['url']);
			}else if(config_51['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_51['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.52 ======================================*/
$(function(){
	$('#afc-52').find('path').attr({'fill':config_52['default']['landColor']}).css({'stroke':config_52['default']['borderColor']});
	$('#afc-52').find('text').attr({'fill':config_52['default']['shortName']});
	var pins_len = config_52['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c52_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_52['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_52['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_52['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_52['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_52['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c52_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_52['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_52['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_52['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_52['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_52['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c52_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c52DynAddE(i);
			}
			else if(config_52['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_52['pins'][i]['pos_X']- config_52['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_52['pins'][i]['pos_Y']- config_52['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_52['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_52['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_52['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c52_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_52['pins'][i]['pos_X']- config_52['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_52['pins'][i]['pos_Y']- config_52['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_52['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_52['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_52['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_52['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c52_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c52DynAddE(i);
			}
		}
	}
});

function c52DynAddE(id){
	var obj = $('#c52_map_pins_'+id);

	if(config_52['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_52['pins'][id]['downColor']});
				$('#map-tip').show().html(config_52['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_52['pins'][id]['upColor']});
				if(config_52['pins'][id]['target'] == 'new_window'){
					window.open(config_52['pins'][id]['url']);
				}else if(config_52['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_52['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_52['pins'][id]['hover']);
			obj.css({'fill':config_52['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_52['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_52['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_52['pins'][id]['overColor']});
			if(config_52['pins'][id]['target'] == 'new_window'){
				window.open(config_52['pins'][id]['url']);
			}else if(config_52['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_52['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.53 ======================================*/
$(function(){
	$('#afc-53').find('path').attr({'fill':config_53['default']['landColor']}).css({'stroke':config_53['default']['borderColor']});
	$('#afc-53').find('text').attr({'fill':config_53['default']['shortName']});
	var pins_len = config_53['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c53_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_53['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_53['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_53['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_53['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_53['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c53_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_53['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_53['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_53['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_53['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_53['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c53_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c53DynAddE(i);
			}
			else if(config_53['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_53['pins'][i]['pos_X']- config_53['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_53['pins'][i]['pos_Y']- config_53['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_53['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_53['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_53['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c53_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_53['pins'][i]['pos_X']- config_53['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_53['pins'][i]['pos_Y']- config_53['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_53['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_53['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_53['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_53['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c53_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c53DynAddE(i);
			}
		}
	}
});

function c53DynAddE(id){
	var obj = $('#c53_map_pins_'+id);

	if(config_53['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_53['pins'][id]['downColor']});
				$('#map-tip').show().html(config_53['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_53['pins'][id]['upColor']});
				if(config_53['pins'][id]['target'] == 'new_window'){
					window.open(config_53['pins'][id]['url']);
				}else if(config_53['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_53['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_53['pins'][id]['hover']);
			obj.css({'fill':config_53['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_53['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_53['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_53['pins'][id]['overColor']});
			if(config_53['pins'][id]['target'] == 'new_window'){
				window.open(config_53['pins'][id]['url']);
			}else if(config_53['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_53['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.54 ======================================*/
$(function(){
	$('#afc-54').find('path').attr({'fill':config_54['default']['landColor']}).css({'stroke':config_54['default']['borderColor']});
	$('#afc-54').find('text').attr({'fill':config_54['default']['shortName']});
	var pins_len = config_54['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c54_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_54['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_54['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_54['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_54['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_54['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c54_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_54['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_54['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_54['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_54['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_54['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c54_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c54DynAddE(i);
			}
			else if(config_54['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_54['pins'][i]['pos_X']- config_54['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_54['pins'][i]['pos_Y']- config_54['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_54['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_54['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_54['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c54_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_54['pins'][i]['pos_X']- config_54['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_54['pins'][i]['pos_Y']- config_54['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_54['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_54['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_54['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_54['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c54_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c54DynAddE(i);
			}
		}
	}
});

function c54DynAddE(id){
	var obj = $('#c54_map_pins_'+id);

	if(config_54['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_54['pins'][id]['downColor']});
				$('#map-tip').show().html(config_54['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_54['pins'][id]['upColor']});
				if(config_54['pins'][id]['target'] == 'new_window'){
					window.open(config_54['pins'][id]['url']);
				}else if(config_54['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_54['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_54['pins'][id]['hover']);
			obj.css({'fill':config_54['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_54['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_54['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_54['pins'][id]['overColor']});
			if(config_54['pins'][id]['target'] == 'new_window'){
				window.open(config_54['pins'][id]['url']);
			}else if(config_54['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_54['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
};
(function() {


}).call(this);
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 1;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "="; /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s)    { return rstr2hex(rstr_sha1(str2rstr_utf8(s))); }
function b64_sha1(s)    { return rstr2b64(rstr_sha1(str2rstr_utf8(s))); }
function any_sha1(s, e) { return rstr2any(rstr_sha1(str2rstr_utf8(s)), e); }
function hex_hmac_sha1(k, d)
  { return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_sha1(k, d)
  { return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_sha1(k, d, e)
  { return rstr2any(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA1 of a raw string
 */
function rstr_sha1(s)
{
  return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-SHA1 of a key and some data (raw strings)
 */
function rstr_hmac_sha1(key, data)
{
  var bkey = rstr2binb(key);
  if(bkey.length > 16) bkey = binb_sha1(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binb_sha1(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
  return binb2rstr(binb_sha1(opad.concat(hash), 512 + 160));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var remainders = Array();
  var i, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. We stop when the dividend is zero.
   * All remainders are stored for later use.
   */
  while(dividend.length > 0)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[remainders.length] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  /* Append leading zero equivalents */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)))
  for(i = output.length; i < full_length; i++)
    output = encoding[0] + output;

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function binb_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive varant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

var HMACSHA1= function(key, data) {
  return b64_hmac_sha1(key, data);
};
var Twitter = {};

var oauthConsumerKey = 'HYiaQJNWn619S9rjMvjYLYxmK'; // Generated from apps.twitter.com
var oauthConsumerSecret = 'sAaDk1kl2E7Dzq6JJYviInvlzSHRb9fq1xNP13SZQg2FkHzimq'; // Generated from Keys and Access Tokens on apps.twitter.com
var oauthToken = '153498117-DiuiTcdSrdPta1tu2Xsl5xua7HAm8fbkSPjA2ljF'; // Generated from Keys and Access Tokens on apps.twitter.com
var oauthTokenSecret = 'HkbOPWXQQwCO92YtiA0aKfvrGYEyG1AuyOP3StzbNNN2k'; // Generated from Keys and Access Tokens on apps.twitter.com
var oauthSignatureMethod = 'HMAC-SHA1';
var oauthVersion = '1.0';
var baseUrl = 'https://api.twitter.com/1.1/statuses/update.json';

// Post Status Function
Twitter.postStatus = async (status) => {
 let response = await fetch(`https://cors-anywhere.herokuapp.com/${baseUrl}?status=${encodeData(status)}`, {
   method: 'POST',
   headers: {
            Authorization: Twitter.generateAuthorizationHeader(status)
       },
   let jsonResponse = await response.json();
   console.log(jsonResponse);
   return jsonResponse;
 });
 
};
// Helper Functions

Twitter.generateAuthorizationHeader = (status) => {
  var oauthNonce = generateNonce();
  var oauthTimestamp = Math.floor((new Date()).getTime() / 1000);
  var oauthSignature = generatePostSignature(status, baseUrl, oauthNonce, oauthTimestamp);

let authorizationHeader = `Oauth oauth_consumer_key="${encodeData(oauthConsumerKey)}", oauth_nonce="${encodeData(oauthNonce)}", oauth_signature="${encodeData(oauthSignature)}", oauth_signature_method="${encodeData(oauthSignatureMethod)}", oauth_timestamp="${encodeData(oauthTimestamp)}", oauth_token="${encodeData(oauthToken)}", oauth_version="${encodeData(oauthVersion)}"`;

  return authorizationHeader;
};

NONCE_CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B',
  'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3',
  '4', '5', '6', '7', '8', '9'
];

var generateNonce = () => {
  var result = [];
  var chars = NONCE_CHARS;
  var char_pos;
  var nonce_chars_length = chars.length;

  for (var i = 0; i < 32; i++) {
    char_pos = Math.floor(Math.random() * nonce_chars_length);
    result[i] = chars[char_pos];
  }
  return result.join('');
};

var generatePostSignature = (status, url, oauthNonce, oauthTimestamp) => {
  var parameterString = `oauth_consumer_key=${encodeData(oauthConsumerKey)}&oauth_nonce=${encodeData(oauthNonce)}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${encodeData(oauthTimestamp)}&oauth_token=${encodeData(oauthToken)}&oauth_version=1.0&status=${encodeData(status)}`;
  var signatureBase = `POST&${encodeData(url)}&${encodeData(parameterString)}`;
  var signingKey = `${encodeData(oauthConsumerSecret)}&${encodeData(oauthTokenSecret)}`;

  return HMACSHA1(signingKey, signatureBase);
};

var encodeData = (toEncode) => {
  if (toEncode == null || toEncode == "") return "";
  else {
    var result = encodeURIComponent(toEncode);
    // Fix the mismatch between OAuth's  RFC3986's and Javascript's beliefs in what is right and wrong ;)
    return result.replace(/\!/g, "%21")
      .replace(/\'/g, "%27")
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29")
      .replace(/\*/g, "%2A");
  }
};
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//


;
