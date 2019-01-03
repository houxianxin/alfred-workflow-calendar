/**
 * TODO 在此处修改任务列表
 * @type {[string,string,string,string,string]}
 */
var taskList = [
	{name: "your task name", calendar: "your calendar name"}
];


var todoList = [];
taskList.forEach(function (taskObj) {
	todoList.push({
		title: taskObj.name,
		subtitle: 'Please select the item and press enter.',
		arg: {
			taskName: taskObj.name,
			calendarName: taskObj.calendar
		}
	});
});


module.exports = {
	remindListName: "番茄日历事件结束提醒",
	todoList: todoList
};
