function run(argv) {
	var query = argv[0];
	query = JSON.parse(query);
	var taskName = query.taskName;
	var minutes = query['minutes'];
	var calendarName = query['calendarName'];
	var remindListName = query['remindListName'];

	var Calendar = Application("Calendar");

	var eventStart = new Date();
	var eventEnd = new Date(eventStart.getTime());
	eventEnd.setMinutes(eventStart.getMinutes() + Number(minutes));

	var projectCalendars = Calendar.calendars.whose({name: calendarName});
	var projectCalendar = projectCalendars[0];
	var event = Calendar.Event({summary: taskName, startDate: eventStart, endDate: eventEnd});
	projectCalendar.events.push(event);

	var reminderData = {
		// text: taskName,
		text: '"#"任务已完成！',
		body: '',
		date: eventEnd,
		priority: 1,
		list: remindListName
	};

	var tempTime = new Date();
	while(new Date()-tempTime<500){
	}

	createReminder(reminderData, remindListName);

	return taskName;
}

function createReminder(reminderData, defaultList) {
	var Reminders = Application('Reminders');
	try {
		var data = {name: reminderData['text']}
		// console.log("Name:" + data['name'])
		if (reminderData['body']) {
			data['body'] = reminderData['body'];
		}
		if (reminderData['date']) {
			data['remindMeDate'] = new Date(reminderData['date'])
			// console.log("Date:" + data['date']);
		}
		if (reminderData['priority']) {
			data['priority'] = parseInt(reminderData['priority']);
		}
		var reminderList;
		if (reminderData['list'] && Reminders.lists.whose({name: reminderData['list']}).length) {
			// list provided by query
			reminderList = Reminders.lists.whose({name: reminderData['list']})[0];
		} else if (defaultList && Reminders.lists.whose({name: defaultList}).length) {
			// list provided by worklow variable
			reminderList = Reminders.lists.whose({name: defaultList})[0];
		} else {
			// default list provided by application
			reminderList = Reminders.defaultList();
		}
		//console.log(reminder);
		var reminder = Reminders.Reminder(data);
		reminderList.reminders.push(reminder);
		// nb. querying the reminder object at this point causes reminders app to hang for ~15 sec
		return "Created reminder: " + data['name'];
	} catch (e) {
		console.log(e);
		return e;
	}
}
