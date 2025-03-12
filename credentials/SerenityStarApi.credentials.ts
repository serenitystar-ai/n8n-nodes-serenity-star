import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class SerenityStarApi implements ICredentialType {
	name = 'serenityStarApi';
	displayName = 'Serenity* Star API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				"X-API-KEY": '={{$credentials.apiKey}}',
			},
		},
	};
}
