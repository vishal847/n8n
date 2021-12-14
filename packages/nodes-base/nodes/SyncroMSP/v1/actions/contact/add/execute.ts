import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../../../transport';


export async function addContact(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('customerId',index) as IDataObject;
	const name = this.getNodeParameter('name', index) as IDataObject;
	const email = this.getNodeParameter('email', index) as IDataObject;
	const { address, notes, phone } = this.getNodeParameter('additionalFields', index) as IDataObject;

	const qs = {} as IDataObject;
	const requestMethod = 'POST';
	const endpoint = 'contacts';
	let body = {} as IDataObject;
	let addressData = address as IDataObject;

	if( addressData ) {
		addressData = addressData['addressFields'] as IDataObject;
		addressData.address1 = addressData.address;
	}

	body = {
		...addressData,
		customer_id : id,
		email,
		name,
		notes,
		phone,
	};

	let responseData;
	responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData);
}
