import { initializeQrGenerator } from "./qrgenerator/qrgenerator";
import { ready } from "./utils/utils";

ready(() => console.log(`Commit: ${GIT_INFO}`));

ready(initializeQrGenerator);
