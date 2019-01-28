import { Camera, CameraOptions } from '@ionic-native/camera';

import { BrandService } from './../../services/brand.service';
import { ModelService } from './../../services/model.service';
import { Component, OnInit } from '@angular/core';
import Model from '../../entities/model/model';
import { NavParams, LoadingController, ToastController, Form, ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import Brand from '../../entities/brand/brand';

@Component({
  selector: 'page-model-form',
  templateUrl: 'model-form.page.html'
})

export class ModelFormPage {

  model: Model;

  availableBrands: Brand[];

  constructor(
    private modelService: ModelService,
    private brandService: BrandService,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private camera: Camera,
    private domSanitizer: DomSanitizer
  ) { 

    this.model = this.navParams.get('model') || new Model();
    console.log('Model', this.model);
  }

  async ionViewDidLoad(){
    const loading = this.loadingCtrl.create({ content: 'Carregando modelo e marcas...' });
    loading.present();

    try {
      this.availableBrands = await this.brandService.listAll();
      loading.dismiss();
    } catch(err) {
      console.error(err);
      loading.dismiss();
      this.toastCtrl.create({ message: 'Erro ao carregar as marcas para associação', duration: 2000 }).present();
    }
  }

  submit(form: any) {
    if(form.checkValidity()) {
      this.modelService.save(this.model).then((modelSaved) => {
        console.log('Model saved', modelSaved);
        this.viewCtrl.dismiss();
      }).catch(err => this.toastCtrl.create({ message: `Erro ao salvar o modelo ${this.model.name}`}))
    }
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,

      // file:///storage/emulated/0/Android/data/intelltech.workshop/cache/1548641516806.jpg
    }
    this.camera.getPicture(options).then((photo) => {
      this.model.photoURI = (<any>window).Ionic.WebView.convertFileSrc(photo);;
    })
  }

}