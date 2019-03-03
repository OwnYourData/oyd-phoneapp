import BackgroundFetch from 'react-native-background-fetch';
import { captureSentryMessage } from './captureSentryMessage';
/**
 * See README.md for documentation
 */
type ScheduleOptions = {
	period?:number,
	timeout?:number,
	flex?:number,
}

type StatusResponse = {
	available:boolean,
	unavailableReason?:'denied' | 'restricted',
}

/**
 * See README.md for documentation
 */
export type BackgroundTaskInterface = {
	define:(task:() => void) => void,
	schedule:(options?:ScheduleOptions) => void,
	finish:() => void,
	cancel:() => void,
	statusAsync:() => Promise<StatusResponse>,
}

const constants = {
	UNAVAILABLE_DENIED: 'denied',
	UNAVAILABLE_RESTRICTED: 'restricted'
};

const backgroundTask:BackgroundTaskInterface = {
	...constants,

	definition: null,

	define: (task) => {
		this.definition = task;
	},

	schedule: () => {
		// Cancel existing tasks
		BackgroundFetch.stop();

		// Configure the native module
		// Automatically calls RNBackgroundFetch#start
		BackgroundFetch.configure(
			{
				stopOnTerminate: false,
				minimumFetchInterval: 15,
				enableHeadless: true,
				startOnBoot: true
			},
			this.definition,
			async () => {
				await captureSentryMessage({
					error: '[js] RNBackgroundFetch failed to start',
					message: 'BackgroundFetch method',
					status: 0,
					type: 'n/a'
				});
			}
		);
	},

	finish: () => {
		BackgroundFetch.finish();
	},

	cancel: () => {
		BackgroundFetch.stop();
	},

	statusAsync: () => (new Promise((resolve) => {
		BackgroundFetch.status(async (status) => {
			if (status === BackgroundFetch.STATUS_RESTRICTED) {
				await captureSentryMessage({
					error: '[js] BackgroundFetch.STATUS_RESTRICTED',
					message: 'BackgroundFetch statusAsync method',
					status: 0,
					type: 'n/a'
				});
				return resolve({
					available: false,
					unavailableReason: 'restricted'
				});
			} else if (status === BackgroundFetch.STATUS_DENIED) {
				await captureSentryMessage({
					error: '[js] BackgroundFetch.STATUS_DENIED',
					message: 'BackgroundFetch statusAsync method',
					status: 0,
					type: 'n/a'
				});
				return resolve({
					available: false,
					unavailableReason: 'denied'
				});
			}

			return resolve({
				available: true
			});
		});
	}))
};

export default backgroundTask;
