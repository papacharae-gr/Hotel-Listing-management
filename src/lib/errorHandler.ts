/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AxiosError } from 'axios';


export function throwApiError(err: unknown): never {
	const e = err as AxiosError<any>;
	const status = e?.response?.status;
	let message = 'Unexpected error';

	switch (status) {
		case 400:
			message = 'Validation error. Please check the fields.';
			break;
		case 404:
			message = 'Resource not found.';
			break;
		case 409:
			message = 'Conflict: room number already exists for this hotel.';
			break;
		case 500:
			message = 'Server error. Please try again.';
			break;
		default:
			message = e?.message || message;
	}

	const error = new Error(message) as Error & { status?: number; details?: unknown };
	error.status = status;
	error.details = e?.response?.data;
	throw error;
}
