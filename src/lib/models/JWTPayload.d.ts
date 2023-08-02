export type JWTPayload = {
    admin: "True" | "False",
    aud: string,
    authorId: string,
    avatarUrl: string,
    email: string,
    exp: number,
    fullName: string,
    iat: number,
    iss: string,
    jti: string
    nbf: number,
    sub: string,
}