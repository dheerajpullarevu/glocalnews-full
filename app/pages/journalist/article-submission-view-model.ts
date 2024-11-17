import { Observable } from '@nativescript/core';
import { VoiceRecognitionService } from '../../services/voiceRecognition';
import { createArticle } from '../../services/news-service';

export class ArticleSubmissionViewModel extends Observable {
  private voiceService: VoiceRecognitionService;
  private isRecording = false;

  constructor(voiceService: VoiceRecognitionService) {
    super();
    this.voiceService = voiceService;
  }

  async startVoiceRecognition() {
    if (this.isRecording) {
      this.voiceService.stopVoiceRecognition();
      this.isRecording = false;
      return;
    }

    try {
      this.isRecording = true;
      const text = await this.voiceService.startVoiceRecognition();
      const currentContent = this.get('content') || '';
      this.set('content', currentContent + ' ' + text);
    } catch (error) {
      console.error('Voice recognition error:', error);
    } finally {
      this.isRecording = false;
    }
  }

  async submitArticle() {
    try {
      const articleData = {
        title: this.get('title'),
        content: this.get('content'),
        // Add other fields
      };
      await createArticle(articleData);
      // Handle success
    } catch (error) {
      console.error('Error submitting article:', error);
    }
  }
}