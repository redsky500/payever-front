import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthModule, PeAuthService } from '@pe/auth';
import { CosMessageBus } from '@pe/base';
import {
  PEB_EDITOR_API_PATH,
  PEB_EDITOR_WS_PATH,
  PEB_GENERATOR_API_PATH,
  PEB_MEDIA_API_PATH,
  PEB_SHOPS_API_PATH,
  PEB_STORAGE_PATH,
  PEB_STUDIO_API_PATH,
  PEB_SYNCHRONIZER_API_PATH,
  PebActualEditorApi,
  PebActualEditorWs,
  PebEditorApi,
  PebEditorAuthTokenService,
  PebEditorWs,
  PebThemesApi,
} from '@pe/builder-api';
import { PebContextService } from '@pe/builder-context';
import { PebEnvService } from '@pe/builder-core';
import { BackgroundActivityService, UploadInterceptorService } from '@pe/builder-services';
import { AppType, APP_TYPE, EnvironmentConfigInterface, EnvService, MessageBus, PE_ENV } from '@pe/common';
import { PE_DOMAINS_API_PATH, PE_PRIMARY_HOST } from '@pe/domains';
import { PE_FOLDERS_API_PATH } from '@pe/folders';
import { PE_CUSTOM_CDN_PATH, PE_MEDIA_API_PATH, PE_MEDIA_CONTAINER } from '@pe/media';
import { PePlatformHeaderModule } from '@pe/platform-header';
import { THEMES_API_PATH, ThemesApi } from '@pe/themes';

import { PE_AFFILIATES_CONTAINER } from './constants';
import { CosAffiliatesRoutingModule } from './cos-affiliates-routing.module';
import { CosAffiliatesRootComponent } from './root';
import { PeAffiliatesEnvService, PeAffiliatesHeaderService } from './services';
import { PE_ACCESS_API_PATH, PE_AFFILIATES_API_PATH, PE_PRODUCTS_API_PATH } from './tokens';

(window as any).PayeverStatic.IconLoader.loadIcons(['apps', 'settings','set','builder']);

const angularModules = [
  CommonModule,
  OverlayModule,
];

const peModules = [
  AuthModule.forRoot(),
  PePlatformHeaderModule,
];

const domainsProvides =[
  {
    deps: [PE_ENV],
    provide: PE_DOMAINS_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.affiliates,
  },
  {
    deps: [PE_ENV],
    provide: PE_PRIMARY_HOST,
    useFactory: (env: EnvironmentConfigInterface) => env.primary.affiliatesHost, //shopHost,
  },
];

const envProvides = [
  {
    provide: EnvService,
    useClass: PeAffiliatesEnvService,
  },
  {
    provide: PebEnvService,
    useExisting: EnvService,
  },
];

const foldersProvides = [
  {
    deps: [PE_ENV],
    provide: PE_FOLDERS_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.affiliates + '/api',
  },
];

const mediaProvides = [
  {
    deps: [PE_ENV],
    provide: PE_CUSTOM_CDN_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.custom.cdn,
  },
  {
    deps: [PE_ENV],
    provide: PE_MEDIA_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.media,
  },
  {
    provide: PE_MEDIA_CONTAINER,
    useValue: PE_AFFILIATES_CONTAINER,
  },
];

const pebProvides = [
  BackgroundActivityService,
  PebContextService,
  {
    provide: APP_TYPE,
    useValue: AppType.Affiliates,
  },
  {
    provide: PebEditorApi,
    useClass: PebActualEditorApi,
  },
  {
    provide: PebEditorWs,
    useClass: PebActualEditorWs,
  },
  {
    provide: PebThemesApi,
    useClass: ThemesApi,
  },
  {
    deps: [PeAuthService],
    provide: PebEditorAuthTokenService,
    useFactory: (peAuthService: PeAuthService) => peAuthService,
  },
  {
    deps: [PeAuthService],
    provide: 'PE_ACCESS_TOKEN',
    useFactory: (peAuthService: PeAuthService) => peAuthService.token,
  },
  {
    provide: 'PEB_ENTITY_NAME',
    useValue: PE_AFFILIATES_CONTAINER,
  },
  {
    deps: [BackgroundActivityService, PEB_EDITOR_API_PATH],
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: UploadInterceptorService,
  },
  {
    deps: [PE_ENV],
    provide: 'PE_CONTACTS_HOST',
    useFactory: (env: EnvironmentConfigInterface) => env.backend.contacts,
  },
  {
    deps: [PE_ENV],
    provide: PEB_EDITOR_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.builderAffiliate,
  },
  {
    provide: PEB_EDITOR_WS_PATH,
    deps: [PE_ENV],
    useFactory: (env: EnvironmentConfigInterface) => env.backend.builderAffiliateWs,
  },
  {
    deps: [PE_ENV],
    provide: PEB_GENERATOR_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.builderGenerator,
  },
  {
    deps: [PE_ENV],
    provide: PEB_MEDIA_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.media,
  },
  {
    deps: [PE_ENV],
    provide: PEB_SHOPS_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.builderAffiliate,
  },
  {
    deps: [PE_ENV],
    provide: PEB_STORAGE_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.custom.storage,
  },
  {
    deps: [PE_ENV],
    provide: PEB_STUDIO_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.studio,
  },
  {
    deps: [PE_ENV],
    provide: PEB_SYNCHRONIZER_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.contactsSynchronizer,
  },
];

const peProvides = [
  {
    provide: MessageBus,
    useClass: CosMessageBus,
  },
];

const affiliatesProvides = [
  PeAffiliatesHeaderService,
  {
    deps: [PE_ENV],
    provide: PE_ACCESS_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.affiliates + '/api',
  },
  {
    deps: [PE_ENV],
    provide: PE_AFFILIATES_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.affiliates + '/api',
  },
  {
    deps: [PE_ENV],
    provide: PE_PRODUCTS_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.products,
  },
];

const themesProvides = [
  {
    deps: [PE_ENV],
    provide: THEMES_API_PATH,
    useFactory: (env: EnvironmentConfigInterface) => env.backend.builderAffiliate,
  },
];

@NgModule({
  declarations: [CosAffiliatesRootComponent],
  imports: [
    CosAffiliatesRoutingModule,

    ...angularModules,
    ...peModules,
  ],
  providers: [
    ...affiliatesProvides,
    ...domainsProvides,
    ...envProvides,
    ...foldersProvides,
    ...mediaProvides,
    ...pebProvides,
    ...peProvides,
    ...themesProvides,
  ],
})
export class CosAffiliatesModule { }
