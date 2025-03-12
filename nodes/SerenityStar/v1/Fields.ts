import { INodeProperties } from 'n8n-workflow';
import { Operations, Resources } from './Constants';
/**
 * Common field definitions for Serenity Star nodes
 */
const agentVersionField: INodeProperties = {
	displayName: 'Agent Version',
	name: 'agentVersion',
	default: null,
	type: 'number',
	description:
		'Specify the version of the agent to execute. If not specified, the latest version will be used.',
};

const baseUrlField: INodeProperties = {
	displayName: 'Base URL',
	name: 'baseURL',
	default: undefined,
	type: 'string',
	description:
		'Specify the base URL for the API call. If not specified, https://api.serenitystar.ai/api/v2/ will be used.',
};

const userIdentifierField: INodeProperties = {
	displayName: 'User Identifier',
	name: 'userIdentifier',
	default: undefined,
	type: 'string',
	description: 'Specify the user identifier if its required by the agent',
};

const inputParametersField: INodeProperties = {
	displayName: 'Input Parameters',
	name: 'inputParameters',
	type: 'fixedCollection',
	default: null,
	placeholder: 'Add Input Parameter',
	typeOptions: {
		multipleValues: true,
	},
	options: [
		{
			name: 'values',
			displayName: 'Input Parameters',
			values: [
				{
					displayName: 'Key',
					name: 'key',
					type: 'string',
					default: '',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
				{
					displayName: 'Type',
					name: 'type',
					type: 'options',
					default: 'string',
					options: [
						{
							name: 'Array',
							value: 'array',
						},
						{
							name: 'Boolean',
							value: 'boolean',
						},
						{
							name: 'Number',
							value: 'number',
						},
						{
							name: 'Object',
							value: 'object',
						},
						{
							name: 'String',
							value: 'string',
						},
					],
					description:
						'Make sure this type matches the type of the input parameter in the Serenity agent',
				},
			],
		},
	],
};

const chatIdField: INodeProperties = {
	displayName: 'Chat ID',
	name: 'chatId',
	type: 'string',
	required: true,
	description: 'The unique identifier of the chat',
	default: '',
	displayOptions: {
		show: {
			operation: [Operations.Execute],
			resource: [Resources.AssistantAgent],
		},
	},
};

const messageField: INodeProperties = {
	displayName: 'Message',
	name: 'message',
	type: 'string',
	required: true,
	description: 'The message to send to the chat',
	default: '',
	displayOptions: {
		show: {
			operation: [Operations.Execute],
			resource: [Resources.AssistantAgent],
		},
	},
};

const agentCodeField: INodeProperties = {
	displayName: 'Agent Code Name or ID',
	name: 'agentCode',
	type: 'options',
	required: true,
	description:
		'Select an agent from the list of agents retrieved from the API. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	default: '',
	typeOptions: {
		loadOptions: {
			routing: {
				request: {
					url: '=/agent?pageSize=50',
					method: 'GET',
					baseURL:
						'={{$parameter["additionalFields"]?.baseURL || "https://api.serenitystar.ai/api/v2/"}}',
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: {
								property: 'items',
							},
						},
						{
							type: 'setKeyValue',
							properties: {
								name: '={{$responseItem.name}}',
								value: '={{$responseItem.code}}',
							},
						},
					],
				},
			},
		},
		loadOptionsDependsOn: ['additionalFields.baseURL'],
	},
};

export const commonFields = {
	agentVersion: agentVersionField,
	baseURL: baseUrlField,
	inputParameters: inputParametersField,
	agentCode: agentCodeField,
	userIdentifier: userIdentifierField,
	chatId: chatIdField,
	message: messageField,
};
