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
      title: "Organizer",
      description: "Robotics Engineer, co-founder of kmer it of mbeng and " +
        "mkutano.",
      photo: "assets/images/about/yvan.jpg"
    },
    {
      name: "Yolande KAMGA",
      title: "QA Test",
      description: "Operational manager of the event",
      photo: "assets/images/about/yolande.jpg"
    },
    {
      name: "Ayoub Alouane",
      title: "Dev Rel",
      description: "Co-founder QWIK Community of France",
      photo: "assets/images/about/Ayoub.png"
    },
    {
      name: "Dan Steve Njikam",
      title: "Software engineer && Expert Angular",
      description: "Expert Angular, member of the kmer it community of mbeng and member of the mkutano organizing committee",
      photo: "assets/images/about/steve.png"
    },
    {
      photo: "assets/images/about/tidiane.png",
      name: "Lionel Rolland",
      title: "Software engineer && Expert Angular",
      description: "Expert Angular, member of the kmer it community of mbeng and member of the mkutano organizing committee"
    },
  ]
}
