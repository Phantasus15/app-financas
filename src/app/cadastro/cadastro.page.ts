import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../user';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  email: any
  senha: any
  userUid: string;
  uid: string = '';
  users: any;
  nome: any;
  celular: any;

    constructor(
      public auth: AngularFireAuth,
      public firestore: AngularFirestore,
      private user: User,
      private router: Router,
      private toastController: ToastController
    ) { 
      this.users = this.firestore.collection('users');
    }
  
    ngOnInit() {
    }

    async presentToast(position: 'top' | 'middle' | 'bottom') {
      const toast = await this.toastController.create({
        message: 'Cadastro concluído!',
        duration: 1500,
        position: position
      });
  
      await toast.present();
    }
  
    async cadastrar() {
      return await this.auth.createUserWithEmailAndPassword(this.email, this.senha).then( usuario => {
        this.user.uid = usuario.user.uid;
        this.users.doc(usuario.user.uid).set({ email: this.email, nome: this.nome, celular: this.celular, photoURL: '../assets/perfil.png', entrada: 0, saida: 0, uid: usuario.user.uid});
        this.router.navigateByUrl('login');
        this.presentToast('middle')
      })
  }
  
  }
