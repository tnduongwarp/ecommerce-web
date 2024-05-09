export class Const {
  static ORIGIN = 'http://localhost:3000';
  public static readonly API_SEND_OTP = `${this.ORIGIN}/forgot-pw/send_recovery_email`;
  public static readonly API_CHANGE_PW = `${this.ORIGIN}/forgot-pw/change-pw`;
  public static readonly API_GET_LIST_CATEGORY = `${this.ORIGIN}/category/`;
  public static readonly API_GET_LIST_PRODUCT = `${this.ORIGIN}/product`;
  public static readonly API_CART_URL = `${this.ORIGIN}/cart`;
  public static readonly API_USER = `${this.ORIGIN}/user`;
  public static readonly API_ORDER = `${this.ORIGIN}/order`;
  public static readonly API_CHAT = `${this.ORIGIN}/chat`;
  public static readonly API_SELLER = `${this.ORIGIN}/seller`;
  public static readonly API_VNPAY = `${this.ORIGIN}/create_payment_url`;

  public static readonly carouseImage = [
    "assets/img/image1.jpg",
    "assets/img/image2.jpg",
    "assets/img/image3.jpg",
    "assets/img/image4.jpg",
    "assets/img/image5.jpg"
  ]
}
