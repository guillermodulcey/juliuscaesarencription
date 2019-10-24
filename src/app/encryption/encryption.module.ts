import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EncryptionComponent } from './components/encryption.component';

@NgModule({
  declarations: [EncryptionComponent],
  imports: [CommonModule, FormsModule],
  exports: [EncryptionComponent]
})
export class EncryptionModule { }
