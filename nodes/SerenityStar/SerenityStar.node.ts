import { INodeTypeDescription, VersionedNodeType, IVersionedNodeType } from 'n8n-workflow';
import { SerenityStarV1 } from './v1/SerenityStarV1.node';

export class SerenityStar extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeDescription = {
			displayName: 'Serenity* Star',
			subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
			name: 'serenityStar',
			icon: 'file:../serenity-logo.svg',
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
			defaultVersion: 1,
			properties: [
				{
					displayName: 'Version',
					name: 'nodeVersion',
					type: 'hidden',
					default: 'v1',
					isNodeSetting: true,
				},
			],
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new SerenityStarV1(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
