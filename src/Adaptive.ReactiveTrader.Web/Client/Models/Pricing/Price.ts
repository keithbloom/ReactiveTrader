﻿class Price implements IPrice, IPriceLatency {
    constructor(
        bid: ExecutablePrice,
        ask: ExecutablePrice,
        mid: number,
        quoteId: number,
        valueDate: string,
        currencyPair: ICurrencyPair) {

        this.bid = bid;
        this.ask = ask;
        this.mid = mid;
        this.quoteId = quoteId;
        this.valueDate = new Date(valueDate);
        this.currencyPair = currencyPair;
        this.isStale = false;

        bid.parent = this;
        ask.parent = this;

        this.spread = (ask.rate - bid.rate) * Math.pow(10, currencyPair.pipsPosition);
    }

    bid: IExecutablePrice;
    ask: IExecutablePrice;
    mid: number; 
    currencyPair: ICurrencyPair;
    quoteId: number;
    valueDate: Date;
    spread: number;
    isStale: boolean; 

    // IPriceLatency implementation

    private _receivedTimestamp: number;
    private _renderTimestamp: number;

    get uiProcessingTimeMs() {
        return this._renderTimestamp - this._receivedTimestamp;
    }

    displayedOnUi(): void {
        this._renderTimestamp = performance.now();
    }

    receivedInGuiProcess(): void {
        this._receivedTimestamp = performance.now();
    }
} 