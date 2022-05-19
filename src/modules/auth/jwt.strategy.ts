import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { AuthService } from "./auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JWTPayload } from "./auth.interface";
import { Request } from "express";
import { EnvironmentService } from "@internal/core/environment/environment.service";
import { QUERY } from "@internal/shared/enums/http.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 

	private static extractJWT(req: Request): string | null {
		return ExtractJwt.fromAuthHeaderAsBearerToken()(req) || ExtractJwt.fromUrlQueryParameter(QUERY.TOKEN)(req);
	}

	constructor(
		protected readonly authService: AuthService,
		envService: EnvironmentService,
	) {
		super({
      jwtFromRequest: JwtStrategy.extractJWT,
			secretOrKey: envService.ENVIRONMENT.JWT_SECRET,
		} as StrategyOptions);
	}

	async validate(payload: JWTPayload): Promise<JWTPayload> {
		return this.authService.validatePayload(payload);
	}
}
