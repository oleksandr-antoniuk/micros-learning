import { MongooseModuleAsyncOptions, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => {
      const uri = getMongoString(configService);
      return Promise.resolve({ uri } as MongooseModuleFactoryOptions);
    },
    inject: [ConfigService],
    imports: [ConfigModule],
  };
}

const getMongoString = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('MONGO_LOGIN') +
  ':' +
  configService.get('MONGO_PASSWORD') +
  '@' +
  configService.get('MONGO_HOST') +
  ':' +
  configService.get('MONGO_PORT') +
  '/' +
  configService.get('MONGO_DATABASE') +
  '?authSource=' +
  configService.get('MONGO_AUTHDATABASE');
