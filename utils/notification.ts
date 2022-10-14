import NSocketClient from "vendor/nsocket";
import { WSURL } from "../config";

export const StartNotify = () => {
	nsocket.connect()
}

const nsocket = new NSocketClient(WSURL)