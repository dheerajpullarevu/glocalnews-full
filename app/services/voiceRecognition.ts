import { TNSRecognize } from '@nativescript/speech-recognition';
import { Application } from '@nativescript/core';

export class VoiceRecognitionService {
  private recognizer: TNSRecognize;

  constructor() {
    this.recognizer = new TNSRecognize();
  }

  async startVoiceRecognition(language: string = 'en-US'): Promise<string> {
    try {
      const options = {
        locale: language,
        onResult: (transcription: string) => {
          return transcription;
        },
        onError: (error: Error) => {
          console.error('Speech recognition error:', error);
          throw error;
        }
      };

      return await this.recognizer.startListening(options);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      throw error;
    }
  }

  stopVoiceRecognition() {
    this.recognizer.stopListening();
  }
}