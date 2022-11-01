import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import urlList from 'src/app/core/utils/service-list';
import { environment } from 'src/environments/environment';
import { Kyc } from '../entities/kyc';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private http: HttpClient) { }

  createSampleKyc(payload: Kyc): Observable<any> {
    const url = environment.apiUrl + urlList.onboarding.kyc;

    return this.http.post(url, payload)
  }

  getKyc(id: string): Observable<any> {
    const url = environment.apiUrl + urlList.onboarding.kyc + `/${id}`;
    return this.http.get(url);
  }

  pacthKyc(id: string, payload: Kyc): Observable<any> {
    const url = environment.apiUrl + urlList.onboarding.kyc + `/${id}`;
    return this.http.patch(url, payload);
  }

  uploadFile(file: any): Observable<any> {
    const url = environment.apiUrl + urlList.sfs.fileUpload;
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(url, formData);

  }


}
