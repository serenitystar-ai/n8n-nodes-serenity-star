import { INodeProperties } from 'n8n-workflow';
import { Operations, Resources } from './Constants';

export const operations: INodeProperties[] = [
	// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: Operations.Execute,
				value: Operations.Execute,
				description: 'Execute',
				action: 'Execute',
			},
		],
		displayOptions: {
			show: {
				resource: [Resources.ActivityAgent],
			},
		},
		default: Operations.Execute,
	},
	// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: Operations.Execute,
				value: Operations.Execute,
				description: 'Execute',
				action: 'Execute',
			},
			{
				name: Operations.CreateConversation,
				value: Operations.CreateConversation,
				description: 'Create conversation',
				action: 'Create conversation',
			},
		],
		displayOptions: {
			show: {
				resource: [Resources.AssistantAgent],
			},
		},
		default: Operations.CreateConversation,
	},
];
