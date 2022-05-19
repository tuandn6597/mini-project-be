import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { SYSTEM_MESSAGE } from "../enums/system.enum";

export enum METHOD {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	PATCH = 'PATCH',
	DELETE = "DELETE",
}

export abstract class DTO {
	public abstract paramsDTO: any;
	public abstract queryDTO: any;
	public abstract bodyDTO: any;
	public abstract readonly url: string;
	public abstract readonly method: METHOD;
	public abstract readonly responseDTOClass: Constructor<any>;

	public get interpolatedUrl(): string {
		let url = this.url;
		if (this.paramsDTO) {
			Object.keys(this.paramsDTO).forEach((key) => {
				url = url.replace(":" + key, String(this.paramsDTO[key]));
			});
		}
		if (this.queryDTO) {
			Object.keys(this.queryDTO).forEach((key, index) => {
				if (this.queryDTO[key]) {
					url += (index === 0 ? "?" : "&") + key + "=" + String(this.queryDTO[key]);
				}
			});
		}
		return url;
	}
}

export class ResponseDTO<T> {
  constructor(
    public data: T,
    public message: string | SYSTEM_MESSAGE,
    public code: number,
  ) { }
}

export class ResponseTokenDTO {
	constructor(
		public token: string,
		public refreshToken: string,
	) {
	}
}

export class IdParamsDto {
	@IsString()
  @IsNotEmpty()
	@ApiProperty()
  id: string
}