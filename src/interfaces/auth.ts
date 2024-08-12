export interface IJWTEmailPayload {
  id: string;
  email: string;
}

export interface IJWTPayloadWithRToken extends IJWTEmailPayload {
  refreshToken: string;
}

export interface IJWTTokens {
  accessToken: string;
  refreshToken?: string;
}
