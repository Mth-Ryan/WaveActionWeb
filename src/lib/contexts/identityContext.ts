import { browser } from "$app/environment";
import { IdentityCookie, PublicUserCookie, RefreshCookie, RunMode } from "$lib/configConstants";
import type { JWTPayload } from "$lib/models/JWTPayload";
import type { Tokens } from "$lib/models/Tokens";
import { getApiClient } from "$lib/services/apiClient";
import parseDocumentCookies from "$lib/utils/parseDocumentCookies";
import type { Cookies } from "@sveltejs/kit";
import type { AxiosError, AxiosInstance } from "axios";

type RefreshTokenKind = "browser_session" | "long_session";

type RefreshToken = { token: string, kind: RefreshTokenKind };

export class IndentityContext {
    private cookiesService: Cookies;
    private apiClient: AxiosInstance;

    constructor(cookies: Cookies) {
        this.cookiesService = cookies;
        this.apiClient = getApiClient();
    }

    private clientCookieOpts = {
        path: "/",
        httpOnly: false,
        sameSite: "strict" as "strict",
        secure: false,
        maxAge: 60 * 60 * 24 * 28, // 28 days
    }

    private baseCookieOpts = {
        path: "/",
        httpOnly: true,
        sameSite: "strict" as "strict",
        secure: RunMode == "release",
    }

    private browserRefreshOpts = { ...this.baseCookieOpts }

    private longRefreshOpts = { 
        maxAge: 60 * 60 * 24 * 28, // 28 days
        ...this.baseCookieOpts,
    }

    private identityOpts = {
        maxAge: 60 * 12, //  12 minutes
        ...this.baseCookieOpts,
    }

    private parseJWTClaims(token: string): JWTPayload {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload) as JWTPayload;
    }

    private get refreshToken(): RefreshToken | undefined {
        const cookieVal = this.cookiesService.get(RefreshCookie);
        if (cookieVal != undefined) {
            return JSON.parse(cookieVal) as RefreshToken;
        }
        return undefined;
    }

    private set refreshToken(input: RefreshToken) {
        this.cookiesService.set(
            RefreshCookie,
            JSON.stringify(input),
            input.kind == "browser_session" ? this.browserRefreshOpts : this.longRefreshOpts
        );
    }

    private get identityToken(): string | undefined {
        return this.cookiesService.get(IdentityCookie);
    }

    private set identityToken(token: string) {
        this.cookiesService.set(IdentityCookie, token, this.identityOpts);
    }

    private get publicUserData(): { fullName: string, avatarUrl: string } | undefined {
        const cookie = this.cookiesService.get(PublicUserCookie);
        return cookie ? JSON.parse(cookie) : undefined;
    }

    private set publicUserData(value: { fullName: string, avatarUrl: string }) {
        this.cookiesService.set(PublicUserCookie, JSON.stringify(value), this.clientCookieOpts);
    }

    public async login(userNameOrEmail: string, password: string, keepLogged: boolean) {
        try {
            const response = await this.apiClient.post("/Access/Login", { userNameOrEmail, password });
            const tokens = await response.data as Tokens;
            const claims = this.parseJWTClaims(tokens.jwt);
            this.identityToken = tokens.jwt;
            this.refreshToken = { 
                token: tokens.refresh,
                kind: keepLogged ? "long_session" : "browser_session"
            };
            this.publicUserData = {fullName: claims.fullName, avatarUrl: claims.avatarUrl};
            return null;
        } catch (error) {
            return error as AxiosError<any, any>;
        }
    }

    public async signup(data: {
        userName: string,
        email: string,
        password: string,
        profile: {
            firstName: string,
            lastName: string
        }
    }) {
        try {
            const response = this.apiClient.post("/Access/Signup", data);
            const tokens = (await response).data as Tokens;
            const claims = this.parseJWTClaims(tokens.jwt);
            this.identityToken = tokens.jwt;
            this.refreshToken = { 
                token: tokens.refresh,
                kind: "long_session"
            };
            this.publicUserData = {fullName: claims.fullName, avatarUrl: claims.avatarUrl};
            return null;
        } catch (error) {
            return error as AxiosError<any, any>;
        }
    }

    public logout() {
        this.cookiesService.delete(RefreshCookie, { path: '/' });
        this.cookiesService.delete(IdentityCookie, { path: '/' });
        this.cookiesService.delete(PublicUserCookie, { path: '/' });
    }

    public async refreshSession() {
        if (this.refreshToken == undefined)
            return new Error("Refresh token not found");

        try {
            const response = await this.apiClient.post("/Access/Refresh", { refresh: this.refreshToken })
            const tokens = await response.data as Tokens;
            const currentKind = this.refreshToken!.kind;
            const claims = this.parseJWTClaims(tokens.jwt);

            this.identityToken = tokens.jwt;
            this.refreshToken = { token: tokens.refresh, kind: currentKind };
            this.publicUserData = {fullName: claims.fullName, avatarUrl: claims.avatarUrl};
            return null
        } catch (error) {
            return error as AxiosError<any, any>;
        }
    }

    public async isLogged() {
        if (this.identityToken == undefined) {
            const err = await this.refreshSession();
            return err == null;
        }
        return true;
    }

    public async getUserIdentityToken() {
        if (await this.isLogged()) {
            return this.identityToken;
        }
        return undefined;
    }

    public async getUserClaims() {
        const token = await this.getUserIdentityToken();
        if (token == undefined) {
            return undefined;
        }
        return this.parseJWTClaims(token);
    }

    public static getUserPublicDataClient(): { fullName: string; avatarUrl: string } | undefined {
        if (browser) {
            const cookies = parseDocumentCookies(document.cookie);
            if (cookies[PublicUserCookie])
                return JSON.parse(cookies[PublicUserCookie]) as { fullName: string; avatarUrl: string };
            else return undefined;
        }
        return undefined;
    }
}