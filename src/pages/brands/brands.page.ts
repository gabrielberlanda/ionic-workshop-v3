import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController, AlertOptions } from 'ionic-angular';
import Brand from '../../entities/brand/brand';

@Component({
  selector: 'page-brands',
  templateUrl: 'brands.page.html'
})
export class BrandsPage {

  brands: Brand[];

  constructor(
    private brandService: BrandService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ionViewDidLoad(){
    const loading = this.loadingCtrl.create({
      content: 'Carregando marcas...',
    });

    loading.present();

    this.brandService.listAll().then((brands) => {
      console.log('brands', brands);
      this.brands = brands;
      loading.dismiss();
    }).catch(err => {
      console.error('Erro ao carregar marcas', err);
      loading.dismiss();
      this.toastCtrl.create({ message: 'Ocorreu um erro ao carregar as marcas...', duration: 3000 }).present();
    })
  }

  brandInsertedHandler(brand: Brand) {
    this.brands.push(brand);
    this.toastCtrl.create({ message: `Marca ${brand.name} criada com sucesso`, duration: 2000 }).present();
  }

  brandUpdatedHandler(brandIndex: number, brandUpdated: Brand) {
    this.brands.splice(brandIndex, 1, brandUpdated);
    this.toastCtrl.create({ message: 'Marca editada com sucesso!', duration: 2000 }).present();
  }
  
  createOrEditBrand(brand: Brand = new Brand()) {
 
    const actionText: string = brand.id ? 'Editar' : 'Adicionar';

    const submitHandler = ({name}) => {
      if(!name || !name.length) return false;
      
      const brandToSave: Brand = { ...brand, name: name };

      this.brandService.save(brandToSave).then((brandSaved) => {
        if(brand.id) {
          const brandIndex = this.brands.indexOf(brand);
          this.brandUpdatedHandler(brandIndex, brandSaved);          
        } else {
          this.brandInsertedHandler(brandSaved);
        }
      }).catch(err => {
        console.error(err);
        this.toastCtrl.create({ message: `Ocorreu um erro ao salvar a marca ${brand.name}`, duration: 2000}).present();
      })
    }

    const alertConfig: AlertOptions = {
      title: `${actionText} marca`,
      inputs: [
        { 
          name: 'name', 
          placeholder: 'Nome da marca', 
          type: 'text', 
          value: brand.name 
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'Cancel' },
        { text: actionText, handler: submitHandler }
      ]
    }

    const formBrandAlert = this.alertCtrl.create(alertConfig);

    formBrandAlert.present();
  }

  deleteBrand(brand: Brand) { 
    this.brandService.delete(brand.id).then(() => {
      this.brands.splice(this.brands.indexOf(brand), 1);
      this.toastCtrl.create({ message: 'Marca removida com sucesso!', duration: 2000}).present();
    }).catch(err => {
      console.error(err);
      this.toastCtrl.create({ message: `Ocorreu um erro ao remover a marca ${brand.name}`}).present();
    })
  }
}