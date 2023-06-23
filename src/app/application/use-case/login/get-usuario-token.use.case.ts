import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';

@Injectable({
    providedIn: 'root'
})
export class HasTokenUserUseCase  {
    private helper = new JwtHelperService();
    private status: IUsuarioTokenDomain = {} as IUsuarioTokenDomain;
    public statusTokenEmmit: BehaviorSubject<IUsuarioTokenDomain> = new BehaviorSubject<IUsuarioTokenDomain>(
      this.status
    );

    execute():Observable<IUsuarioTokenDomain>{
        const token = localStorage.getItem('token');
        const tokenUser = token ? this.helper.decodeToken(token) : undefined;
        this.status = tokenUser;
        this.statusTokenEmmit.next(this.status);
        return of(tokenUser as IUsuarioTokenDomain);  
    }
}