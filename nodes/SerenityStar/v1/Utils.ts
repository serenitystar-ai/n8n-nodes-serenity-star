type ValidationError = {
	response: {
		data: {
			statusCode: number;
			errors: { [key: string]: string };
		};
	};
};

type InputParameters =
	| {
			values: Array<{
				key: string;
				value: string;
				type: 'string' | 'number' | 'boolean' | 'array' | 'object';
			}>;
	  }
	| undefined;

export const formatValidationError = (error: ValidationError): string => {
	if (
		error.response &&
		error.response.data.statusCode === 400 &&
		error.response.data &&
		error.response.data.errors
	) {
		const errorsObj = error.response.data.errors;

		const formattedErrors = Object.entries(errorsObj)
			.map(([key, value]) => {
				return `${key}: ${value}`;
			})
			.join(', ');

		return `Serenity* Star API error response [400]: ${formattedErrors}`;
	}

	return 'Serenity* Star API error response [400]';
};

export const mapInputParameters = (
	inputParameters: InputParameters,
): { Key: string; Value: any }[] => {
	const result: { Key: string; Value: any }[] = [];
	if (!inputParameters) {
		return result;
	}
	if (inputParameters.values) {
		inputParameters.values.forEach((param) => {
			let formattedValue: any = param.value;

			switch (param.type) {
				case 'number':
					formattedValue = Number(param.value);
					break;
				case 'boolean':
					formattedValue = param.value.toLowerCase() === 'true';
					break;
				case 'array':
				case 'object':
					try {
						formattedValue = JSON.parse(param.value);
					} catch (error) {}
					break;
				case 'string':
				default:
					// Keep as string
					break;
			}

			result.push({
				Key: param.key,
				Value: formattedValue,
			});
		});
	}

	return result;
};
