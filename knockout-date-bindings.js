/*
 * knockout-date-bindings
 * Copyright 2014 Muhammad Safraz Razik
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Muhammad Safraz Razik
 * Project: https://github.com/adrotec/knockout-date-bindings
 */
(function (factory) {
    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), require("moment"));
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "moment"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, moment);
    }
}(function (ko, moment) {
    ko.bindingHandlers.date = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            element.onchange = function() {
                var value = valueAccessor();
                var dateFormat = allBindingsAccessor().dateFormat
                        ? ko.utils.unwrapObservable(allBindingsAccessor().dateFormat) : 'L';
                var d;
                if (element.tagName == 'INPUT') {
                    var type = element.type;
                    if (type == 'date') {
                        dateFormat = 'YYYY-MM-DD';
                    }
                    else if (type == 'time') {
                        dateFormat = 'hh:mm';
                    }
                    else if (type == 'datetime-local') {
                        dateFormat = 'YYYY-MM-DDThh:mm';
                    }
                    else if (type == 'month') {
                        dateFormat = 'YYYY-MM';
                    }
                    d = moment(element.value, dateFormat);
                }
                else {
                    d = moment(element.textContent, dateFormat);
                }
                if (d) {
                    var newD = moment();
                    d.hour(newD.hour());
                    d.minute(newD.minute());
                    d.second(newD.second());
                    if(typeof value === "function"){
                      value(d.toDate());
                    }
                    else if(value instanceof Date){
                      value.setTime(d.toDate().getTime());
                    }
                    else {
                      value = d.toDate();
                    }
                }
                else {
                    if(typeof value === "function"){
                      value(null);
                    }
                    else if(value instanceof Date){
                      value.setTime(0);
                    }
                    else {
                      value = null;
                    }
                }
            };
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = valueAccessor();
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            if (valueUnwrapped) {
              
              function updateTimeValue(){
//                        element.value = moment(valueUnwrapped).format('L');
                var dateFormat = allBindingsAccessor().dateFormat
                        ? ko.utils.unwrapObservable(allBindingsAccessor().dateFormat) : 'L';
                if (element.tagName == 'INPUT') {
                  if(valueUnwrapped instanceof Date && valueUnwrapped.getTime() === 0){
                    element.value = '';
                  }
                  else if (element.type == 'date') {
                        dateFormat = 'YYYY-MM-DD';
                        element.value = moment(valueUnwrapped).format(dateFormat);
                    }
                    else {
                        element.value = moment(valueUnwrapped).format(dateFormat);
                    }
                }
                else {
                    element.textContent = moment(valueUnwrapped).format(dateFormat);
                }
              }
              var setTimeOld = valueUnwrapped.setTime;
              valueUnwrapped.setTime = function(time){
                setTimeOld.apply(valueUnwrapped, arguments);
                updateTimeValue();
              }
              updateTimeValue();
            }
        }
    };
}));
