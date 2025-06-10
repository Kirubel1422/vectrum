export class ApiSuccess {
  public data: any;
  public timestamp: string;
  public status: number;

  constructor(
    data: any = {},
    timestamp: string = new Date().toISOString(),
    status: number = 200
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
    status: number = 400,
    timestamp: string = new Date().toISOString(),
    data: any = {},
    message: string
  ) {
    super(message);
    this.timestamp = timestamp;
    this.message = message;
    this.status = status;
    this.data = this.stack;
  }
}
