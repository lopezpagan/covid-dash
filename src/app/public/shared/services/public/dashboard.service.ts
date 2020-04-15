import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DashStateCurrentService extends DataService {

  constructor(http: HttpClient) {
    super('/states/current.json', http);
  }

}

@Injectable({
  providedIn: 'root'
})
export class DashStateTodayService extends DataService {

  constructor(http: HttpClient) {
    super('/states', http);
  }

}

@Injectable({
  providedIn: 'root'
})
export class DashStateDailySearchService extends DataService {

  constructor(http: HttpClient) {
    super('/states/daily', http);
  }

}

@Injectable({
  providedIn: 'root'
})
export class DashStateDailyService extends DataService {

  constructor(http: HttpClient) {
    super('/states/daily.json', http);
  }

}

@Injectable({
  providedIn: 'root'
})
export class DashStateInfoService extends DataService {

  constructor(http: HttpClient) {
    super('/states/info.json', http);
  }

}
