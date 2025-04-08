export interface UserPayloadRequest  {
  username: string;
  email?: string;
  name?: string;
}

export interface UserPayloadResponse  {
  acccessToken: string;
  refreshToken: string;
}

