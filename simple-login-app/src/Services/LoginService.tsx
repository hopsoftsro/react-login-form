import axios, { AxiosPromise } from "axios";
import { ILogin } from "../Models/ILogin";
import { AppConsts } from "./AppConsts";

export class LoginService {   
    public static readonly submit = (data: ILogin) =>
        axios.post(`${AppConsts.WEB_API_BASE_URL}/login`, data) as AxiosPromise<string>;
}