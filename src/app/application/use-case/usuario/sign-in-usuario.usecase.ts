import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { SignInDto } from 'src/app/infrastructure/dto/create/sign-in.dto';

@Injectable({
    providedIn: 'root'
})
export class SignInUsuarioUseCase  {

    constructor(private readonly usuarioService: UsuarioService) { }

    execute(params: SignInDto): Observable<string> {
        return this.usuarioService.signIn(params);
    }
}