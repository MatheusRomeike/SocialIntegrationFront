import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AppInjector } from 'src/app/app-injector';
import { LoadingMessages } from '../models/loading-messages';
import { LoadingService } from '../services/loading.service';

export function Loading(
  mensagens: LoadingMessages = null,
  mostrarErroApi = false
): MethodDecorator {
  const toastrService = AppInjector.get(ToastrService);
  const loadingService = AppInjector.get(LoadingService);
  const translationService = AppInjector.get(TranslateService);

  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        if (mensagens?.Inicio) {
          toastrService.info(
            mensagens.Inicio.Conteudo,
            mensagens.Inicio.Titulo
          );
        }

        loadingService.show();
        await originalMethod.apply(this, args);

        if (mensagens?.Sucesso) {
          toastrService.success(
            mensagens.Sucesso.Conteudo,
            mensagens.Sucesso.Titulo
          );
        }
      } catch (error) {
        const titulo = translationService.instant(
          mensagens?.Erro?.Titulo ?? 'Error'
        );

        let conteudo = translationService.instant(
          mensagens?.Erro?.Conteudo ?? 'Unexpected_Error'
        );

        if (mostrarErroApi && error?.error?.data) {
          conteudo += `: ${translationService.instant(error.error.data)}`;
        }

        if (error?.status != 401) toastrService.error(conteudo, titulo);
      } finally {
        loadingService.hide();
      }
    };

    return descriptor;
  };
}
