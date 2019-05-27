import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatCheckboxModule, 
    MatSelectModule, 
    MatInputModule,
    MatFormFieldModule, 
    MatIconModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule, 
        MatCheckboxModule, 
        MatSelectModule, 
        MatInputModule,
        MatFormFieldModule, 
        MatIconModule,
    ],
    exports: [
        MatButtonModule, 
        MatCheckboxModule, 
        MatSelectModule, 
        MatInputModule,
        MatFormFieldModule, 
        MatIconModule,
    ]
})
export class MaterialModule { }