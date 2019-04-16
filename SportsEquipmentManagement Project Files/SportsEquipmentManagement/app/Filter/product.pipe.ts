import { PipeTransform, Pipe } from '@angular/core';
import { IProduct } from '../Model/product';

@Pipe({
    name: 'productFilter'
})

export class ProductFilterPipe implements PipeTransform {

    transform(value: IProduct[], filter: string): IProduct[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IProduct) =>
            app.MaterialID != null && app.MaterialID.toLocaleLowerCase().indexOf(filter) != -1
            || app.Description != null && app.Description.toLocaleLowerCase().indexOf(filter) != -1
       
        ) : value;

    }
}
