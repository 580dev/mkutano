import { Component } from '@angular/core';

interface Personne {
  name: string,
  photo?: string,
  title: string;
  description: string
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  persons: Personne[] = [
    {
      name: "Yvan Ngoudjou",
      title: "Software engenier",
      description: "Managing a popular open source project can be daunting at first. How do we maintain all these issues, or automatically trigger enim ad minim veniam, quis nostrud exercitation ullamco laboris"
    },
    {
      name: "Dan Steve Njikam",
      title: "Software engenier",
      description: "Managing a popular open source project can be daunting at first. How do we maintain all these issues, or automatically trigger enim ad minim veniam, quis nostrud exercitation ullamco laboris",
      photo: "assets/images/about/steve.png"
    },
    {
      name: "Lionel Rolland",
      title: "Software engenier",
      description: "Managing a popular open source project can be daunting at first. How do we maintain all these issues, or automatically trigger enim ad minim veniam, quis nostrud exercitation ullamco laboris"
    }
  ]
}
