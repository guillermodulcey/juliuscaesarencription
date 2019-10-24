import { Component, OnInit, Input } from '@angular/core';

import { EncryptionService } from 'src/app/shared/services/encryption.service.js';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {

  @Input() frase: string;

  constructor(public encryptionService: EncryptionService) { }

  ngOnInit() {
  }

  obtenerFrases(){
    this.encryptionService.obtenerResultados(this.frase);
  }

}
