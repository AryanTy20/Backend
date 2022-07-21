import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config";

class JwtService {
  static sign(payload, expires = "10s", secretkey = ACCESS_TOKEN) {
    return jwt.sign(payload, secretkey, { expiresIn: expires });
  }
  static sign_v(payload, secretkey = ACCESS_TOKEN) {
    return jwt.verify(payload, secretkey);
  }
  static refresh(payload, expires = "7d", secretkey = REFRESH_TOKEN) {
    return jwt.sign(payload, secretkey, { expiresIn: expires });
  }
  static refresh_v(payload, secretkey = REFRESH_TOKEN) {
    return jwt.verify(payload, secretkey);
  }
}

export default JwtService;
