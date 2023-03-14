import { Hears, Update } from "nestjs-telegraf";

@Update()
export class AppUpdate {

  @Hears([new RegExp(/hi/), new RegExp(/hello/)])
  onHelloHears(): string {
    return 'hello';
  }

  @Hears(new RegExp(/by/))
  onByByHears(): string {
    return 'By!';
  }
}
