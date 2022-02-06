// import React from 'react';
// function Calendar() {
//   return ( <>
// <h1>This is calendar</h1>
//   </> );
// }

// export default Calendar;

// import React from 'react';
// function Calendar() {
//   return ( <>
// <h1>This is calendar</h1>
//   </> );
// }

// export default Calendar;
export default class Calendar {
	api = undefined;

	accountManager = undefined;

	constructor(accountManager) {
		this.accountManager = accountManager;
	}

	getEvents(calendarId, timeMin, timeMax) {
		if (this.accountManager.signedIn) {
			return this.accountManager.api.client.calendar.events.list({
				calendarId,
				timeMin,
				timeMax,
				singleEvents: true,
			});
		}

		return [];
	}
}
