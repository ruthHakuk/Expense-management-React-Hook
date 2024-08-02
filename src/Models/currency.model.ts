export class Currency {

    time!: Date
    asset_id_base!: string
    asset_id_quote!: string
    rate!: number


    constructor(time: Date, asset_id_base: string, asset_id_quote: string, rate: number) {
        this.time = time
        this.asset_id_base = asset_id_base
        this.asset_id_quote = asset_id_quote
        this.rate = rate
    }
}