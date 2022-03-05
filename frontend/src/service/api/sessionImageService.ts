import {SessionImage} from "@/store/models";
import api from "."
import {apiErrorMapper} from "@/service/api/utils";

class SessionImageService {
    async fetchAll(): Promise<SessionImage[]> {
        return new Promise<SessionImage[]>((resolve, reject) => {
            api.get<SessionImage[]>("/sessionImage")
                .then((response) => {
                    const data = response.data;
                    resolve(data?.payload);
                }).catch((error) => reject(new Error(apiErrorMapper(error))));
        });
    }
}

const sessionImageService = new SessionImageService();
export default sessionImageService;
