import { Product, ProductResolved } from "./product";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ProductService } from "./product.service";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved>{
    
    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
        const id = route.paramMap.get('id');
        if(isNaN(+id)){
            const message = `Product id was not a number: ${id}`;
            console.error(message);
            return of({product: null, error: message}); //of returns an observable
        }

        //We don't need to subscribe, the resolver deals with the subscription itself.
        //the '+' symbol to force the casting of the string 
        return this.productService.getProduct(+id)
        .pipe(
            map(product => ({product: product})),
            catchError(error => {
                const message = `Retrieval error: ${error}`;
                console.error(message);
                return of({product: null, error: message}); 
            })
        ) 
    }

}