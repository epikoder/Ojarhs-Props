import { WSURL } from "../constants";
import { io } from "socket.io-client";

export const StartNotify = () => {
	const client = io(WSURL)
}