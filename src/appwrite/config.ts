import conf from "@/conf/conf";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};
type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  //! create user...........................
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error: any) {
      throw error;
    }
  }
  //! login............................
  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }
  //!is Logged in?........................
  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error: any) {}
    return false;
  }
  //! get current user................
  async getCurrentUser() {
    try {
      return account.get();
    } catch (error: any) {
      console.log("get current user" + error);
    }
    return null;
  }
  //!Log out............................
  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error: any) {}
  }
}
const appwriteService = new AppwriteService();
export default appwriteService;
