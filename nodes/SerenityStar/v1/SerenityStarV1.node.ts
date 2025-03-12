/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
} from 'n8n-workflow';
import { commonFields } from './Fields';
import { Router } from './Router';
import { resources } from './Resources';
import { Operations } from './Constants';
import { operations } from './Operations';

const versionDescription: INodeTypeDescription = {
	displayName: 'Serenity* Star',
	subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
	name: 'serenityStar',
	icon: 'file:../../serenity-logo.svg',
	group: ['transform'],
	version: 1,
	description: 'Work with Serenity* Star platform',
	inputs: ['main'],
	outputs: ['main'],
	credentials: [
		{
			name: 'serenityStarApi',
			required: true,
		},
	],
	defaults: {
		name: 'Serenity* Star',
	},
	requestDefaults: {
		baseURL: 'https://api.serenitystar.ai/api/v2',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	},
	properties: [
		...resources,
		...operations,
		// Required fields
		commonFields.agentCode,
		commonFields.chatId,
		commonFields.message,

		// Optional fields
		{
			displayName: 'Additional Fields',
			name: 'additionalFields',
			type: 'collection',
			default: null,
			placeholder: 'Add Field',
			options: [
				commonFields.agentVersion,
				commonFields.baseURL,
				commonFields.inputParameters,
				commonFields.userIdentifier,
			],
			displayOptions: {
				show: {
					operation: [Operations.CreateConversation],
				},
			},
		},
		{
			displayName: 'Additional Fields',
			name: 'additionalFields',
			type: 'collection',
			default: null,
			placeholder: 'Add Field',
			options: [commonFields.agentVersion, commonFields.baseURL, commonFields.inputParameters],
			displayOptions: {
				show: {
					operation: [Operations.Execute],
				},
			},
		},
	],
};

export class SerenityStarV1 implements INodeType {
	description: INodeTypeDescription;
	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			...versionDescription,
		};
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const router = new Router(this);
		const returnData = await router.route();
		return [returnData];
	}
}
