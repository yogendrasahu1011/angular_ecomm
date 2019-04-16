import { PipeTransform, Pipe } from '@angular/core';
import { ICompany } from '../Model/company';

@Pipe({
    name: 'companyFilter'
})

export class CompanyFilterPipe implements PipeTransform {

    transform(value: ICompany[], filter: string): ICompany[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ICompany) =>
            app.Name != null && app.Name.toLocaleLowerCase().indexOf(filter) != -1
            
       
        ) : value;

    }
}
