import { io } from "socket.io-client";
import { BASE_URL, DRIVERFORM1 } from "constants/apiKeys";

const url = BASE_URL + DRIVERFORM1;
const socket = io(BASE_URL);

export default socket;
