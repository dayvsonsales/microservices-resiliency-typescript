export default interface IHTTPProvider {
  get(url: string, options: object): Promise<any>;
  post(url: string, postData: object): Promise<any>;
}
