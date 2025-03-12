![Serenity* Star - n8n node](https://github.com/serenitystar-ai/n8n-nodes-serenity-star/blob/main/banner.png?raw=true)

# n8n-nodes-serenity-star

This is an n8n community node. It lets you use the Serenity* Star platform in your n8n workflows.

Serenity* Star is a platform that enables AI-powered agents to automate tasks and conversations.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

The Serenity* Star node currently supports the following operations:

### Activity Agent
- **Execute**: Executes an activity-related task.

### Assistant Agent
- **Execute**: Executes an assistant-related task.
- **Create Conversation**: Creates a new conversation.

## Credentials

To use the Serenity* Star node, you need to set up authentication by creating a credential in n8n.

1. Navigate to the **Credentials** section in n8n.
2. Add a new credential for **Serenity* Star API**.
3. Provide your API key and save the credential.

## Compatibility

This node is compatible with n8n version 0.200.0 and later.

## Usage

Each operation has required and optional fields to customize the request.

### Required Fields
These fields are common across multiple operations:

#### For `Create Conversation`:
- **Agent Code**: Identifier for the AI agent.
- **Chat ID**: Unique identifier for the chat session (required for `Create Conversation`).
- **Message**: The input message to be processed by the AI agent (required for `Create Conversation`).

#### For `Execute`:
- **Agent Code**: Identifier for the AI agent.

### Optional Fields
Additional optional fields can be included based on the operation:

#### For `Create Conversation`:
- **Agent Version**: Specifies the version of the AI agent.
- **Base URL**: Allows overriding the default API base URL.
- **Input Parameters**: Key-value pairs to customize the AI agent's response.
- **User Identifier**: Unique identifier for the user interacting with the agent.

#### For `Execute`:
- **Agent Version**: Specifies the version of the AI agent.
- **Base URL**: Allows overriding the default API base URL.
- **Input Parameters**: Key-value pairs to customize the AI agent's execution.

## Self-Hosting Configuration

If you are self-hosting the Serenity* Star platform, you need to provide the `baseURL` for your instance:

1. The default baseURL is `api.serenitystar.ai/api/v2/`
2. You can override this by providing your own baseURL in the **Base URL** field available in all operations
3. Make sure to include the complete path including any API version prefixes

## Resources

* [Serenity* Star API Documentation](https://docs.serenitystar.ai/docs/api/aihub/serenity-star-api-docs)
* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## Version history

- **v1.0.0**: Initial release, supports Activity and Assistant agent operations.
