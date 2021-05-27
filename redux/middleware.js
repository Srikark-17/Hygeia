import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const middlewares = [];
const logger = createLogger();

// commiting logger for release
middlewares.push(logger, thunk);
// middlewares.push(thunk);

export default middlewares;
