import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';
import { formatValidationError, mapInputParameters } from './Utils';
import { AdditionalFields } from './Types';
import { Operations, Resources } from './Constants';

interface IHandlerParams {
	executeFunctions: IExecuteFunctions;
	i: number;
	items: INodeExecutionData[];
}

type HandlerFunction = (params: IHandlerParams) => Promise<INodeExecutionData>;

export class Router {
	private executeFunctions: IExecuteFunctions;
	private items: INodeExecutionData[];

	constructor(executeFunctions: IExecuteFunctions) {
		this.executeFunctions = executeFunctions;
		this.items = executeFunctions.getInputData();
	}

	public async route(): Promise<INodeExecutionData[]> {
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < this.items.length; i++) {
			try {
				const resource = this.executeFunctions.getNodeParameter('resource', i) as string;
				const operation = this.executeFunctions.getNodeParameter('operation', i) as string;
				const agentCode = this.executeFunctions.getNodeParameter('agentCode', i) as string;
				const additionalFields = this.executeFunctions.getNodeParameter(
					'additionalFields',
					i,
					{},
				) as AdditionalFields;

				const result = await this.execute(resource, operation, i);
				returnData.push({
					json: {
						input: {
							agentCode,
							inputParameters: additionalFields.inputParameters,
							baseURL: additionalFields.baseURL,
							agentVersion: additionalFields.agentVersion,
							userIdentifier: additionalFields.userIdentifier,
						},
						output: result,
					},
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.executeFunctions.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return returnData;
	}

	private async execute(resource: string, operation: string, i: number): Promise<any> {
		const handlerMap: Record<string, Record<string, HandlerFunction>> = {
			[Resources.ActivityAgent]: {
				[Operations.Execute]: this.executeAgent.bind(this),
			},
			[Resources.AssistantAgent]: {
				[Operations.CreateConversation]: this.createConversation.bind(this),
				[Operations.Execute]: this.executeAgent.bind(this),
			},
			// Add more resources and operations as needed
		};

		if (!handlerMap[resource]) {
			throw new NodeOperationError(
				this.executeFunctions.getNode(),
				`Resource "${resource}" is not supported`,
			);
		}

		if (!handlerMap[resource][operation]) {
			throw new NodeOperationError(
				this.executeFunctions.getNode(),
				`Operation "${operation}" is not supported for resource "${resource}"`,
			);
		}

		return handlerMap[resource][operation]({
			executeFunctions: this.executeFunctions,
			i,
			items: this.items,
		});
	}

	private async executeAgent({ executeFunctions, i }: IHandlerParams): Promise<any> {
		// Get agent code
		const agentCode = executeFunctions.getNodeParameter('agentCode', i) as string;
		const additionalFields = executeFunctions.getNodeParameter(
			'additionalFields',
			i,
			{},
		) as AdditionalFields;

		// Prepare request URL
		const baseURL = additionalFields.baseURL || 'https://api.serenitystar.ai/api/v2';
		let endpoint = `/agent/${agentCode}/execute`;

		// Add version parameter if specified
		if (additionalFields.agentVersion) {
			endpoint += `/${additionalFields.agentVersion}`;
		}

		// Get credentials for authentication
		const credentials = await executeFunctions.getCredentials('serenityStarApi');

		// Format input parameters as required by the API
		const body: Array<{ Key: string; Value: any }> = mapInputParameters(
			additionalFields.inputParameters,
		);

		const operation = this.executeFunctions.getNodeParameter('operation', i) as string;
		if (operation === Operations.Execute) {
			body.push({
				Key: 'message',
				Value: executeFunctions.getNodeParameter('message', i) as string,
			});
			body.push({
				Key: 'chatId',
				Value: executeFunctions.getNodeParameter('chatId', i) as string,
			});
		}

		// add n8n channel
		body.push({
			Key: 'channel',
			Value: 'n8n',
		});

		// Execute API call with authentication headers
		try {
			const response = await executeFunctions.helpers.httpRequest({
				method: 'POST',
				url: endpoint,
				baseURL,
				body,
				json: true,
				headers: {
					'X-API-KEY': `${credentials.apiKey}`,
				},
			});

			return response;
		} catch (error) {
			throw new NodeOperationError(executeFunctions.getNode(), formatValidationError(error));
		}
	}

	private async createConversation({ executeFunctions, i }: IHandlerParams): Promise<any> {
		const agentCode = executeFunctions.getNodeParameter('agentCode', i) as string;
		const additionalFields = executeFunctions.getNodeParameter(
			'additionalFields',
			i,
			{},
		) as AdditionalFields;

		const baseURL = additionalFields.baseURL || 'https://api.serenitystar.ai/api/v2';
		let endpoint = `/agent/${agentCode}/conversation`;

		// Add version parameter if specified
		if (additionalFields.agentVersion) {
			endpoint += `/${additionalFields.agentVersion}`;
		}

		// Get credentials for authentication
		const credentials = await executeFunctions.getCredentials('serenityStarApi');

		// Format input parameters as required by the API
		const body: Array<{ Key: string; Value: any }> = mapInputParameters(
			additionalFields.inputParameters,
		);

		// Execute API call with authentication headers
		try {
			const response = await executeFunctions.helpers.httpRequest({
				method: 'POST',
				url: endpoint,
				baseURL,
				body,
				json: true,
				headers: {
					'X-API-KEY': `${credentials.apiKey}`,
				},
			});

			return response;
		} catch (error) {
			throw new NodeOperationError(executeFunctions.getNode(), formatValidationError(error));
		}
	}
}
