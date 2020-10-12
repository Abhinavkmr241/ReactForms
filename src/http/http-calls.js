import { makeGetRequest } from './http-service'

export const getUserData = () => {
    return new Promise((resolve, reject) => {
        makeGetRequest(
            "http://178.128.127.115:3000/admin/v1/user/doc/5ede37431a52c86dba7f0051"
        )
            .then(res => {
                resolve(res);
            })
            .catch(e => {
                console.log("API call error: ", e);
                reject(e);
            });
    });
};

export const getSpecialityList = () => {
    return new Promise((resolve, reject) => {
        makeGetRequest(
            "http://178.128.127.115:3000/admin/v1/specialties"
        )
            .then(res => {
                resolve(res);
            })
            .catch(e => {
                console.log("API call error: ", e);
                reject(e);
            });
    });
};
