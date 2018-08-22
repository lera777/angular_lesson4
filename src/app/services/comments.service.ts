import { Injectable } from '@angular/core';
import { Comment } from "../models/comment";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  private apiUrl = environment.api_url;
  constructor(
    private http: HttpClient,
  ) {}

  public getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }
}