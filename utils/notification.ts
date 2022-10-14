import TnnyClient from "vendor/iosoc";
import { WSURL } from "../config";

export const StartNotify = () => {
	tnny.connect()
}

const tnny = new TnnyClient(WSURL)