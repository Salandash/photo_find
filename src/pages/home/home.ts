// Angular
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Ionic
import { NavController , ActionSheetController} from 'ionic-angular';
import { Camera } from 'ionic-native';

//Providers
import { SimpleHttp , AuthService} from '../../shared/services/include'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public people: any;
  public base64Image: string;
  public b : boolean = false;
  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public sanitizer: DomSanitizer,
    private auth: AuthService,
    public httpApi: SimpleHttp
  ) { }

addImage() {
    let options = this.actionSheetCtrl.create({
      title: 'Select an Image',
      buttons: [
        {
          text: 'Camera',
          handler: () => this.handleMedia(Camera.PictureSourceType.CAMERA)
        }, {
          text: 'Photo Library',
          handler: () => this.handleMedia(Camera.PictureSourceType.PHOTOLIBRARY)
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            options.dismiss();
          }
        }
      ]
    });

    options.present();
  }

  makeRequest() {
    this.httpApi.get().subscribe(
      data => {
        console.log('success');
        console.log('data', data.results);
        this.people = data.results;
      },
      err => {
        // Uh Oh
        console.log('err', err);
      },
      () => {
        console.log('complete');
      });
  }

ionViewDidLoad() {
    console.log('authenticated', this.auth.authenticated());
    if (this.auth.authenticated()) {
      console.log('authenticated');
      this.b = true;
    }
  }
  takePicture() {
    // getPicture options
    let options = {
      quality: 75,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      // this.base64Image = "data:image/jpeg;base64," + imageData;
      this.base64Image = imageData;
      console.log('imgData', imageData);
    }, (err) => {
      // Handle error
      console.log('err', err);
    });
  }

  handleMedia(sourceType) {
    // getPicture options
    let options = {
      quality: 95,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

    Camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      // Handle error
      console.log('err', err);
    });
  }
}
