# Project Status:  🚨 Unmaintained 🚨

This project is no longer maintained. We will not be accepting pull requests, addressing issues, nor making future releases.

knockout-date-bindings
======================

knockout js bindings for javascript date with moment js

## [See it in action](http://codepen.io/mrsafraz/pen/tkCxB)

## Basic Usage

**View Model**

```javascript
viewModel.birthDay = ko.observable(new Date());
```

**View**
```html
<!-- could be bound to HTML5 date types (date, datetime-local, month, week, time) -->
<input type="date" data-bind="date: birthDay">

<!-- could be bound to text elements too. You should pass a parameter for date format -->
<span data-bind="date: birthDay, dateFormat: 'MMMM Do YYYY'"></span>
```
Refer to [momentjs](http://momentjs.com/) to format the date, the way you want
