'use strict';
const alfy = require('alfy');
const config = require('./config.js');

var remindListName = config.remindListName;
var todoList = config.todoList;

var regex = /^\+?[1-9][0-9]*$/;

if (!regex.test(alfy.input)) {
	alfy.error("只能输入正整数(minutes > 0)，请检查输入！");
	return;
}

var minutes = Number(alfy.input);
todoList.forEach(function (item) {
	item['arg']['minutes'] = minutes;
	item['arg']['remindListName'] = remindListName;
	item['arg'] = JSON.stringify(item['arg']);
});

alfy.output(todoList);
