import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { PostsService } from "../../services/posts.service";
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';
import { CommentsService } from '../../services/comments.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  item: Post = {
    userid: 1,
    title: '',
    body: ''
  }
  comments: Comment[];
  
  @ViewChild('form') form: NgForm;
  isAdmin = true;

  constructor(
    public postService: PostsService,
    public commentService: CommentsService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
   ) {}

  ngOnInit() {
    this.spinner.show();
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toastr.error(error.message, 'Error');
    });
  }

  onSubmit(form){
    if (form.invalid) return;
    const newPost: Post = {
      userid: this.item.userid,
      title: this.item.title,
      body: this.item.body,
    };
    this.spinner.show();
    this.postService.addPost(newPost).subscribe((post: Post) => {
      this.posts.unshift(post);
      form.reset;
      this.spinner.hide();
      this.toastr.success('Post added successfuly', 'Message');
    }, error => {
      this.spinner.hide();
      this.toastr.error(error.message, 'Error');
    });
  }

  onDelete(id: number){
    this.spinner.show();
    this.postService.deletePost(id).subscribe((data: Object) => {
      this.posts = this.posts.filter(post => post.id != id);
      this.spinner.hide();
      this.toastr.success('Post deleted successfuly', 'Message');
    }, error => {
      this.spinner.hide();
      this.toastr.error(error.message, 'Error');
    });
  }
   
  onGetComments(id: number){
    this.spinner.show();
    this.commentService.getComments(id).subscribe((comments: Comment[]) => {
      this.comments = comments;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toastr.error(error.message, 'Error');
    });
  }
}