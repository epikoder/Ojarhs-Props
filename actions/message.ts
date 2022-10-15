import { Api } from "helpers/api"

export const markMessageAsRead = async (payload: {
	owner: string,
	id: number
}) => {
	try {
		await Api().post('/user/message-read', { ...payload, id: parseInt(payload?.id?.toString()) })
	} catch (error) {
	}
}