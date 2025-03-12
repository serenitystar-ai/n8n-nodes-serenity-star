export type AdditionalFields = {
	agentVersion?: number;
	baseURL?: string;
	inputParameters?: {
		values: Array<{
			key: string;
			value: string;
			type: 'string' | 'number' | 'boolean' | 'array' | 'object';
		}>;
	};
	userIdentifier?: string;
};
