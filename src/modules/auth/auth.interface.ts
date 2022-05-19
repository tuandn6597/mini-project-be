import {
	IsEnum,
	IsIn,
	IsNumber,
	IsString,
} from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { TOKEN_TYPE } from "../../shared/enums/system.enum";

type TokenMap<T extends JWTPayload> = {
	[k in TOKEN_TYPE]: Constructor<T>;
}

@Exclude()
export abstract class JWTPayload {

	@IsNumber()
	@Expose()
	public time!: number;

	@Expose({toClassOnly: true})
	public exp?: number;

	@Expose({toClassOnly: true})
	public iat?: number;

	@Expose({toClassOnly: true})
	public aud?: string;

	@Expose({toClassOnly: true})
	public iss?: string;

	@Expose({toClassOnly: true})
	public sub?: string;

	@IsString()
	@Expose()
	public userId!: string;

	@IsEnum(TOKEN_TYPE)
	@Expose()
	public readonly abstract type: TOKEN_TYPE;

	public deleteTokenAttribute(this: JWTPayload): void {
		delete this.exp;
		delete this.iat;
		delete this.aud;
		delete this.iss;
		delete this.sub;
	}

	/**
	 * Return string of session identification for particular token. For example userId
	 */
	protected abstract _sessionBoundId(): string | undefined;

	public sessionBoundId(): string | undefined {
		return this._sessionBoundId();
	}

	constructor() {
		this.time = new Date().getTime();
	}

}


@Exclude()
export class UserJWTPayload extends JWTPayload {

	@IsString()
	@Expose()
	public userId!: string;


	@IsIn([TOKEN_TYPE.NOVA_BAM])
	@Expose()
	public readonly type: TOKEN_TYPE = TOKEN_TYPE.NOVA_BAM;

	public _sessionBoundId(): string | undefined {
		return this.userId;
	};

}


export class TokenTypeMap implements TokenMap<JWTPayload> {
	public [TOKEN_TYPE.BASE] = JWTPayload as Constructor<JWTPayload>;
	public [TOKEN_TYPE.NOVA_BAM] = UserJWTPayload;
}

export const TOKEN_TYPE_MAP = new TokenTypeMap();
