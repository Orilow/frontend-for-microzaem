
export class  AppSettings {
  public static SERVICE_URL = 'https://cryptic-inlet-06508.herokuapp.com';
  public static LOGIN_URL = AppSettings.SERVICE_URL + '/authenticate';
  public static ALL_ACCOUNTS_URL = AppSettings.SERVICE_URL + '/api/bankAccounts/getAll';
  public static CREATE_BANK_ACCOUNT_URL = AppSettings.SERVICE_URL + '/api/bankAccounts/create';
  public static REGISTER_URL = AppSettings.SERVICE_URL + '/registration';
}
