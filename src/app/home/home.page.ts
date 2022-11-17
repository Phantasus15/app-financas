import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { User } from '../user';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users: any;
  entrada: number = 0;
  saida: number = 0;
  resultado: number;
  corResult: string = 'verde';
  rendimentos: any;
  usersSel: any;
  mes: any;
  mesName: string;

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
      this.users = this.firestore.collection('users', ref => ref.where('uid', '==', this.user.uid)).valueChanges();
      this.usersSel = this.firestore.collection('users', ref => ref.where('uid', '==', this.user.uid));
      this.rendimentos = this.firestore.collection('rendimentos');

      this.users.subscribe((res: User[]) => {

        res.forEach((dado) => {
          this.entrada = dado.entrada;
          this.saida = dado.saida;
          this.resultado = this.entrada-this.saida;
        });
    })
    }

    this.mes = new Date().getMonth()+1;
    console.log('Mês: ',this.mes);
    switch (this.mes){
      case 1:
        this.mesName = 'Janeiro';
        break
      case 2:
          this.mesName = 'Fevereiro';
          break
      case 3:
        this.mesName = 'Março';
        break
      case 4:
          this.mesName = 'Abril';
          break
      case 5:
        this.mesName = 'Maio';
        break
      case 6:
          this.mesName = 'Junho';
          break
      case 7:
        this.mesName = 'Julho';
        break
      case 8:
          this.mesName = 'Agosto';
          break
      case 9:
        this.mesName = 'Setembro';
        break
      case 10:
          this.mesName = 'Outubro';
          break
      case 11:
        this.mesName = 'Novembro';
        break
      case 12:
          this.mesName = 'Dezembro';
          break
    }

  }

  async chamarEntrada() {
    const alert = await this.alertController.create({
      header: 'Insira sua entrada',
      buttons: [{
        text: 'Inserir',
        handler: (data) => {
          this.entrada+=Number(data.input1);
          this.resultado = this.entrada-this.saida;
          this.usersSel.doc(this.user.uid).update({entrada: this.entrada})
          this.mudaCor()
        }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'secondary',
  },],
      inputs: [
        {
          name: 'input1',
          type: 'number',
          placeholder: 'R$0,00'
        },
      ],
    });

    await alert.present();
  }

  async chamarSaida() {
    const alert = await this.alertController.create({
      header: 'Insira seu gasto',
      buttons: [{
        text: 'Inserir',
        handler: (data) => {
          this.saida+=Number(data.input2);
          this.resultado = this.entrada-this.saida;
          this.usersSel.doc(this.user.uid).update({saida: this.saida})
          this.mudaCor()
        }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'secondary',
  },],
      inputs: [
        {
          name: 'input2',
          type: 'number',
          placeholder: 'R$0,00'
        },
      ],
    });

    await alert.present();
  }

  mudaCor(){
    if(this.entrada>this.saida){
      this.corResult = 'verde'
    }
    else if(this.entrada<this.saida){
      this.corResult = 'vermelho'
    }
    else if(this.entrada==this.saida){
      this.corResult = ''
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Rendimento de '+this.mesName+' Salvo!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  salvarRendimento(){
    this.rendimentos.add({user: this.user.uid, entrada: this.entrada, saida: this.saida, rendimento: this.resultado, mes: this.mes, mesNome: this.mesName, id: ''}).then( newRend => {
      this.rendimentos.doc(newRend.id).update({id: newRend.id});
      this.usersSel.doc(this.user.uid).update({entrada: 0, saida: 0});
      this.presentToast('middle');
      this.router.navigateByUrl('rendimentos');
      });
  }

}
