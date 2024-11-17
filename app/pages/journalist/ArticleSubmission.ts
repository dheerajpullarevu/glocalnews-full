import { EventData, Page } from '@nativescript/core';
import { VoiceRecognitionService } from '../../services/voiceRecognition';
import { ArticleSubmissionViewModel } from './article-submission-view-model';

let page: Page;
let voiceService: VoiceRecognitionService;

export function onNavigatingTo(args: EventData) {
  page = <Page>args.object;
  voiceService = new VoiceRecognitionService();
  page.bindingContext = new ArticleSubmissionViewModel(voiceService);
}