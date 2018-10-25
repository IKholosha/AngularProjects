import { AuctionMaterialModule } from './auction-material.module';

describe('AuctionMaterialModule', () => {
  let auctionMaterialModule: AuctionMaterialModule;

  beforeEach(() => {
    auctionMaterialModule = new AuctionMaterialModule();
  });

  it('should create an instance', () => {
    expect(auctionMaterialModule).toBeTruthy();
  });
});
