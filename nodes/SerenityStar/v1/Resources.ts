import { INodeProperties } from 'n8n-workflow';
import { Resources } from './Constants';

export const resources: INodeProperties[] = [
	// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: Resources.ActivityAgent,
				value: Resources.ActivityAgent,
				displayName: Resources.ActivityAgent,
			},
			{
				name: Resources.AssistantAgent,
				value: Resources.AssistantAgent,
				displayName: Resources.AssistantAgent,
			},
		],
		default: Resources.ActivityAgent,
	},
];
