import { of } from 'rxjs'
import {environment} from "../../../environments/environment";
import {Reserve} from "../model/reserve";
import {UserWithLot} from "../model/user-with-lot";

export const user1 = new UserWithLot(1, 'Usuario 1', [1,2]);


const usersStub = [user1, new UserWithLot(2, 'Usuario 2', [3,4,5])];

const clientsStub = [
  { id: 1, nombre: 'Diego Maradona', },
  { id: 2, nombre: 'Lionel Messi'}
]

const lotsStub = {content: [{id: 1, state: 'DISPONIBLE'}, {id: 2, state: 'DISPONIBLE'}]}

const reserve = new Reserve(1, 1);

export const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);

httpClientSpy.get.and.callFake((url: string) => {
  if (url === `${environment.apiUrl}/clients`) {
    return of(clientsStub);
  }

  if (url === `${environment.apiUrl}/users/with-assigned-lots`) {
    return of(usersStub)
  }


  return of({});
});

httpClientSpy.post.and.callFake((url: string, body: any) => {
  if (url === `${environment.apiUrl}/clients/filter`) {
    return of(clientsStub);
  }
  if (url === `${environment.apiUrl}/reserves/`) {
    return of(reserve);
  }
  if (url === `${environment.apiUrl}/lots/filter`) {
    return of(lotsStub);
  }
  return of({});
});

httpClientSpy.delete.and.callFake((url: string) => {
});

