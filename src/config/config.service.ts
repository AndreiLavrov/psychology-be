import { config, DotenvParseOutput } from 'dotenv';
import { IConfigService } from 'src/config/config.interface';

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor() {
    const { error, parsed } = config();

    if (error) throw new Error('There no .env file');
    if (!parsed) throw new Error('.env file is empty');

    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];

    if (!res) throw new Error('There no such key into .env file');

    return res;
  }
}
