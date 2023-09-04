import { Injectable } from "@angular/core";
import { env } from "src/env/env";
import { HttpClient } from "@angular/common/http"; 
import { Picture } from "../picture/picture.model";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ApiService {

	apiUrl:string = env.apiUrl;

	constructor(private http: HttpClient) { }

	listPictures() {
		return this.http.get<Picture[]>(`${this.apiUrl}`);
	}

	getPicture(id:number) {
		return this.http.get<Picture>(`${this.apiUrl}/${id}`)
	}

}
