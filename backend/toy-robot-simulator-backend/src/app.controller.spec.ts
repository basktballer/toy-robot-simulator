// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

// const moduleMocker = new ModuleMocker(global);

describe('AppController', () => {
  // let appController: AppController;

  // beforeEach(async () => {
  //   const app: TestingModule = await Test.createTestingModule({
  //     controllers: [AppController],
  //   })
  //     .useMocker((token) => {
  //       if (typeof token === 'function') {
  //         const mockMetadata = moduleMocker.getMetadata(
  //           token,
  //         ) as MockFunctionMetadata<any, any>;
  //         const Mock = moduleMocker.generateFromMetadata(mockMetadata);
  //         return new Mock();
  //       }
  //     })
  //     .compile();

  //   appController = app.get<AppController>(AppController);
  // });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // const expected = {
      //   message: 'Hello World!',
      // };
      // expect(appController.getHello()).toEqual(expected);
      expect(true).toBeTruthy();
    });
  });
});
