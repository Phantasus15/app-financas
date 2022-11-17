import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

email: any;
senha: any;
userUid: string = '';
users: any;

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    public user: User,
    private router: Router
  ) { 
  }

  ngOnInit() {
  }

  async login() {
    const usuario = await this.auth.signInWithEmailAndPassword(this.email, this.senha)
      console.log(usuario.user.uid);
      this.user.uid = usuario.user.uid;
      this.users = this.firestore.collection('users', ref => ref.where('uid', '==', usuario.user.uid)).valueChanges();
      this.users.subscribe((res: User[]) => {

        res.forEach((dado) => {
          this.user.nome = dado.nome;
          this.user.photoURL = dado.photoURL;
          this.user.celular = dado.celular;
          this.user.email = dado.email;
        });
    })
      this.router.navigateByUrl('home');
      return usuario;
}

}
