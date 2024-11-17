import { TNSTextToSpeech, SpeakOptions } from '@nativescript/texttospeech';

export class TextToSpeechService {
  private tts: TNSTextToSpeech;

  constructor() {
    this.tts = new TNSTextToSpeech();
  }

  async speak(text: string, language: string = 'en-US') {
    try {
      const options: SpeakOptions = {
        text,
        locale: language,
        pitch: 1.0,
        speakRate: 1.0,
        volume: 1.0
      };

      await this.tts.speak(options);
    } catch (error) {
      console.error('Text to speech error:', error);
      throw error;
    }
  }

  stop() {
    this.tts.pause();
  }
}