var EventDispatcher;
(EventDispatcher = function () {
}).prototype = {
    subscribe: function (type, method, scope, context) {
        var listeners, handlers;

        function generateGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        var self = this;
        if (!(listeners = this.listeners)) {
            listeners = this.listeners = {};
        }
        if (!(handlers = listeners[type])) {
            handlers = listeners[type] = [];
        }
        scope = (scope ? scope : window);
        var id = generateGuid();
        handlers.push({
            id: id,
            method: method,
            scope: scope,
            context: (context ? context : scope)
        });
        return function () {
            self.unSubscribe(type, id);
        };
    },
    hasSubscribers: function (type) {
        return this.listeners && this.listeners[type] && this.listeners[type].length > 0;
    },
    unSubscribe: function (type, id) {
        var i = this.listeners[type].length;
        var handler = null;
        while (!handler && i--) {
            if (this.listeners[type][i].id === id) {
                handler = this.listeners[type][i];
            }
        }
        if (!handler) {
            return;
        }
        this.listeners[type].splice(i, 1);
    },
    trigger: function (type, data, context) {
        var listeners = this.listeners, i, n, handler;
        data = data instanceof Array ? data : [data];
        if (!listeners) {
            return;
        }
        ;
        var handlers = listeners[type];
        if (!handlers) {
            return;
        }
        for (i = 0, n = handlers.length; i < n; i++) {
            handler = handlers[i];
            if ((typeof (context) !== "undefined" && context !== handler.context) || !handler) {
                continue;
            }
            if (handler.method.apply(handler.scope, data) === false) {
                return false;
            }
        }
        return true;
    },
    dispose: function () {
        for (var listener in this.listeners) {
            if (this.listeners[listener] && this.listeners[listener] instanceof Array)
                this.listeners[listener].length = 0;
        }
    }
};