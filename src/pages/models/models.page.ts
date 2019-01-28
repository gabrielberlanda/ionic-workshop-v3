import { DomSanitizer } from '@angular/platform-browser';
import { ModelFormPage } from './../model-form/model-form.page';
import { LoadingController, ToastController, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

import Model from '../../entities/model/model';
import { ModelService } from './../../services/model.service';

@Component({
  selector: 'page-models',
  templateUrl: 'models.page.html'
})
export class ModelsPage {

  models: Model[];

  constructor(
    private modelService: ModelService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private domSanitizer: DomSanitizer
  ) { }

  ionViewDidEnter(){
  
    const loading = this.loadingCtrl.create({
      content: 'Carregando modelos...'
    });

    loading.present();

    this.modelService.listAll().then((models) => {
      console.log('Models', models);
      this.models = models;
      loading.dismiss();
    }).catch(err => {
      console.error(err);
      loading.dismiss();
      this.toastCtrl.create({ message: 'Ocorreu um erro ao carregar os modelos', duration: 2000 }).present();
    });

  }

  createOrEditModel(model: Model = new Model()) {
    this.navCtrl.push(ModelFormPage, { model });
  }; 
}