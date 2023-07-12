import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {  RoutingVideoModule } from './routing-video.module';
import { YoutubeComponent } from './youtube/youtube.component';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

@NgModule({
  declarations: [YoutubeComponent],
  imports: [
    CommonModule,
    RoutingVideoModule,
    NgxYoutubePlayerModule.forRoot(),
  ],
  exports: [YoutubeComponent],
})
export class VideoModule {}
