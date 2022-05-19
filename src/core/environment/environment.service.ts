import { Injectable, Logger } from "@nestjs/common";
import { IsNumber, IsString, validateSync } from "class-validator";
import { Expose, plainToClass, Type } from "class-transformer";
export class Environment {

	@IsNumber()
	@Type(() => Number)
	@Expose()
	public API_PORT: number = 3000;

	@IsString()
	@Expose()
	public JWT_SECRET: string = "QwaPPccjVXVTCQ9zgfxBMGU4nBRtcAjx";

	@IsString()
	@Expose()
	public APP_BASE_URL: string = "/";

	@IsString()
	@Expose()
	public FIREBASE_URL: string = '';

	@IsString()
	@Expose()
	public FIREBASE_SERVER_KEY: string = '';

	@IsNumber()
	@Expose()
	@Type(() => Number)
	public TOKEN_EXPIRE: number = 1800000;

	@IsString()
	@Expose()
	public JWT_ISSUER: string = "NOVA-BAM";

	@IsString()
	@Expose()
	public MONGO_URI: string = 'mongodb://novaAdmin:123456789@10.16.21.1:27017/nova-bam-dev?authSource=admin'
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


