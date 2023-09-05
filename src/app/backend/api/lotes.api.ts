import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class LotesApi {
    private readonly apiController: string = 'lotes';

    constructor(private api: HttpService) {}

    getAllLotes() {
        return this.api.get(`${this.apiController}`);
    }
}