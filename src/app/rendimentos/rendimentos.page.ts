import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { User } from '../user';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-rendimentos',
  templateUrl: './rendimentos.page.html',
  styleUrls: ['./rendimentos.page.scss'],
})
export class RendimentosPage {
  rendimentos: any;

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    public user: User,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    if(this.user.uid==''){
      this.router.navigateByUrl('login')
    }
    else{
      this.rendimentos = this.firestore.collection('rendimentos', ref => ref.
      where('user', '==', this.user.uid)).valueChanges();
    }
    
  }

}
