export class ApiSuccess {
  public data: any;
  public timestamp: string;
  public status: number;

  constructor(
    data: any = {},
    status: number = 200,
    timestamp: string = new Date().toISOString()
  ) {
    this.data = data;
    this.timestamp = timestamp;
    this.status = status;
  }
}

export class ApiError extends Error {
  public data: any;
  public timestamp: string;
  public override message;
  public status: number;

  constructor(
    data: any = {},
    status: number = 400,
    message: string,
    timestamp: string = new Date().toISOString()
  ) {
    super(message);
    this.timestamp = timestamp;
    this.message = message;
    this.status = status;
    this.data = data || this.stack;
  }
}
