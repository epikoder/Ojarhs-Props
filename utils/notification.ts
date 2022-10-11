import { WSURL } from "../config";
import { io } from "socket.io-client";

export const StartNotify = () => {
	const client = io(WSURL)
}