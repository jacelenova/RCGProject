import { getData } from "./call-api"

export const encodeText = async (text) => {
  return await getData(`encode/base64encode?text=${text}`);
}