import { Injectable, Logger } from "@nestjs/common";
import { IsNumber, IsString, validateSync } from "class-validator";
import { Expose, plainToClass, Type } from "class-transformer";
export class Environment {

	@IsNumber()
	@Type(() => Number)
	@Expose()
	public API_PORT: number = 5678;

	@IsString()
	@Expose()
	public JWT_SECRET: string = "QwaPPccjVXVTCQ9zgfxBMGU4nBRtcAjx";

	@IsString()
	@Expose()
	public APP_BASE_URL: string = "/";

	@IsNumber()
	@Expose()
	@Type(() => Number)
	public TOKEN_EXPIRE: number = 1800000;

	@IsString()
	@Expose()
	public JWT_ISSUER: string = "MINI-PROJECT";

}

@Injectable()
export class EnvironmentService {
	protected logger = new Logger(EnvironmentService.name);

	public readonly ENVIRONMENT: Environment;

	constructor() {
		this.ENVIRONMENT = plainToClass(
			Environment,
			{
				...new Environment(), // Include default value
				...process.env, // ENV override
			},
			{ excludeExtraneousValues: true },
		);
		const res = validateSync(this.ENVIRONMENT);

		if (res.length) {
			this.logger.error(JSON.stringify(res));
			throw res;
		}
	}
}


