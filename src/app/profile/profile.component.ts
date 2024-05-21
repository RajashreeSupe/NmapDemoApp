import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

    export class ProfileComponent implements OnInit {
      user: any;
    
      constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router
      ) {}
    
      ngOnInit() {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          const id = +idParam;
          this.userService.getUser(id).subscribe(user => {
            this.user = user;
          });
        } else {
          // Handle the case where the ID is not available, maybe redirect to home or show an error
          this.router.navigate(['/']);
        }
      }
      editPhoto()
      {
        
      }
    
      editProfile() {
        this.router.navigate(['/registration']);
      }

    }
  
